import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Target,
  Eye,
  Leaf,
  Award,
  Users,
  CheckCircle,
  Calendar,
  ArrowRight,
  Shield,
  Globe,
  Heart,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "../../components/common/AnimatedSection";
import { Section, SectionHeader } from "../../components/common/Section";
import { FloatingLeaves } from "../../components/common/Parallax";
import { teamMembers, statistics } from "../../data/mockData";

// Timeline data
const timeline = [
  {
    year: "2019",
    title: "Foundation",
    description:
      "Unique.EP was founded with a vision to provide comprehensive environmental solutions.",
  },
  {
    year: "2021",
    title: "PAN-India Expansion",
    description:
      "Expanded operations to cover all states of India with regional offices.",
  },
  {
    year: "2022",
    title: "ISO Certification",
    description:
      "Achieved ISO 14001 certification for environmental management systems.",
  },
  {
    year: "2024",
    title: "100+ Projects",
    description:
      "Crossed the milestone of 1000 successfully completed projects.",
  },
  {
    year: "2025",
    title: "Digital Transformation",
    description: "Launched digital compliance tracking platform for clients.",
  },
  {
    year: "2026",
    title: "Industry Leader",
    description: "Recognized as a leading environmental consultancy in India.",
  },
];

const whyChooseUs = [
  {
    icon: Shield,
    title: "15+ Years Experience",
    description:
      "Deep expertise in environmental regulations and compliance requirements.",
  },
  {
    icon: Globe,
    title: "PAN-India Presence",
    description:
      "Operational across all 28 states with local regulatory knowledge.",
  },
  {
    icon: Users,
    title: "Expert Team",
    description: "50+ environmental engineers and compliance specialists.",
  },
  {
    icon: Award,
    title: "Proven Track Record",
    description: "1500+ successful projects with 98% client satisfaction rate.",
  },
  {
    icon: Heart,
    title: "Client-Centric Approach",
    description:
      "Dedicated project managers and 24/7 support for critical projects.",
  },
  {
    icon: Leaf,
    title: "Sustainability Focus",
    description:
      "Committed to sustainable development and environmental protection.",
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
              About Unique.EP
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6"
          >
            Pioneering Environmental
            <br />
            <span className="text-leaf-light">Excellence Since 2019</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-white/80 max-w-2xl mx-auto"
          >
            India's trusted partner for environmental clearance, compliance
            management, and sustainable engineering solutions.
          </motion.p>
        </div>
      </div>
    </section>
  );
}

// Mission & Vision Section
function MissionVisionSection() {
  return (
    <Section>
      <div className="grid md:grid-cols-2 gap-8">
        <AnimatedSection animation="slideInLeft">
          <Card className="h-full bg-gradient-to-br from-leaf/5 to-transparent border-leaf/20">
            <CardContent className="p-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-forest flex items-center justify-center mb-6">
                <Target className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-display font-bold mb-4">
                Our Mission
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                To provide comprehensive, reliable, and innovative environmental
                solutions that enable our clients to achieve regulatory
                compliance while contributing to sustainable development. We
                strive to be the bridge between industrial growth and
                environmental protection.
              </p>
            </CardContent>
          </Card>
        </AnimatedSection>

        <AnimatedSection animation="slideInRight">
          <Card className="h-full bg-gradient-to-br from-sky/5 to-transparent border-sky/20">
            <CardContent className="p-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-sky flex items-center justify-center mb-6">
                <Eye className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-display font-bold mb-4">
                Our Vision
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                To be India's most trusted environmental consultancy, setting
                industry standards for excellence, innovation, and
                sustainability. We envision a future where every business
                operates in harmony with the environment, creating lasting value
                for generations.
              </p>
            </CardContent>
          </Card>
        </AnimatedSection>
      </div>
    </Section>
  );
}

