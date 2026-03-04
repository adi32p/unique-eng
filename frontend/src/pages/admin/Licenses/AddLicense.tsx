import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Save, ArrowLeft } from "lucide-react";

import { Button } from "../../../components/ui/button";
import { Card, CardContent } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import { Section, SectionHeader } from "../../../components/common/Section";
import { AnimatedSection } from "../../../components/common/AnimatedSection";
import { useToast } from "../../../hooks/use-toast";

import { licensesApi } from "../../../services/api";

interface LicenseForm {
  name: string;
  authority: string;
  licenseNumber: string;
  issueDate: string;
  validTill: string;
  userEmail: string;
  remarks?: string;
}

export default function AddLicense() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [form, setForm] = useState<LicenseForm>({
    name: "",
    authority: "",
    licenseNumber: "",
    issueDate: "",
    validTill: "",
    userEmail: "",
    remarks: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await licensesApi.create(form);

      toast({
        title: "Success",
        description: "License created successfully",
      });

      navigate("/admin/licenses");
    } catch (error: any) {
      toast({
        title: "Error",
        description:
          error?.response?.data?.message || "Failed to create license",
        variant: "destructive",
      });
    }
  };

  return (
    <Section className="leaf-pattern min-h-screen">
      <SectionHeader
        badge="Admin Panel"
        title="Add New License"
        subtitle="Create and assign a license with expiry tracking"
      />

      <AnimatedSection className="max-w-3xl mx-auto">
        <Card className="card-nature">
          <CardContent className="p-8 space-y-6">
            <div>
              <label className="text-sm font-medium">License Name</label>
              <Input name="name" value={form.name} onChange={handleChange} />
            </div>

            <div>
              <label className="text-sm font-medium">Issuing Authority</label>
              <Input
                name="authority"
                value={form.authority}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="text-sm font-medium">License Number</label>
              <Input
                name="licenseNumber"
                value={form.licenseNumber}
                onChange={handleChange}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium">Issue Date</label>
                <Input
                  type="date"
                  name="issueDate"
                  value={form.issueDate}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="text-sm font-medium">Valid Till</label>
                <Input
                  type="date"
                  name="validTill"
                  value={form.validTill}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">User Email</label>
              <Input
                name="userEmail"
                value={form.userEmail}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="text-sm font-medium">Remarks (Optional)</label>
              <Textarea
                name="remarks"
                value={form.remarks}
                onChange={handleChange}
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => navigate(-1)}
              >
                <ArrowLeft size={16} className="mr-2" />
                Cancel
              </Button>

              <Button
                className="flex-1 bg-leaf hover:bg-leaf/90 text-white"
                onClick={handleSubmit}
              >
                <Save size={16} className="mr-2" />
                Save License
              </Button>
            </div>
          </CardContent>
        </Card>
      </AnimatedSection>
    </Section>
  );
}
