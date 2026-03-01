import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Leaf,
  FileCheck,
  Shield,
  Building2,
  ClipboardList,
  CheckCircle,
  ArrowRight,
  ChevronRight,
  ChevronDown,
  Phone,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";
import { AnimatedSection, StaggerContainer, StaggerItem } from "../../components/common/AnimatedSection";
import { Section, SectionHeader } from "../../components/common/Section";
import { FloatingLeaves } from "../../components/common/Parallax";
import { services } from "../../data/mockData";

// Icon mapping
const iconMap: Record<string, React.ElementType> = {
  FileCheck,
  Shield,
  Building2,
  ClipboardList,
  CheckCircle,
  Pencil: FileCheck,
};

// Process steps
const processSteps = [
  {
    step: 1,
    title: "Initial Consultation",
    description: "Free consultation to understand your project requirements and regulatory needs.",
  },
  {
    step: 2,
    title: "Site Assessment",
    description: "Comprehensive site visit and environmental baseline data collection.",
  },
  {
    step: 3,
    title: "Documentation",
    description: "Preparation of all required documents, reports, and applications.",
  },
  {
    step: 4,
    title: "Submission & Liaison",
    description: "Filing applications and coordinating with regulatory authorities.",
  },
  {
    step: 5,
    title: "Approval & Compliance",
    description: "Securing approvals and ongoing compliance monitoring support.",
  },
];

// FAQ data
const faqs = [
  {
    question: "How long does the environmental clearance process take?",
    answer: "The timeline varies based on the project category. Category A projects typically take 6-12 months, while Category B projects can be completed in 3-6 months. Our team ensures efficient processing to minimize delays.",
  },
  {
    question: "Do you provide services across all states in India?",
    answer: "Yes, we have a PAN-India presence with regional offices and local experts in all 28 states. This allows us to navigate state-specific regulations effectively.",
  },
  {
    question: "What documents are typically required for PCB consent?",
    answer: "Required documents include project proposal, site plan, process flow diagram, pollution control measures, environmental statement, and relevant NOCs. We guide you through the complete documentation process.",
  },
  {
    question: "Do you offer ongoing compliance monitoring?",
    answer: "Yes, we provide comprehensive compliance management services including regular monitoring, reporting, and assistance with annual returns and environmental audits.",
  },
  {
    question: "Can you help with expired or rejected applications?",
    answer: "Absolutely. We specialize in reviving expired licenses and addressing objections in rejected applications. Our success rate in such cases is over 90%.",
  },
];

// Hero Section
function HeroSection() {
  return (
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
            Comprehensive Environmental
            <br />
            <span className="text-leaf-light">Solutions</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-white/80 max-w-2xl mx-auto"
          >
            From environmental clearance to compliance management, we offer
            end-to-end services for all your regulatory and engineering needs.
          </motion.p>
        </div>
      </div>
    </section>
  );
}

// Services Grid Section
function ServicesGridSection() {
  return (
    <Section>
      <SectionHeader
        badge="What We Offer"
        title="Our Core Services"
        subtitle="Expert solutions tailored to your environmental compliance and engineering requirements"
      />

      <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => {
          const IconComponent = iconMap[service.icon] || FileCheck;
          return (
            <StaggerItem key={service.id}>
              <Card className="h-full group card-nature border-border/50">
                <CardContent className="p-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-forest flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <IconComponent className="text-white" size={28} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground mb-4">{service.description}</p>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="text-leaf shrink-0" size={14} />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-white transition-colors" asChild>
                    <Link to={`/services/${service.id}`}>
                      Request Service
                      <ArrowRight size={16} className="ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </StaggerItem>
          );
        })}
      </StaggerContainer>
    </Section>
  );
}

// Process Section
function ProcessSection() {
  return (
    <Section className="bg-muted/30">
      <SectionHeader
        badge="How We Work"
        title="Our Process"
        subtitle="A streamlined approach to deliver results efficiently"
      />

      <div className="relative max-w-4xl mx-auto">
        {/* Process line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary/20 md:left-1/2" />

        <div className="space-y-8">
          {processSteps.map((item, index) => (
            <AnimatedSection key={item.step} delay={index * 0.1}>
              <div className="relative flex items-start gap-6 md:gap-12">
                {/* Number badge */}
                <div className="relative z-10 w-16 h-16 rounded-full bg-gradient-forest flex items-center justify-center text-white text-xl font-bold shadow-lg shrink-0">
                  {item.step}
                </div>

                <Card className="flex-1">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </Section>
  );
}

// FAQ Section
function FAQSection() {
  return (
    <Section id="faq">
      <SectionHeader
        badge="Common Questions"
        title="Frequently Asked Questions"
        subtitle="Find answers to common queries about our services"
      />

      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AnimatedSection key={index} delay={index * 0.05}>
              <AccordionItem
                value={`item-${index}`}
                className="bg-card rounded-lg border border-border/50 px-6"
              >
                <AccordionTrigger className="text-left hover:no-underline py-4">
                  <span className="font-medium">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            </AnimatedSection>
          ))}
        </Accordion>
      </div>
    </Section>
  );
}

// CTA Section
function CTASection() {
  return (
    <Section className="bg-gradient-to-r from-primary via-forest to-primary text-white">
      <div className="text-center py-8">
        <AnimatedSection>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Need Help with Your Project?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Get a free consultation from our environmental experts.
            We'll guide you through the entire process.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90" asChild>
              <Link to="/contact">
                Request Free Consultation
                <ArrowRight size={18} className="ml-2" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 text-primary hover:bg-white/10"
              asChild
            >
              <a href="tel:+919876543210" className="flex items-center gap-2">
                <Phone size={18} />
                Call Us Now
              </a>
            </Button>
          </div>
        </AnimatedSection>
      </div>
    </Section>
  );
}

// Main Services Page
export default function ServicesPage() {
  return (
    <>
      <HeroSection />
      <ServicesGridSection />
      <ProcessSection />
      <FAQSection />
      <CTASection />
    </>
  );
}
