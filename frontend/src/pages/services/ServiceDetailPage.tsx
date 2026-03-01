import { Link, useParams, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Leaf,
  CheckCircle,
  ArrowRight,
  Phone,
  FileCheck,
  Shield,
  Building2,
  ClipboardList,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Section, SectionHeader } from "@/components/common/Section";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/common/AnimatedSection";
import { FloatingLeaves } from "@/components/common/Parallax";
import { services } from "@/data/mockData";

// Icon mapping (same as Services page)
const iconMap: Record<string, React.ElementType> = {
  FileCheck,
  Shield,
  Building2,
  ClipboardList,
  CheckCircle,
  Pencil: FileCheck,
};

export default function ServiceDetailPage() {
  const { serviceId } = useParams();

  const service = services.find((s) => s.id === serviceId);

  // Safety redirect
  if (!service) {
    return <Navigate to="/services" replace />;
  }

  const IconComponent = iconMap[service.icon] || FileCheck;

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-forest via-primary to-forest">
        <FloatingLeaves />
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-cover bg-center opacity-5" />

        <div className="relative container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-leaf/20 rounded-full text-leaf-light text-sm font-medium mb-6">
                <Leaf size={16} />
                Our Services
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6"
            >
              {service.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-white/80 max-w-2xl mx-auto"
            >
              {service.description}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Service Details */}
      <Section>
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <AnimatedSection>
              <Card className="border-border/50">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-xl bg-gradient-forest flex items-center justify-center">
                      <IconComponent className="text-white" size={26} />
                    </div>
                    <h2 className="text-2xl font-semibold">
                      What We Deliver
                    </h2>
                  </div>

                  <ul className="space-y-4">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <CheckCircle className="text-leaf mt-1 shrink-0" size={18} />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <Card className="border-border/50">
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold mb-4">
                    Why Choose Unique.EPC?
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Our team combines regulatory expertise, engineering excellence,
                    and on-ground experience to deliver fast, compliant, and
                    cost-effective solutions.
                  </p>

                  <ul className="space-y-3">
                    <li className="flex gap-2 text-muted-foreground">
                      <CheckCircle size={16} className="text-leaf" />
                      PAN-India regulatory expertise
                    </li>
                    <li className="flex gap-2 text-muted-foreground">
                      <CheckCircle size={16} className="text-leaf" />
                      Dedicated compliance managers
                    </li>
                    <li className="flex gap-2 text-muted-foreground">
                      <CheckCircle size={16} className="text-leaf" />
                      800+ successful projects delivered
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>

          {/* Sidebar */}
          <AnimatedSection delay={0.2}>
            <Card className="border-border/50 sticky top-28">
              <CardContent className="p-6 space-y-4">
                <h3 className="text-lg font-semibold">
                  Get Expert Assistance
                </h3>
                <p className="text-muted-foreground text-sm">
                  Talk to our consultants and get a tailored solution for your project.
                </p>

                <Button className="w-full btn-nature" asChild>
                  <Link to="/contact">
                    Request Consultation
                    <ArrowRight size={16} className="ml-2" />
                  </Link>
                </Button>

                <Button
                  variant="outline"
                  className="w-full"
                  asChild
                >
                  <a href="tel:+919876543210" className="flex items-center justify-center gap-2">
                    <Phone size={16} />
                    Call Now
                  </a>
                </Button>
              </CardContent>
            </Card>
          </AnimatedSection>
        </div>
      </Section>

      {/* CTA */}
      <Section className="bg-gradient-to-r from-primary via-forest to-primary text-white">
        <div className="text-center py-10">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-white/80 mb-6 max-w-2xl mx-auto">
              Let our experts handle your compliance while you focus on growth.
            </p>
            <Button size="lg" className="bg-white text-primary hover:bg-white/90" asChild>
              <Link to="/contact">
                Contact Our Team
                <ArrowRight size={18} className="ml-2" />
              </Link>
            </Button>
          </AnimatedSection>
        </div>
      </Section>
    </>
  );
}
