import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, Clock, FileText, ShieldCheck } from "lucide-react";

import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Progress } from "../../components/ui/progress";
import { Section, SectionHeader } from "../../components/common/Section";
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "../../components/common/AnimatedSection";
import { userServicesApi } from "../../services/api";

/* ------------------------------------------------------------------ */
/* Service Progress Page */
/* ------------------------------------------------------------------ */

export default function ServiceProgress() {
  const { id } = useParams();

  const [serviceProgress, setServiceProgress] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchService = async () => {
      try {
        if (!id) return;

        const res = await userServicesApi.getById(id);

        setServiceProgress(res.data);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch service data");
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [id]);

  /* ------------------------------------------------------------------ */
  /* Status Helpers */
  /* ------------------------------------------------------------------ */

  function StatusIcon({ status }: { status: string }) {
    switch (status) {
      case "completed":
        return <CheckCircle className="text-leaf" size={22} />;
      case "active":
        return <Clock className="text-primary" size={22} />;
      default:
        return <FileText className="text-muted-foreground" size={22} />;
    }
  }

  function StatusBadge({ status }: { status: string }) {
    switch (status) {
      case "completed":
        return <Badge className="bg-leaf/20 text-leaf">Completed</Badge>;
      case "active":
        return (
          <Badge className="bg-primary/20 text-primary">In Progress</Badge>
        );
      default:
        return <Badge variant="secondary">Pending</Badge>;
    }
  }

  /* ------------------------------------------------------------------ */
  /* Loading & Error */
  /* ------------------------------------------------------------------ */

  if (loading) {
    return (
      <Section className="text-center py-20">
        <p>Loading service progress...</p>
      </Section>
    );
  }

  if (error) {
    return (
      <Section className="text-center py-20">
        <p className="text-red-500">{error}</p>
      </Section>
    );
  }

  /* ------------------------------------------------------------------ */
  /* Page UI */
  /* ------------------------------------------------------------------ */

  return (
    <>
      {/* Header */}
      <Section className="bg-gradient-to-br from-forest via-primary to-forest text-white">
        <AnimatedSection>
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">
            Service Progress 📊
          </h1>
          <p className="text-white/80 max-w-2xl">
            Track each stage of your service — from submission to final
            approval.
          </p>
        </AnimatedSection>
      </Section>

      {/* Overall Progress */}
      <Section className="-mt-20 pt-24 bg-gradient-to-r from-leaf/5 to-sky/5">
        <SectionHeader
          badge="Overview"
          title={serviceProgress?.service?.name || "Service"}
          subtitle="Current progress of your requested service"
        />

        <AnimatedSection>
          <Card className="max-w-3xl mx-auto bg-background/80 backdrop-blur-sm border-leaf/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg">Overall Completion</h3>
                <span className="text-primary font-bold">
                  {serviceProgress?.progress || 0}%
                </span>
              </div>

              <Progress value={serviceProgress?.progress || 0} />

              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-4">
                <ShieldCheck size={16} className="text-leaf" />
                Your service is being handled by certified experts
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>
      </Section>

      {/* Timeline */}
      <Section className="leaf-pattern">
        <SectionHeader
          badge="Workflow"
          title="Service Timeline"
          subtitle="Step-by-step progress tracking"
        />

        <StaggerContainer className="max-w-3xl mx-auto space-y-4">
          {serviceProgress?.steps?.map((step: any, index: number) => (
            <StaggerItem key={step._id}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  className={`card-nature border-border/50 ${
                    step.status === "active"
                      ? "bg-primary/5 border-primary/30"
                      : "bg-card"
                  }`}
                >
                  <CardContent className="p-5 flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-forest flex items-center justify-center shrink-0">
                      <StatusIcon status={step.status} />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="font-semibold">{step.title}</h3>
                        <StatusBadge status={step.status} />
                      </div>

                      <p className="text-sm text-muted-foreground mt-1">
                        {step.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Section>
    </>
  );
}
