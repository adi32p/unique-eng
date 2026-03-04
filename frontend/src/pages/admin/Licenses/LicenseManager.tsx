import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FileCheck,
  Plus,
  Edit,
  Trash2,
  Calendar,
  ShieldCheck,
} from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "../../../components/ui/button";
import { Card, CardContent } from "../../../components/ui/card";
import { Section, SectionHeader } from "../../../components/common/Section";
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "../../../components/common/AnimatedSection";
import { useToast } from "../../../hooks/use-toast";

import { licensesApi } from "../../../services/api";

interface License {
  _id: string;
  name: string;
  authority: string;
  validTill: string;
}

/* ------------------ Helpers ------------------ */

const getDaysLeft = (date: string) => {
  const today = new Date();
  const expiry = new Date(date);
  const diff = expiry.getTime() - today.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
};

const getStatus = (date: string) => {
  const days = getDaysLeft(date);
  if (days < 0) return "Expired";
  if (days <= 30) return "Expiring Soon";
  return "Active";
};

export default function LicenseManager() {
  const [licenses, setLicenses] = useState<License[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchLicenses();
  }, []);

  const fetchLicenses = async () => {
    try {
      setLoading(true);

      const response = await licensesApi.getAll();

      if (Array.isArray(response.data)) {
        setLicenses(response.data);
      } else {
        setLicenses([]);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Cannot connect to backend server.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await licensesApi.delete(id);

      setLicenses((prev) => prev.filter((item) => item._id !== id));

      toast({
        title: "Deleted",
        description: "License deleted successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description:
          error?.response?.data?.message || "Failed to delete license",
        variant: "destructive",
      });
    }
  };

  return (
    <Section className="leaf-pattern">
      <SectionHeader
        badge="Admin Panel"
        title="License Manager"
        subtitle="Manage licenses & trigger automatic expiry notifications"
      />

      <AnimatedSection className="flex justify-end mb-6">
        <Button asChild className="bg-leaf hover:bg-leaf/90 text-white">
          <Link to="/admin/licenses/add" className="flex items-center">
            <Plus size={18} className="mr-2" />
            Add License
          </Link>
        </Button>
      </AnimatedSection>

      {loading ? (
        <div className="text-center py-10 text-muted-foreground">
          Loading licenses...
        </div>
      ) : licenses.length === 0 ? (
        <div className="text-center py-10 text-muted-foreground">
          No licenses found.
        </div>
      ) : (
        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {licenses.map((license) => {
            const status = getStatus(license.validTill);

            return (
              <StaggerItem key={license._id}>
                <Card className="group h-full bg-card border-border/50 hover:shadow-nature transition-shadow">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-forest flex items-center justify-center">
                        <FileCheck className="text-white" size={22} />
                      </div>

                      <span
                        className={`text-xs px-3 py-1 rounded-full font-medium ${
                          status === "Active"
                            ? "bg-leaf/20 text-leaf"
                            : status === "Expired"
                              ? "bg-red-500/20 text-red-500"
                              : "bg-sunrise/20 text-sunrise"
                        }`}
                      >
                        {status}
                      </span>
                    </div>

                    <h3 className="text-lg font-semibold mb-1 group-hover:text-primary transition-colors">
                      {license.name}
                    </h3>

                    <p className="text-sm text-muted-foreground mb-4 flex items-center gap-2">
                      <ShieldCheck size={14} />
                      {license.authority}
                    </p>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                      <Calendar size={14} />
                      Valid till:{" "}
                      {new Date(license.validTill).toLocaleDateString()}
                    </div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      className="mt-auto flex gap-3"
                    >
                      <Button size="sm" variant="outline" className="flex-1">
                        <Edit size={16} className="mr-2" />
                        Edit
                      </Button>

                      <Button
                        size="sm"
                        variant="destructive"
                        className="flex-1"
                        onClick={() => handleDelete(license._id)}
                      >
                        <Trash2 size={16} className="mr-2" />
                        Delete
                      </Button>
                    </motion.div>
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
