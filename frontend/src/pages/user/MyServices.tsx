import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ClipboardList,
  FileText,
  TrendingUp,
  CheckCircle,
  Clock,
} from "lucide-react";

import { Button } from "../../components/ui/button";
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

/* Status Badge */
function StatusBadge({ status }: { status: string }) {
  switch (status) {
    case "completed":
      return (
        <Badge className="bg-leaf/20 text-leaf flex gap-1">
          <CheckCircle size={14} /> Completed
        </Badge>
      );
    case "in-progress":
      return (
        <Badge variant="secondary" className="flex gap-1">
          <TrendingUp size={14} /> In Progress
        </Badge>
      );
    case "pending":
      return (
        <Badge variant="outline" className="flex gap-1">
          <Clock size={14} /> Pending
        </Badge>
      );
    default:
      return null;
  }
}

/* My Services Page */
export default function MyServices() {
  const [myServices, setMyServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [, setNow] = useState(Date.now()); // for live countdown

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await userServicesApi.getMyServices();

        const data = res.data;

        setMyServices(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to fetch services", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const getExpiryInfo = (expiryDate: string) => {
    const now = new Date();
    const expiry = new Date(expiryDate);
    const diffMs = expiry.getTime() - now.getTime();
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

    return {
      isExpired: diffDays < 0,
      isExpiringSoon: diffDays >= 0 && diffDays <= 30,
      diffDays,
    };
  };

  return (
    <>
      <Section className="bg-gradient-to-br from-forest via-primary to-forest text-white">
        <AnimatedSection>
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">
            My Services 🛠️
          </h1>
          <p className="text-white/80 max-w-2xl">
            View all services you’ve requested and track their current status
            and progress.
          </p>
        </AnimatedSection>
      </Section>

      <Section className="-mt-20 pt-24 bg-gradient-to-r from-leaf/5 to-sky/5">
        <SectionHeader
          badge="Overview"
          title="Your Active Services"
          subtitle="Monitor progress and manage documents"
        />

        {loading ? (
          <AnimatedSection className="text-center py-12">
            <p className="text-muted-foreground">Loading services...</p>
          </AnimatedSection>
        ) : (
          <>
            <StaggerContainer className="space-y-6">
              {myServices.map((service) => {
                const expiryInfo = service.expiryDate
                  ? getExpiryInfo(service.expiryDate)
                  : null;

                return (
                  <StaggerItem key={service.id}>
                    <Card className="card-nature bg-card border-border/50 hover:shadow-nature transition-all">
                      <CardContent className="p-6 space-y-4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-xl bg-gradient-forest flex items-center justify-center">
                              <ClipboardList className="text-white" size={22} />
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg">
                                {service.name}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                Category: {service.category}
                              </p>
                            </div>
                          </div>

                          <div className="flex gap-2 flex-wrap">
                            <StatusBadge status={service.status} />

                            {expiryInfo?.isExpired && (
                              <Badge variant="destructive">🔴 Expired</Badge>
                            )}

                            {expiryInfo?.isExpiringSoon &&
                              !expiryInfo.isExpired && (
                                <Badge className="bg-yellow-100 text-yellow-800">
                                  🟡 Expiring in {expiryInfo.diffDays} days
                                </Badge>
                              )}
                          </div>
                        </div>

                        {/* Progress Section */}
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-muted-foreground">
                              Progress
                            </span>
                            <span className="font-medium">
                              {service.progress}%
                            </span>
                          </div>
                          <Progress value={service.progress} />
                        </div>

                        {/* Expiry Info */}
                        {service.expiryDate && (
                          <div className="text-sm text-muted-foreground space-y-1">
                            <div>
                              Expiry Date:{" "}
                              <span className="font-medium">
                                {new Date(
                                  service.expiryDate,
                                ).toLocaleDateString()}
                              </span>
                            </div>

                            {!expiryInfo?.isExpired && (
                              <div>
                                ⏳ Time Left:{" "}
                                <span className="font-medium">
                                  {expiryInfo?.diffDays} days
                                </span>
                              </div>
                            )}
                          </div>
                        )}

                        <div className="flex flex-wrap gap-3 pt-2">
                          <Button asChild variant="outline" size="sm">
                            <Link to={`/user/service/${service.id}`}>
                              <TrendingUp size={16} className="mr-1" />
                              View Progress
                            </Link>
                          </Button>

                          <Button asChild variant="outline" size="sm">
                            <Link to="/user/documents">
                              <FileText size={16} className="mr-1" />
                              Documents
                            </Link>
                          </Button>

                          {expiryInfo?.isExpired && (
                            <Button size="sm">🔁 Renew Service</Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>

            {myServices.length === 0 && (
              <AnimatedSection className="text-center py-12">
                <p className="text-muted-foreground">
                  You haven’t requested any services yet.
                </p>
              </AnimatedSection>
            )}
          </>
        )}
      </Section>
    </>
  );
}
