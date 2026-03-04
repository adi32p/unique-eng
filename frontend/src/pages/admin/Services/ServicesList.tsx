import { Link } from "react-router-dom";
import {
  FileCheck,
  Shield,
  Building2,
  ClipboardList,
  CheckCircle,
  Pencil,
  Trash2,
  Plus,
} from "lucide-react";

import { useEffect, useState } from "react";

import { Button } from "../../../components/ui/button";
import { Card, CardContent } from "../../../components/ui/card";
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "../../../components/common/AnimatedSection";

import { Section, SectionHeader } from "../../../components/common/Section";

/* ----------------------------------
   API Base URL
----------------------------------- */
import { servicesApi } from "../../../services/api";

/* ----------------------------------
   Icon mapping
----------------------------------- */
const iconMap: Record<string, React.ElementType> = {
  FileCheck,
  Shield,
  Building2,
  ClipboardList,
  CheckCircle,
  Pencil: FileCheck,
};

/* ----------------------------------
   Service List (Admin)
----------------------------------- */
export default function ServiceList() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  /* -----------------------------
     Fetch Services
  -------------------------------- */
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data } = await servicesApi.getAll();
        setServices(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  /* -----------------------------
     Delete Service
  -------------------------------- */
  const handleDelete = async (id: string) => {
    try {
      await servicesApi.delete(id);

      setServices((prev) => prev.filter((service) => service._id !== id));
    } catch (error: any) {
      console.error("Delete failed:", error);
      alert(error.response?.data?.message || "Delete failed");
    }
  };

  return (
    <Section className="space-y-10">
      {/* 🔹 Header */}
      <AnimatedSection>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <SectionHeader
            badge="Admin Panel"
            title="Manage Services"
            subtitle="Create, edit and maintain all service offerings"
          />

          <Link to="/admin/services/add">
            <Button
              size="lg"
              className="bg-leaf text-white hover:bg-leaf/90 btn-nature"
            >
              <Plus size={18} className="mr-2" />
              Add Service
            </Button>
          </Link>
        </div>
      </AnimatedSection>

      {/* 🔹 Loading State */}
      {loading && (
        <p className="text-center text-muted-foreground">Loading services...</p>
      )}

      {/* 🔹 Services Grid */}
      {!loading && (
        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.length === 0 && (
            <p className="text-muted-foreground">No services found.</p>
          )}

          {services.map((service) => {
            const IconComponent = iconMap[service.icon] || FileCheck;

            return (
              <StaggerItem key={service._id}>
                <Card className="group h-full bg-card border-border/50 card-nature hover:bg-gradient-to-br hover:from-leaf/5 hover:to-transparent transition-all">
                  <CardContent className="p-6 flex flex-col h-full">
                    {/* Icon */}
                    <div className="w-14 h-14 rounded-xl bg-gradient-forest flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <IconComponent className="text-white" size={24} />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-muted-foreground mb-4 flex-1">
                      {service.shortDescription}
                    </p>

                    {/* Features preview */}
                    <ul className="space-y-2 mb-6">
                      {service.features?.slice(0, 3).map((feature: string) => (
                        <li
                          key={feature}
                          className="flex items-center gap-2 text-sm text-muted-foreground"
                        >
                          <CheckCircle
                            className="text-leaf shrink-0"
                            size={14}
                          />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* Actions */}
                    <div className="flex gap-3 pt-4 border-t border-border/50">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1"
                        asChild
                      >
                        <Link to={`/admin/services/edit/${service._id}`}>
                          <Pencil size={16} className="mr-2" />
                          Edit
                        </Link>
                      </Button>

                      <Button
                        size="sm"
                        variant="destructive"
                        className="flex-1 bg-red-500/10 text-red-500 hover:bg-red-500/20"
                        onClick={() => handleDelete(service._id)}
                      >
                        <Trash2 size={16} className="mr-2" />
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      )}
    </Section>
  );
}
