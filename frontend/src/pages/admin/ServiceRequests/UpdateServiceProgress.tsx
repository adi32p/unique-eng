import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

import { Card, CardContent } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Progress } from "../../../components/ui/progress";
import { Button } from "../../../components/ui/button";
import { Section, SectionHeader } from "../../../components/common/Section";
import { AnimatedSection } from "../../../components/common/AnimatedSection";
import api from "../../../services/api";

/* ------------------------------------------------------------------ */
/* Admin Update Service Progress Page */
/* ------------------------------------------------------------------ */

export default function UpdateServiceProgress() {
  const { id } = useParams();

  const [service, setService] = useState<any>(null);
  const [selectedStage, setSelectedStage] = useState("");
  const [expiryDate, setExpiryDate] = useState(""); // ✅ NEW STATE
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  /* ------------------------------------------------------------------ */
  /* Fetch Service */
  /* ------------------------------------------------------------------ */

  useEffect(() => {
    const fetchService = async () => {
      try {
        const { data } = await api.get(`/user-services/${id}`);
        setService(data);
        setSelectedStage(data.stage || "");

        // If already completed, preload expiry date
        if (data.expiryDate) {
          setExpiryDate(data.expiryDate.split("T")[0]);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [id]);

  /* ------------------------------------------------------------------ */
  /* Stage Mapping */
  /* ------------------------------------------------------------------ */

  const stageOptions = [
    { value: "request-approved", label: "Request Approved", progress: 25 },
    {
      value: "application-submitted",
      label: "Application Submitted",
      progress: 50,
    },
    {
      value: "documents-submitted",
      label: "Documents Submitted",
      progress: 75,
    },
    { value: "payment-done", label: "Payment Done", progress: 90 },
    { value: "license-completed", label: "License Completed", progress: 100 },
  ];

  const currentStageData = stageOptions.find(
    (stage) => stage.value === selectedStage,
  );

  /* ------------------------------------------------------------------ */
  /* Update Progress */
  /* ------------------------------------------------------------------ */

  const handleUpdate = async () => {
    try {
      setUpdating(true);
      setError("");
      setSuccess("");

      if (selectedStage === "license-completed" && !expiryDate) {
        setError("Please select expiry date");
        setUpdating(false);
        return;
      }

      const { data } = await api.put(`/admin/user-service/${id}/stage`, {
        stage: selectedStage,
        expiryDate:
          selectedStage === "license-completed" ? expiryDate : undefined,
      });

      setService(data.userService);
      setSuccess("Progress updated successfully ✅");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setUpdating(false);
    }
  };

  /* ------------------------------------------------------------------ */
  /* Loading & Error */
  /* ------------------------------------------------------------------ */

  if (loading) {
    return (
      <Section className="text-center py-20">
        <p>Loading service details...</p>
      </Section>
    );
  }

  if (error && !service) {
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
            Update Service Progress 🛠️
          </h1>
          <p className="text-white/80 max-w-2xl">
            Admin panel to update service workflow stage.
          </p>
        </AnimatedSection>
      </Section>

      {/* Progress Card */}
      <Section className="-mt-20 pt-24 bg-gradient-to-r from-leaf/5 to-sky/5">
        <SectionHeader
          badge="Admin Control"
          title={service?.service?.name || "Service"}
          subtitle="Manage service progress stage"
        />

        <AnimatedSection>
          <Card className="max-w-3xl mx-auto bg-background/80 backdrop-blur-sm border-leaf/10">
            <CardContent className="p-6 space-y-6">
              {/* Current Progress */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-lg">Current Completion</h3>
                  <span className="text-primary font-bold">
                    {service?.progress || 0}%
                  </span>
                </div>

                <Progress value={service?.progress || 0} />

                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-3">
                  <ShieldCheck size={16} className="text-leaf" />
                  Status: <Badge className="ml-2">{service?.status}</Badge>
                </div>
              </div>

              {/* Stage Selector */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Select New Stage</label>

                <select
                  value={selectedStage}
                  onChange={(e) => setSelectedStage(e.target.value)}
                  className="w-full border rounded-lg p-2 bg-background"
                >
                  <option value="">-- Select Stage --</option>
                  {stageOptions.map((stage) => (
                    <option key={stage.value} value={stage.value}>
                      {stage.label}
                    </option>
                  ))}
                </select>

                {currentStageData && (
                  <p className="text-sm text-muted-foreground">
                    This will set progress to{" "}
                    <span className="font-semibold text-primary">
                      {currentStageData.progress}%
                    </span>
                  </p>
                )}
              </div>

              {/* ✅ Expiry Date Input (Only When Completed) */}
              {selectedStage === "license-completed" && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Set Expiry Date</label>

                  <input
                    type="date"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    className="w-full border rounded-lg p-2 bg-background"
                    required
                  />
                </div>
              )}

              {/* Messages */}
              {error && <p className="text-red-500 text-sm">{error}</p>}
              {success && <p className="text-green-600 text-sm">{success}</p>}

              {/* Update Button */}
              <Button
                onClick={handleUpdate}
                disabled={
                  !selectedStage ||
                  updating ||
                  (selectedStage === "license-completed" && !expiryDate)
                }
                className="w-full"
              >
                {updating ? "Updating..." : "Update Progress"}
              </Button>
            </CardContent>
          </Card>
        </AnimatedSection>
      </Section>
    </>
  );
}
