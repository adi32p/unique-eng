import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Leaf,
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
  Filter,
  ArrowRight,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { AnimatedSection, StaggerContainer, StaggerItem } from "../../components/common/AnimatedSection";
import { Section, SectionHeader } from "../../components/common/Section";
import { FloatingLeaves } from "../../components/common/Parallax";
import { cn } from "../../lib/utils";

// Extended testimonials data
const allTestimonials = [
  {
    id: 1,
    name: "Vikram Singh",
    company: "Greentech Industries",
    role: "Managing Director",
    sector: "Industrial",
    rating: 5,
    text: "Unique.EP helped us obtain environmental clearance in record time. Their expertise and dedication are unmatched. The team was professional, responsive, and truly understood our requirements.",
    date: "2024-01-10",
  },
  {
    id: 2,
    name: "Anita Desai",
    company: "Metro City Mall",
    role: "Project Manager",
    sector: "Commercial",
    rating: 5,
    text: "Professional team with excellent knowledge of compliance requirements. They guided us through every step of the PCB consent process. Highly recommended for any commercial project.",
    date: "2024-01-05",
  },
  {
    id: 3,
    name: "Rahul Mehta",
    company: "National Highways Authority",
    role: "Environmental Officer",
    sector: "Infrastructure",
    rating: 5,
    text: "Their EIA reports are thorough and always meet regulatory standards. A trusted partner for our highway projects across multiple states.",
    date: "2023-12-28",
  },
  {
    id: 4,
    name: "Priya Sharma",
    company: "Pharma Solutions Ltd",
    role: "Compliance Head",
    sector: "Industrial",
    rating: 5,
    text: "Outstanding support for our pharmaceutical facility. The ETP designed by Unique.EP has been running flawlessly for over two years now.",
    date: "2023-12-15",
  },
  {
    id: 5,
    name: "Suresh Kumar",
    company: "Smart City Corporation",
    role: "Chief Engineer",
    sector: "Government",
    rating: 5,
    text: "Unique.EP delivered exceptional results for our AMRUT project. Their understanding of government procedures is remarkable.",
    date: "2023-12-01",
  },
  {
    id: 6,
    name: "Meera Patel",
    company: "Luxury Hotels Group",
    role: "Operations Director",
    sector: "Commercial",
    rating: 4,
    text: "Great experience working with their team for our hotel STP project. Professional approach and timely delivery.",
    date: "2023-11-20",
  },
];

const sectorFilters = ["All", "Industrial", "Commercial", "Infrastructure", "Government"];

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
              <Star size={16} />
              Client Testimonials
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6"
          >
            Customer
            <br />
            <span className="text-leaf-light">Reviews</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-white/80 max-w-2xl mx-auto"
          >
            See what our clients say about their experience working with Unique.EP
            on their environmental projects.
          </motion.p>
        </div>
      </div>
    </section>
  );
}

// Featured Testimonial Carousel
function FeaturedCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const featured = allTestimonials.slice(0, 3);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % featured.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + featured.length) % featured.length);
  };

  return (
    <Section className="bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <div className="relative">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="bg-card rounded-2xl p-8 md:p-12 shadow-nature"
          >
            {/* Quote mark */}
            <Quote className="text-leaf/20 w-16 h-16 mb-6" />

            <p className="text-xl md:text-2xl text-foreground mb-8 leading-relaxed">
              "{featured[currentIndex].text}"
            </p>

            {/* Rating */}
            <div className="flex gap-1 mb-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={24}
                  className={cn(
                    i < featured[currentIndex].rating
                      ? "text-sunrise fill-sunrise"
                      : "text-muted"
                  )}
                />
              ))}
            </div>

            {/* Client info */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-forest flex items-center justify-center text-white text-xl font-bold">
                {featured[currentIndex].name.charAt(0)}
              </div>
              <div>
                <div className="font-semibold text-lg">
                  {featured[currentIndex].name}
                </div>
                <div className="text-muted-foreground">
                  {featured[currentIndex].role}
                </div>
                <div className="text-primary text-sm">
                  {featured[currentIndex].company}
                </div>
              </div>
              <Badge className="ml-auto" variant="secondary">
                {featured[currentIndex].sector}
              </Badge>
            </div>
          </motion.div>

          {/* Navigation */}
          <div className="flex justify-center gap-4 mt-8">
            <Button variant="outline" size="icon" onClick={prevSlide}>
              <ChevronLeft size={20} />
            </Button>
            <div className="flex items-center gap-2">
              {featured.map((_, index) => (
                <button
                  key={index}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all",
                    index === currentIndex ? "bg-primary w-6" : "bg-muted-foreground/30"
                  )}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>
            <Button variant="outline" size="icon" onClick={nextSlide}>
              <ChevronRight size={20} />
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}

// All Reviews Grid
function ReviewsGrid() {
  const [selectedSector, setSelectedSector] = useState("All");

  const filteredReviews = allTestimonials.filter(
    (review) => selectedSector === "All" || review.sector === selectedSector
  );

  return (
    <Section>
      <SectionHeader
        badge="All Reviews"
        title="What Clients Say"
        subtitle="Real feedback from our valued clients across different sectors"
      />

      {/* Filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {sectorFilters.map((sector) => (
          <Button
            key={sector}
            size="sm"
            variant={selectedSector === sector ? "default" : "outline"}
            onClick={() => setSelectedSector(sector)}
          >
            {sector}
          </Button>
        ))}
      </div>

      {/* Grid */}
      <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredReviews.map((review) => (
          <StaggerItem key={review.id}>
            <Card className="h-full">
              <CardContent className="p-6">
                {/* Quote */}
                <div className="text-4xl font-display text-leaf/20 leading-none mb-3">
                  "
                </div>

                <p className="text-foreground/80 mb-4 line-clamp-4">
                  {review.text}
                </p>

                {/* Rating */}
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={cn(
                        i < review.rating
                          ? "text-sunrise fill-sunrise"
                          : "text-muted"
                      )}
                    />
                  ))}
                </div>

                {/* Client */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-forest flex items-center justify-center text-white font-semibold">
                    {review.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{review.name}</div>
                    <div className="text-sm text-muted-foreground truncate">
                      {review.company}
                    </div>
                  </div>
                  <Badge variant="secondary" className="shrink-0">
                    {review.sector}
                  </Badge>
                </div>
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
            Ready to Be Our Next Success Story?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Join 800+ satisfied clients who trust Unique.EP for their environmental needs.
          </p>
          <Button size="lg" className="bg-white text-primary hover:bg-white/90" asChild>
            <Link to="/contact">
              Start Your Project
              <ArrowRight size={18} className="ml-2" />
            </Link>
          </Button>
        </AnimatedSection>
      </div>
    </Section>
  );
}

// Main Reviews Page
export default function ReviewsPage() {
  return (
    <>
      <HeroSection />
      <FeaturedCarousel />
      <ReviewsGrid />
      <CTASection />
    </>
  );
}
