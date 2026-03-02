import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Leaf,
  Shield,
  Building2,
  CheckCircle,
  MapPin,
  ChevronRight,
  Star,
  FileCheck,
  ClipboardList,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { AnimatedSection, StaggerContainer, StaggerItem } from "../../components/common/AnimatedSection";
import { Section, SectionHeader } from "../../components/common/Section";
import { FloatingLeaves, Parallax } from "../../components/common/Parallax";
import { services, sectors, statistics, testimonials } from "../../data/mockData";
import { useRef } from "react";

// Icon mapping
const iconMap: Record<string, React.ElementType> = {
  FileCheck,
  Shield,
  Building2,
  ClipboardList,
  CheckCircle,
  Pencil: FileCheck,
};

// Hero Section
function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-forest via-primary to-forest"
    >
      {/* Animated background elements */}
      <div className="pointer-events-none">
        <FloatingLeaves />
      </div>

      <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-cover bg-center opacity-10 pointer-events-none" />

      <motion.div
        style={{ y }}
        className="absolute inset-0 bg-gradient-to-b from-transparent via-forest/50 to-forest pointer-events-none"
      />

      {/* Decorative shapes */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-leaf/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-sky/10 rounded-full blur-3xl pointer-events-none" />

      <motion.div style={{ opacity }} className="relative container mx-auto px-4 pt-24">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-leaf/20 rounded-full text-leaf-light text-sm font-medium backdrop-blur-sm">
              <Leaf size={16} />
              PAN-India Environmental Solutions
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold text-white leading-tight mb-6"
          >
            Engineering a{" "}
            <span className="text-leaf-light">Sustainable</span>
            <br />
            Future for India
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl"
          >
            Comprehensive environmental clearance, compliance management, and engineering
            solutions trusted by 800+ clients across all 28 states.
          </motion.p>

          {/* ✅ CTA FIX */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative z-20 flex flex-wrap gap-4"
          >
            <Button size="lg" className="bg-leaf hover:bg-leaf/90 text-white btn-nature" asChild>
              <Link to="/services">
                Explore Services
                <ArrowRight size={18} className="ml-2" />
              </Link>
            </Button>
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90"
              asChild
            >
              <Link to="/contact">
                Contact Us
                <ArrowRight size={18} className="ml-2" />
              </Link>
            </Button>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 flex flex-wrap items-center gap-6 text-white/70"
          >
            <div className="flex items-center gap-2">
              <CheckCircle className="text-leaf" size={20} />
              <span>ISO 14001 Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="text-leaf" size={20} />
              <span>MoEF&CC Accredited</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="text-leaf" size={20} />
              <span>28 States Covered</span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2"
        >
          <motion.div className="w-1.5 h-1.5 bg-white rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}


// Statistics Section
function StatisticsSection() {
  return (
    <Section className="bg-gradient-to-r from-leaf/5 to-sky/5 -mt-20 pt-32">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {statistics.map((stat, index) => (
          <AnimatedSection key={stat.label} delay={index * 0.1}>
            <Card className="text-center p-6 bg-background/80 backdrop-blur-sm border-leaf/10 hover:shadow-nature transition-shadow">
              <CardContent className="p-0">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", delay: index * 0.1 + 0.2 }}
                  className="text-4xl md:text-5xl font-display font-bold text-primary mb-2"
                >
                  {stat.value}
                  {stat.suffix}
                </motion.div>
                <div className="text-muted-foreground text-sm">{stat.label}</div>
              </CardContent>
            </Card>
          </AnimatedSection>
        ))}
      </div>
    </Section>
  );
}

// Services Preview Section
function ServicesSection() {
  return (
    <Section className="leaf-pattern">
      <SectionHeader
        badge="Our Expertise"
        title="Comprehensive Environmental Services"
        subtitle="End-to-end solutions for all your environmental compliance and engineering needs"
      />

      <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => {
          const IconComponent = iconMap[service.icon] || FileCheck;
          return (
            <StaggerItem key={service.id}>
              <Card className="group h-full card-nature bg-card hover:bg-gradient-to-br hover:from-leaf/5 hover:to-transparent border-border/50">
                <CardContent className="p-6">
                  <div className="w-14 h-14 rounded-xl bg-gradient-forest flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <IconComponent className="text-white" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">{service.shortDescription}</p>
                  <ul className="space-y-2 mb-4">
                    {service.features.slice(0, 3).map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="text-leaf shrink-0" size={14} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={`/services/${service.id}`}
                    className="inline-flex items-center text-primary font-medium hover:gap-2 transition-all"
                  >
                    Learn More <ChevronRight size={16} />
                  </Link>
                </CardContent>
              </Card>
            </StaggerItem>
          );
        })}
      </StaggerContainer>

      <AnimatedSection className="text-center mt-12">
        <Button size="lg" asChild>
          <Link to="/services">
            View All Services
            <ArrowRight size={18} className="ml-2" />
          </Link>
        </Button>
      </AnimatedSection>
    </Section>
  );
}

// Sectors Section
function SectorsSection() {
  return (
    <Section className="bg-forest text-white overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/placeholder.svg')] bg-cover" />
      </div>

      <div className="relative">
        <SectionHeader
          badge="Industries We Serve"
          title="Sectors We Work In"
          subtitle="Delivering specialized environmental solutions across diverse industries"
        />

        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sectors.map((sector) => (
            <StaggerItem key={sector.id}>
              <Link to={`/sectors#${sector.id}`}>
                <Card className="group h-full bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <Building2 className="text-leaf" size={32} />
                      <span className="text-2xl font-display font-bold text-leaf">
                        {sector.projectCount}+
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-white">{sector.title}</h3>
                    <p className="text-white/70 text-sm mb-4">{sector.description}</p>
                    <div className="space-y-1">
                      {sector.highlights.map((highlight) => (
                        <div
                          key={highlight}
                          className="text-xs text-leaf-light flex items-center gap-1"
                        >
                          <ChevronRight size={12} />
                          {highlight}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </Section>
  );
}

// Testimonials Section
function TestimonialsSection() {
  return (
    <Section>
      <SectionHeader
        badge="Client Success"
        title="What Our Clients Say"
        subtitle="Trusted by leading companies across India"
      />

      <StaggerContainer className="grid md:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <StaggerItem key={testimonial.id}>
            <Card className="h-full bg-card border-border/50">
              <CardContent className="p-6">
                {/* Quote mark */}
                <div className="text-6xl font-display text-leaf/20 leading-none mb-4">"</div>
                
                <p className="text-foreground/80 mb-6 italic">{testimonial.text}</p>

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < testimonial.rating ? "text-sunrise fill-sunrise" : "text-muted"}
                    />
                  ))}
                </div>

                {/* Client info */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-forest flex items-center justify-center text-white font-semibold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.company}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </StaggerItem>
        ))}
      </StaggerContainer>

      <AnimatedSection className="text-center mt-12">
        <Button variant="outline" size="lg" asChild>
          <Link to="/reviews">
            Read More Reviews
            <ArrowRight size={18} className="ml-2" />
          </Link>
        </Button>
      </AnimatedSection>
    </Section>
  );
}

// CTA Section
function CTASection() {
  return (
    <Section className="bg-gradient-to-r from-primary via-forest to-primary">
      <div className="relative text-center text-white py-12">
        <Parallax speed={0.2}>
          <Leaf className="absolute top-0 left-10 text-leaf/20 w-32 h-32 rotate-45" />
          <Leaf className="absolute bottom-0 right-10 text-leaf/20 w-24 h-24 -rotate-12" />
        </Parallax>

        <AnimatedSection>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Get expert guidance on environmental clearance and compliance.
            Our team is ready to help you navigate the regulatory landscape.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90" asChild>
              <Link to="/contact">
                Get Free Consultation
                <ArrowRight size={18} className="ml-2" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 text-primary hover:bg-white/10"
              asChild
            >
              <Link to="/services">Explore Services</Link>
            </Button>
          </div>
        </AnimatedSection>
      </div>
    </Section>
  );
}

// Main Landing Page
export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <StatisticsSection />
      <ServicesSection />
      <SectorsSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
