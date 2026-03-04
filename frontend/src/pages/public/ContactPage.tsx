import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Clock, Send } from "lucide-react";

import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Label } from "../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

import { Section } from "../../components/common/Section";
import { FloatingLeaves } from "../../components/common/Parallax";
import { useToast } from "../../hooks/use-toast";

import { servicesApi, requestsApi } from "../../services/api";


/* ================= HERO ================= */

function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-forest via-primary to-forest">
      <FloatingLeaves />
      <div className="relative container mx-auto px-4 text-center text-white">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold"
        >
          Contact Us
        </motion.h1>
        <p className="mt-4 text-white/80">
          Have a project in mind? Let's discuss your environmental needs.
        </p>
      </div>
    </section>
  );
}

/* ================= CONTACT FORM ================= */

function ContactFormSection() {
  const { toast } = useToast();

  const [services, setServices] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [consent, setConsent] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    service: "", // will store ObjectId
    state: "",
    message: "",
  });

  /* 🔥 FETCH SERVICES FROM BACKEND */
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data } = await servicesApi.getAll();
        setServices(data);
      } catch (error) {
        console.error("Failed to fetch services", error);
      }
    };

    fetchServices();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!consent) {
      toast({
        title: "Consent Required",
        description: "Please agree to receive notifications.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.service) {
      toast({
        title: "Select Service",
        description: "Please select a service.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmitting(true);

      const token = localStorage.getItem("token");

      if (!token) {
        toast({
          title: "Login Required",
          description: "Please login to submit a service request.",
          variant: "destructive",
        });
        return;
      }

      await requestsApi.create({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        service: formData.service,
      });
      toast({
        title: "Request Submitted!",
        description: "Admin will review your request shortly.",
      });

      setFormData({
        name: "",
        company: "",
        email: "",
        phone: "",
        service: "",
        state: "",
        message: "",
      });

      setConsent(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Section>
      <div className="grid lg:grid-cols-5 gap-12">
        {/* FORM SIDE */}
        <div className="lg:col-span-3">
          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Full Name *</Label>
                    <Input
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          name: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div>
                    <Label>Company</Label>
                    <Input
                      value={formData.company}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          company: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Email *</Label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          email: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div>
                    <Label>Phone *</Label>
                    <Input
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          phone: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label>Service *</Label>
                  <Select
                    value={formData.service}
                    onValueChange={(value) =>
                      setFormData({
                        ...formData,
                        service: value, // ✅ storing ObjectId
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select service" />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem
                          key={service._id}
                          value={service._id} // ✅ ObjectId here
                        >
                          {service.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Message</Label>
                  <Textarea
                    rows={5}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        message: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                  />
                  <Label className="text-sm">I agree to receive updates.</Label>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                  <Send className="ml-2" size={16} />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* CONTACT INFO SIDE */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-gradient-forest text-white">
            <CardContent className="p-6 space-y-4">
              <h3 className="text-xl font-semibold">Quick Contact</h3>
              <div className="flex items-center gap-3">
                <Phone size={18} />
                +91 7204796446
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} />
                uniqueengi.global@gmail.com
              </div>
              <div className="flex items-center gap-3">
                <Clock size={18} />
                Mon - Sat: 9AM - 6PM
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Section>
  );
}

/* ================= MAIN ================= */

export default function ContactPage() {
  return (
    <>
      <HeroSection />
      <ContactFormSection />
    </>
  );
}
