import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FilePlus,
  Save,
  ClipboardList,
  CheckCircle,
} from "lucide-react";

import { Button } from "../../../components/ui/button";
import { Card, CardContent } from "../../../components/ui/card";
import { Section } from "../../../components/common/Section";
import { AnimatedSection } from "../../../components/common/AnimatedSection";

/* -----------------------------
   Add Service Page
-------------------------------- */
export default function AddService() {
  const [features, setFeatures] = useState<string[]>([""]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFeatureChange = (index: number, value: string) => {
    const updated = [...features];
    updated[index] = value;
    setFeatures(updated);
  };

  const addFeature = () => setFeatures([...features, ""]);

  const removeFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  /* -----------------------------
     Submit Handler (Connected to Backend)
  -------------------------------- */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    const payload = {
      title: (form.elements.namedItem("serviceTitle") as HTMLInputElement).value,
      shortDescription: (form.elements.namedItem("shortDescription") as HTMLTextAreaElement).value,
      features: features.filter((f) => f.trim() !== ""),
    };

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/services", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to create service");
        return;
      }

      alert("Service created successfully");
      navigate("/admin/services");

      // Reset form
      form.reset();
      setFeatures([""]);

    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Section className="space-y-10">
      {/* 🧠 Header */}
      <AnimatedSection>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-forest flex items-center justify-center text-white">
            <FilePlus />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-primary">
              Add New Service
            </h1>
            <p className="text-muted-foreground">
              Create and publish a new service for users
            </p>
          </div>
        </div>
      </AnimatedSection>

      {/* 📝 Form */}
      <AnimatedSection>
        <Card className="bg-background/80 backdrop-blur border-border/50 hover:shadow-nature transition-shadow">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Service Title */}
              <div>
                <label className="text-sm font-medium">Service Title</label>
                <input
                  name="serviceTitle"
                  required
                  placeholder="Environmental Clearance"
                  className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-2 focus:outline-none focus:ring-2 focus:ring-leaf"
                />
              </div>

              {/* Short Description */}
              <div>
                <label className="text-sm font-medium">Short Description</label>
                <textarea
                  name="shortDescription"
                  required
                  rows={3}
                  placeholder="Brief description of the service..."
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
                  <Button type="button" variant="outline" size="sm" onClick={addFeature}>
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
                        placeholder={`Feature ${index + 1}`}
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
                  disabled={loading}
                  className="bg-leaf text-white hover:bg-leaf/90"
                >
                  <Save size={18} className="mr-2" />
                  {loading ? "Saving..." : "Save Service"}
                </Button>
              </div>

              {/* Info */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2">
                <CheckCircle size={16} className="text-leaf" />
                Service will be visible immediately after saving
              </div>
            </form>
          </CardContent>
        </Card>
      </AnimatedSection>
    </Section>
  );
}
