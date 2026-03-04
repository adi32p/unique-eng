import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ClipboardList,
  User,
  Mail,
  Phone,
  CheckCircle,
  XCircle,
  Eye,
} from "lucide-react";

import { Button } from "../../../components/ui/button";
import { Card, CardContent } from "../../../components/ui/card";
import { Section, SectionHeader } from "../../../components/common/Section";
import {
  StaggerContainer,
  StaggerItem,
} from "../../../components/common/AnimatedSection";

/* API Base */
import { requestsApi } from "../../../services/api";

const statusStyles: Record<string, string> = {
  Pending: "bg-sunrise/10 text-sunrise",
  Approved: "bg-leaf/10 text-leaf",
  Rejected: "bg-destructive/10 text-destructive",
};

export default function RequestsList() {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  /* 🔹 Fetch Requests */
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await requestsApi.getAll();

        // 🔥 Newest on top
        const sorted = response.data.sort(
          (a: any, b: any) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );

        setRequests(sorted);
      } catch (error) {
        console.error("Error fetching requests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  /* 🔹 Update Status */
  const updateStatus = async (id: string, status: string) => {
    try {
      await requestsApi.updateStatus(id, { status });

      setRequests((prev) =>
        prev.map((req) => (req._id === id ? { ...req, status } : req)),
      );
    } catch (error) {
      console.error("Status update failed:", error);
    }
  };

  if (loading) {
    return (
      <Section>
        <div className="text-muted-foreground">Loading requests...</div>
      </Section>
    );
  }

  return (
    <Section className="min-h-screen bg-gradient-to-br from-background to-leaf/5">
      <SectionHeader
        badge="Admin Panel"
        title="Service Requests"
        subtitle="Manage and review all incoming service requests"
      />

      <StaggerContainer className="grid gap-6">
        {requests.map((request) => (
          <StaggerItem key={request._id}>
            <Card className="card-nature bg-card border-border/50 hover:shadow-nature transition-all">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  {/* Left Info */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-primary font-semibold">
                      <ClipboardList size={18} />
                      {request.service?.title || "Service"}
                    </div>

                    <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <User size={14} />
                        {request.name}
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail size={14} />
                        {request.email}
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone size={14} />
                        {request.phone}
                      </div>
                    </div>
                  </div>

                  {/* Right Actions */}
                  <div className="flex flex-wrap items-center gap-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        statusStyles[request.status]
                      }`}
                    >
                      {request.status}
                    </span>

                    <Button size="sm" variant="outline" asChild>
                      <Link to={`/admin/requests/${request._id}`}>
                        <Eye size={14} className="mr-1" />
                        View
                      </Link>
                    </Button>

                    <Button
                      size="sm"
                      className="bg-leaf text-white hover:bg-leaf/90"
                      onClick={() => updateStatus(request._id, "Approved")}
                    >
                      <CheckCircle size={14} className="mr-1" />
                      Approve
                    </Button>

                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => updateStatus(request._id, "Rejected")}
                    >
                      <XCircle size={14} className="mr-1" />
                      Reject
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </Section>
  );
}
