import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Image as ImageIcon } from "lucide-react";

import { Button } from "../../../components/ui/button";
import { Card, CardContent } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import { Label } from "../../../components/ui/label";
import { Badge } from "../../../components/ui/badge";
import { Section, SectionHeader } from "../../../components/common/Section";
import { useToast } from "../../../hooks/use-toast";
import { projectsApi } from "../../../services/api";

/* ------------------------------------------------------------------ */
interface ProjectForm {
  title: string;
  location: string;
  sector: string;
  service: string;
  description: string;
  image?: File | null;
}
/* ------------------------------------------------------------------ */

export default function AddProject() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [form, setForm] = useState<ProjectForm>({
    title: "",
    location: "",
    sector: "",
    service: "",
    description: "",
    image: null,
  });

  const [preview, setPreview] = useState<string>("");

  /* ---------------- Image Upload ---------------- */
  const handleImageUpload = (file: File) => {
    setForm((prev) => ({ ...prev, image: file }));

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* ---------------- Submit to Backend ---------------- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("location", form.location);
      formData.append("sector", form.sector);
      formData.append("service", form.service);
      formData.append("description", form.description);

      if (form.image) {
        formData.append("image", form.image);
      }

      await projectsApi.create(formData);

      toast({
        title: "Project Added",
        description: "Gallery project added successfully",
      });

      setForm({
        title: "",
        location: "",
        sector: "",
        service: "",
        description: "",
        image: null,
      });

      setPreview("");

      navigate("/admin/gallery");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Something went wrong",
        variant: "destructive",
      });
    }
  };

  return (
    <Section>
      <SectionHeader
        badge="Admin Panel"
        title="Add New Project"
        subtitle="Add a project to the gallery"
      />

      <div className="grid lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {/* FORM */}
        <Card>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Image Upload */}
              <div className="space-y-2">
                <Label>Project Image</Label>
                <div
                  className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-primary"
                  onClick={() => document.getElementById("imageInput")?.click()}
                >
                  <ImageIcon className="mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Click or drag image to upload
                  </p>
                  <input
                    id="imageInput"
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(e) =>
                      e.target.files && handleImageUpload(e.target.files[0])
                    }
                  />
                </div>
              </div>

              {/* Title */}
              <div className="space-y-2">
                <Label>Project Title *</Label>
                <Input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label>Location *</Label>
                <Input
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Sector */}
              <div className="space-y-2">
                <Label>Sector *</Label>
                <Input
                  name="sector"
                  value={form.sector}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Service */}
              <div className="space-y-2">
                <Label>Service *</Label>
                <Input
                  name="service"
                  value={form.service}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                />
              </div>

              <div className="flex justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/admin/gallery")}
                >
                  Cancel
                </Button>
                <Button className="bg-leaf text-white">Save Project</Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* LIVE PREVIEW */}
        <Card className="h-fit">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">Live Preview</h3>

            <div className="rounded-lg overflow-hidden border">
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="h-48 flex items-center justify-center bg-muted">
                  <ImageIcon className="text-muted-foreground" />
                </div>
              )}

              <div className="p-4 space-y-2">
                <h4 className="font-semibold">
                  {form.title || "Project Title"}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {form.location || "Location"}
                </p>
                <div className="flex gap-2">
                  {form.sector && <Badge>{form.sector}</Badge>}
                  {form.service && (
                    <Badge variant="secondary">{form.service}</Badge>
                  )}
                </div>
                <p className="text-sm mt-2">
                  {form.description || "Project description..."}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Section>
  );
}
