import { motion } from "framer-motion";
import {
  Upload,
  FileText,
  CheckCircle,
  Clock,
  XCircle,
  Eye,
} from "lucide-react";

import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Section, SectionHeader } from "../../components/common/Section";
import { AnimatedSection, StaggerContainer, StaggerItem } from "../../components/common/AnimatedSection";

/* ------------------------------------------------------------------ */
/* Mock documents data (replace with API later) */
/* ------------------------------------------------------------------ */
const documents = [
  {
    id: 1,
    name: "Environmental Clearance Form",
    service: "Environmental Clearance",
    status: "approved",
  },
  {
    id: 2,
    name: "Site Layout Plan",
    service: "Consent to Establish",
    status: "pending",
  },
  {
    id: 3,
    name: "Water Usage Report",
    service: "Water Consent",
    status: "rejected",
  },
];

/* ------------------------------------------------------------------ */
/* Status Helpers */
/* ------------------------------------------------------------------ */
function StatusBadge({ status }: { status: string }) {
  switch (status) {
    case "approved":
      return (
        <Badge className="bg-leaf/20 text-leaf flex gap-1">
          <CheckCircle size={14} /> Approved
        </Badge>
      );
    case "pending":
      return (
        <Badge variant="secondary" className="flex gap-1">
          <Clock size={14} /> Pending
        </Badge>
      );
    case "rejected":
      return (
        <Badge variant="destructive" className="flex gap-1">
          <XCircle size={14} /> Rejected
        </Badge>
      );
    default:
      return null;
  }
}

/* ------------------------------------------------------------------ */
/* Documents Page */
/* ------------------------------------------------------------------ */
export default function Documents() {
  return (
    <>
      {/* Header */}
      <Section className="bg-gradient-to-br from-forest via-primary to-forest text-white">
        <AnimatedSection>
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">
            My Documents 📄
          </h1>
          <p className="text-white/80 max-w-2xl">
            Upload required documents and track their verification status for
            each service.
          </p>
        </AnimatedSection>
      </Section>

      {/* Upload Section */}
      <Section className="-mt-20 pt-24 bg-gradient-to-r from-leaf/5 to-sky/5">
        <SectionHeader
          badge="Upload"
          title="Submit New Documents"
          subtitle="Upload documents requested by our team"
        />

        <AnimatedSection className="text-center">
          <Button size="lg" className="btn-nature bg-leaf hover:bg-leaf/90 text-white">
            <Upload size={18} className="mr-2" />
            Upload Document
          </Button>
        </AnimatedSection>
      </Section>

      {/* Documents List */}
      <Section className="leaf-pattern">
        <SectionHeader
          badge="Your Files"
          title="Uploaded Documents"
          subtitle="Track review and approval status"
        />

        <StaggerContainer className="space-y-4">
          {documents.map((doc) => (
            <StaggerItem key={doc.id}>
              <Card className="card-nature bg-card border-border/50 hover:shadow-nature transition-all">
                <CardContent className="p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  {/* Left */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-forest flex items-center justify-center">
                      <FileText className="text-white" size={22} />
                    </div>
                    <div>
                      <h3 className="font-semibold">{doc.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Service: {doc.service}
                      </p>
                    </div>
                  </div>

                  {/* Right */}
                  <div className="flex items-center gap-4">
                    <StatusBadge status={doc.status} />

                    <Button variant="outline" size="sm">
                      <Eye size={16} className="mr-1" />
                      View
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Empty state (future-ready) */}
        {documents.length === 0 && (
          <AnimatedSection className="text-center py-12">
            <p className="text-muted-foreground">
              No documents uploaded yet.
            </p>
          </AnimatedSection>
        )}
      </Section>
    </>
  );
}
