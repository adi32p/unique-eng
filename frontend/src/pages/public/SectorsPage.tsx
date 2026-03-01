import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Leaf,
  Factory,
  Building,
  Landmark,
  MapPin,
  CheckCircle,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { AnimatedSection, StaggerContainer, StaggerItem } from "../../components/common/AnimatedSection";
import { Section, SectionHeader } from "../../components/common/Section";
import { FloatingLeaves } from "../../components/common/Parallax";
import { sectors } from "../../data/mockData";

// Extended sector data with more details
const extendedSectors = [
  {
    ...sectors[0],
    icon: Factory,
    color: "from-orange-500 to-red-500",
    bgColor: "bg-orange-500/10",
    subSectors: [
      "Pharmaceuticals",
      "Chemicals",
      "Textiles",
      "Steel & Metal",
      "Automobile",
      "Food Processing",
    ],
    services: [
      "ETP Design & Installation",
      "Air Pollution Control Systems",
      "Hazardous Waste Management",
      "Environmental Audits",
    ],
  },
  {
    ...sectors[1],
    icon: Building,
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-500/10",
    subSectors: [
      "IT Parks",
      "Shopping Malls",
      "Hotels & Resorts",
      "Hospitals",
      "Educational Institutions",
      "Residential Complexes",
    ],
    services: [
      "STP Solutions",
      "Rainwater Harvesting",
      "Solid Waste Management",
      "Green Building Compliance",
    ],
  },
  {
    ...sectors[2],
    icon: MapPin,
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-500/10",
    subSectors: [
      "National Highways",
      "Airports",
      "Ports & Harbours",
      "Metro Rail",
      "Smart Cities",
      "SEZ Development",
    ],
    services: [
      "Environmental Impact Assessment",
      "Wildlife & Forest Clearance",
      "Rehabilitation Planning",
      "Monitoring & Compliance",
    ],
  },
  {
    ...sectors[3],
    icon: Landmark,
    color: "from-purple-500 to-indigo-500",
    bgColor: "bg-purple-500/10",
    subSectors: [
      "Municipal Corporations",
      "State PSUs",
      "Central PSUs",
      "Defense Projects",
      "Power Sector",
      "Water Utilities",
    ],
    services: [
      "AMRUT Projects",
      "Swachh Bharat Mission",
      "Industrial Park Development",
      "River Rejuvenation",
    ],
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
              Industries We Serve
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6"
          >
            Sectors We
            <br />
            <span className="text-leaf-light">Work In</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-white/80 max-w-2xl mx-auto"
          >
            Specialized environmental solutions for diverse industries,
            tailored to meet sector-specific regulatory requirements.
          </motion.p>
        </div>
      </div>
    </section>
  );
}

// Sectors Detail Section
function SectorsDetailSection() {
  return (
    <Section>
      <div className="space-y-16">
        {extendedSectors.map((sector, index) => (
          <AnimatedSection
            key={sector.id}
            animation={index % 2 === 0 ? "slideInLeft" : "slideInRight"}
            delay={0.1}
          >
            <div
              id={sector.id}
              className={`grid lg:grid-cols-2 gap-8 items-center ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Image/Visual */}
              <div className={`${index % 2 === 1 ? "lg:order-2" : ""}`}>
                <Card className="overflow-hidden">
                  <div className={`aspect-video bg-gradient-to-br ${sector.color} relative`}>
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <sector.icon className="w-24 h-24 text-white/50" />
                    </div>
                    <div className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                      <span className="text-white font-bold text-2xl">
                        {sector.projectCount}+
                      </span>
                      <span className="text-white/80 text-sm ml-2">Projects</span>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Content */}
              <div className={`${index % 2 === 1 ? "lg:order-1" : ""}`}>
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${sector.bgColor} mb-4`}>
                  <sector.icon size={16} className="text-foreground" />
                  <span className="text-sm font-medium">{sector.title} Sector</span>
                </div>

                <h2 className="text-3xl font-display font-bold mb-4">{sector.title}</h2>
                <p className="text-muted-foreground mb-6">{sector.description}</p>

                {/* Sub-sectors */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold uppercase text-muted-foreground mb-3">
                    Industries Covered
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {sector.subSectors.map((sub) => (
                      <span
                        key={sub}
                        className="px-3 py-1 bg-muted rounded-full text-sm"
                      >
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Services */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold uppercase text-muted-foreground mb-3">
                    Key Services
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {sector.services.map((service) => (
                      <li key={service} className="flex items-center gap-2">
                        <CheckCircle className="text-leaf shrink-0" size={16} />
                        <span className="text-sm">{service}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button asChild>
                  <Link to="/contact">
                    Discuss Your Project
                    <ArrowRight size={16} className="ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </Section>
  );
}

// Stats Banner
function StatsBanner() {
  const stats = [
    { value: "635+", label: "Industrial Projects" },
    { value: "180+", label: "Commercial Projects" },
    { value: "120+", label: "Infrastructure Projects" },
    { value: "85+", label: "Government Projects" },
  ];

  return (
    <Section className="bg-forest text-white">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <AnimatedSection key={stat.label} delay={index * 0.1}>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-display font-bold text-leaf mb-2">
                {stat.value}
              </div>
              <div className="text-white/70 text-sm">{stat.label}</div>
            </div>
          </AnimatedSection>
        ))}
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
            Looking for Sector-Specific Solutions?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Our experts understand the unique requirements of each industry.
            Let's discuss how we can help your project.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90" asChild>
              <Link to="/contact">
                Get Industry-Specific Quote
                <ArrowRight size={18} className="ml-2" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 text-primary hover:bg-white/10"
              asChild
            >
              <Link to="/gallery">View Our Projects</Link>
            </Button>
          </div>
        </AnimatedSection>
      </div>
    </Section>
  );
}

// Main Sectors Page
export default function SectorsPage() {
  return (
    <>
      <HeroSection />
      <SectorsDetailSection />
      <StatsBanner />
      <CTASection />
    </>
  );
}