// Timeline Section
function TimelineSection() {
  return (
    <Section className="bg-muted/30">
      <SectionHeader
        badge="Our Journey"
        title="Building Excellence Over the Years"
        subtitle="A timeline of growth, innovation, and commitment to environmental sustainability"
      />

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-primary/20 hidden md:block" />

        <div className="space-y-12">
          {timeline.map((item, index) => (
            <AnimatedSection
              key={item.year}
              animation={index % 2 === 0 ? "slideInLeft" : "slideInRight"}
              delay={index * 0.1}
            >
              <div
                className={`flex flex-col md:flex-row gap-8 items-center ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div
                  className={`flex-1 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}
                >
                  <Card className="inline-block">
                    <CardContent className="p-6">
                      <div className="text-3xl font-display font-bold text-primary mb-2">
                        {item.year}
                      </div>
                      <h3 className="text-xl font-semibold mb-2">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {item.description}
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Center dot */}
                <div className="relative z-10 w-12 h-12 rounded-full bg-gradient-forest flex items-center justify-center text-white font-bold shadow-lg">
                  <Calendar size={20} />
                </div>

                <div className="flex-1" />
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </Section>
  );
}

// Statistics Section
function StatisticsSection() {
  return (
    <Section className="bg-forest text-white">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {statistics.map((stat, index) => (
          <AnimatedSection key={stat.label} delay={index * 0.1}>
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", delay: index * 0.1 + 0.2 }}
                className="text-5xl md:text-6xl font-display font-bold text-leaf mb-2"
              >
                {stat.value}
                {stat.suffix}
              </motion.div>
              <div className="text-white/70">{stat.label}</div>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </Section>
  );
}

// Why Choose Us Section
function WhyChooseUsSection() {
  return (
    <Section>
      <SectionHeader
        badge="Why Unique.EP"
        title="Why Choose Us"
        subtitle="What sets us apart in the environmental consultancy landscape"
      />

      <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {whyChooseUs.map((item) => (
          <StaggerItem key={item.title}>
            <Card className="h-full group hover:shadow-nature transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-gradient-forest group-hover:text-white transition-all">
                  <item.icon
                    size={24}
                    className="text-primary group-hover:text-white"
                  />
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </Section>
  );
}

// Team Section
function TeamSection() {
  return (
    <Section className="bg-muted/30 py-16" id="team">
      <SectionHeader
        badge="Our Leadership"
        title="Meet the Team"
        subtitle="Experienced professionals driving environmental excellence"
      />

      <StaggerContainer
        className={`grid gap-8 justify-center ${
          teamMembers.length === 2
            ? "md:grid-cols-2 max-w-4xl mx-auto"
            : "md:grid-cols-2 lg:grid-cols-4"
        }`}
      >
        {teamMembers.map((member) => (
          <StaggerItem key={member.id}>
            <Card className="group h-full max-w-sm mx-auto overflow-hidden rounded-2xl shadow-md transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
              {/* IMAGE */}
              <div className="w-full aspect-[4/5] overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* CONTENT */}
              <CardContent className="p-6 text-center">
                <h3 className="font-semibold text-xl mb-1">{member.name}</h3>

                <p className="text-primary text-sm font-medium mb-3">
                  {member.role}
                </p>

                <p className="text-muted-foreground text-sm leading-relaxed">
                  {member.bio}
                </p>
              </CardContent>
            </Card>
          </StaggerItem>
        ))}
      </StaggerContainer>
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
            Ready to Partner with Us?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Join 800+ satisfied clients who trust Unique.EP for their
            environmental needs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90"
              asChild
            >
              <Link to="/contact">
                Get in Touch
                <ArrowRight size={18} className="ml-2" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 text-primary hover:bg-white/10"
              asChild
            >
              <Link to="/services">Our Services</Link>
            </Button>
          </div>
        </AnimatedSection>
      </div>
    </Section>
  );
}

// Main About Page
export default function AboutPage() {
  return (
    <>
      <HeroSection />
      <MissionVisionSection />
      <TimelineSection />
      <StatisticsSection />
      <WhyChooseUsSection />
      <TeamSection />
      <CTASection />
    </>
  );
}
