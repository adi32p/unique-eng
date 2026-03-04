import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Pencil, Save, ClipboardList, CheckCircle } from "lucide-react";

import { Button } from "../../../components/ui/button";
import { Card, CardContent } from "../../../components/ui/card";
import { Section } from "../../../components/common/Section";
import { AnimatedSection } from "../../../components/common/AnimatedSection";

/* ----------------------------------
   API Base
----------------------------------- */
import { servicesApi } from "../../../services/api";

/* ----------------------------------
   Edit Service Page
----------------------------------- */
export default function EditService() {
  const { serviceId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [features, setFeatures] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");

  /* 🔹 Fetch Service By ID */
  useEffect(() => {
    const fetchService = async () => {
      try {
        const { data } = await servicesApi.getById(serviceId!);

        setTitle(data.title || "");
        setShortDescription(data.shortDescription || "");
        setFeatures(data.features || []);
      } catch (error) {
        console.error("Error loading service:", error);
      } finally {
        setLoading(false);
      }
    };

    if (serviceId) {
      fetchService();
    }
  }, [serviceId]);

  const handleFeatureChange = (index: number, value: string) => {
    const updated = [...features];
    updated[index] = value;
    setFeatures(updated);
  };

  const addFeature = () => setFeatures([...features, ""]);

  const removeFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  /* 🔹 Submit Update */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await servicesApi.update(serviceId!, {
        title,
        shortDescription,
        features,
      });

      navigate("/admin/services");
    } catch (error: any) {
      console.error("Update failed:", error);
      alert(error.response?.data?.message || "Update failed");
    }
  };

  if (loading) {
    return (
      <Section>
        <div className="text-muted-foreground">Loading service details...</div>
      </Section>
    );
  }

  return (
    <Section className="space-y-10">
      {/* 🧠 Header */}
      <AnimatedSection>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-forest flex items-center justify-center text-white">
            <Pencil />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-primary">
              Edit Service
            </h1>
            <p className="text-muted-foreground">
              Update service details and features
            </p>
          </div>
        </div>
      </AnimatedSection>

      {/* 📝 Edit Form */}
      <AnimatedSection>
        <Card className="bg-background/80 backdrop-blur border-border/50 hover:shadow-nature transition-shadow">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Service Title */}
              <div>
                <label className="text-sm font-medium">Service Title</label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-2 focus:outline-none focus:ring-2 focus:ring-leaf"
                />
              </div>

              {/* Short Description */}
              <div>
                <label className="text-sm font-medium">Short Description</label>
                <textarea
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  rows={3}
                  required
                  className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-2 focus:outline-none focus:ring-2 focus:ring-leaf"
                />
              </div>

              {/* Features */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <ClipboardList size={16} />
                    Service Features
                  </label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addFeature}
                  >
                    + Add Feature
                  </Button>
                </div>

                <div className="space-y-3">
                  {features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex gap-3"
                    >
                      <input
                        value={feature}
                        onChange={(e) =>
                          handleFeatureChange(index, e.target.value)
                        }
                        className="flex-1 rounded-lg border border-border bg-background px-4 py-2 focus:outline-none focus:ring-2 focus:ring-leaf"
                      />
                      {features.length > 1 && (
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="bg-red-500/10 text-red-500 hover:bg-red-500/20"
                          onClick={() => removeFeature(index)}
                        >
                          ✕
                        </Button>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Submit */}
              <div className="flex justify-end gap-4 pt-4">
                <Button
                  type="submit"
                  size="lg"
                  className="bg-leaf text-white hover:bg-leaf/90"
                >
                  <Save size={18} className="mr-2" />
                  Update Service
                </Button>
              </div>

              {/* Info */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2">
                <CheckCircle size={16} className="text-leaf" />
                Changes will be reflected immediately
              </div>
            </form>
          </CardContent>
        </Card>
      </AnimatedSection>
    </Section>
  );
}
