import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Section } from "../../../components/common/Section";
import { AnimatedSection } from "../../../components/common/AnimatedSection";

const API_BASE = "http://localhost:5000/api";

export default function UserServicesByUser() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await fetch(
        `${API_BASE}/admin/users/${userId}/services`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
          },
        }
      );

      if (!res.ok) throw new Error("Failed to fetch services");

      const data = await res.json();
      setServices(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Section className="space-y-10">
      <h1 className="text-3xl font-display font-bold text-primary">
        User Services
      </h1>

      <div className="space-y-4">
        {services.map((item, index) => (
          <AnimatedSection key={item._id} delay={index * 0.05}>
            <Card className="bg-background/80 backdrop-blur border-border/50 hover:shadow-nature transition-all">
              <CardContent className="p-6 flex justify-between items-center">
                <div>
                  <div className="font-semibold text-lg">
                    {item.service?.name}
                  </div>

                  <div className="text-sm text-muted-foreground">
                    Progress: {item.progress}%
                  </div>

                  <div className="text-sm text-muted-foreground">
                    Status: {item.status}
                  </div>

                  {/* ✅ Expiry Date Added Here */}
                  {item.expiryDate && (
                    <div className="text-sm text-muted-foreground">
                      Expiry:{" "}
                      {new Date(item.expiryDate).toLocaleDateString()}
                    </div>
                  )}
                </div>

                <Button
                  onClick={() =>
                    navigate(`/admin/service-progress/${item._id}`)
                  }
                >
                  Update Progress
                </Button>
              </CardContent>
            </Card>
          </AnimatedSection>
        ))}
      </div>
    </Section>
  );
}