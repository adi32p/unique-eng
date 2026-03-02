import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Leaf,
  X,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Tag,
  Filter,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { AnimatedSection } from "../../components/common/AnimatedSection";
import { Section, SectionHeader } from "../../components/common/Section";
import { FloatingLeaves } from "../../components/common/Parallax";
import { galleryProjects, sectors, services } from "../../data/mockData";
import { cn } from "../../lib/utils";

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
              Our Work
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6"
          >
            Project
            <br />
            <span className="text-leaf-light">Gallery</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-white/80 max-w-2xl mx-auto"
          >
            Explore our portfolio of successful environmental projects across
            various sectors and services.
          </motion.p>
        </div>
      </div>
    </section>
  );
}

// Filter Section
function FilterSection({
  selectedSector,
  setSelectedSector,
  selectedService,
  setSelectedService,
}: {
  selectedSector: string;
  setSelectedSector: (s: string) => void;
  selectedService: string;
  setSelectedService: (s: string) => void;
}) {
  return (
    <Section
      noPadding
      className="py-8 sticky top-16 z-30 bg-background/95 backdrop-blur-md border-b"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Filter size={16} />
            <span>Filter by:</span>
          </div>

          {/* Sector Filter */}
          <div className="flex flex-wrap gap-2">
            <Button
              size="sm"
              variant={selectedSector === "all" ? "default" : "outline"}
              onClick={() => setSelectedSector("all")}
            >
              All Sectors
            </Button>
            {sectors.map((sector) => (
              <Button
                key={sector.id}
                size="sm"
                variant={selectedSector === sector.id ? "default" : "outline"}
                onClick={() => setSelectedSector(sector.id)}
              >
                {sector.title}
              </Button>
            ))}
          </div>

          {/* Divider */}
          <div className="hidden md:block w-px h-6 bg-border" />

          {/* Service Filter */}
          <div className="flex flex-wrap gap-2">
            <Button
              size="sm"
              variant={selectedService === "all" ? "secondary" : "ghost"}
              onClick={() => setSelectedService("all")}
            >
              All Services
            </Button>
            {services.slice(0, 3).map((service) => (
              <Button
                key={service.id}
                size="sm"
                variant={selectedService === service.id ? "secondary" : "ghost"}
                onClick={() => setSelectedService(service.id)}
              >
                {service.title}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

// Project Showcase (Horizontal Slider)
function ProjectShowcase({
  projects,
  onProjectClick,
}: {
  projects: typeof galleryProjects;
  onProjectClick: (project: (typeof galleryProjects)[0]) => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  if (projects.length === 0) {
    return (
      <Section>
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No projects found matching your filters.
          </p>
        </div>
      </Section>
    );
  }

  return (
    <Section>
      <div className="relative">
        {/* Main Slider */}
        <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-2xl bg-muted">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <img
                src={projects[currentIndex].image}
                alt={projects[currentIndex].title}
                className="w-full h-full object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50" />

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white max-w-2xl px-8">
                  <Badge className="mb-4 bg-leaf/80">
                    {projects[currentIndex].sector}
                  </Badge>

                  <h2 className="text-3xl md:text-4xl font-display font-bold mb-2">
                    {projects[currentIndex].title}
                  </h2>

                  <p className="text-white/80 mb-4">
                    {projects[currentIndex].description}
                  </p>

                  <div className="flex items-center justify-center gap-4 text-sm text-white/80">
                    <span className="flex items-center gap-1">
                      <MapPin size={14} />
                      {projects[currentIndex].location}
                    </span>

                    <span className="flex items-center gap-1">
                      <Tag size={14} />
                      {projects[currentIndex].service}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white"
            onClick={prevSlide}
          >
            <ChevronLeft size={24} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white"
            onClick={nextSlide}
          >
            <ChevronRight size={24} />
          </Button>

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {projects.map((_, index) => (
              <button
                key={index}
                className={cn(
                  "w-2 h-2 rounded-full transition-all",
                  index === currentIndex ? "bg-white w-6" : "bg-white/50",
                )}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>

        {/* Thumbnail Strip */}
        <div className="mt-4 flex gap-4 overflow-x-auto pb-4">
          {projects.map((project, index) => (
            <button
              key={project.id}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                "shrink-0 w-32 h-20 rounded-lg overflow-hidden relative group transition-all",
                index === currentIndex
                  ? "ring-2 ring-primary"
                  : "opacity-60 hover:opacity-100",
              )}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/50 to-forest/50" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white text-xs font-medium px-2 text-center">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </Section>
  );
}

// Project Grid
function ProjectGrid({
  projects,
  onProjectClick,
}: {
  projects: typeof galleryProjects;
  onProjectClick: (project: (typeof galleryProjects)[0]) => void;
}) {
  return (
    <Section>
      <SectionHeader
        badge="All Projects"
        title="Browse Our Portfolio"
        subtitle="Click on any project to view details"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <AnimatedSection key={project.id} delay={index * 0.05}>
            <Card
              className="group cursor-pointer overflow-hidden card-nature"
              onClick={() => onProjectClick(project)}
            >
              <div className="aspect-video relative bg-gradient-to-br from-primary/30 to-forest/30">
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-0 transition-transform">
                  <p className="text-white text-sm">{project.description}</p>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <Badge variant="secondary" className="shrink-0 ml-2">
                    {project.sector}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin size={12} />
                    {project.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Tag size={12} />
                    {project.service}
                  </span>
                </div>
              </CardContent>
            </Card>
          </AnimatedSection>
        ))}
      </div>
    </Section>
  );
}

// Lightbox Modal
function Lightbox({
  project,
  onClose,
  onNext,
  onPrev,
}: {
  project: (typeof galleryProjects)[0] | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative max-w-5xl w-full bg-card rounded-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 z-10 text-white hover:bg-white/20"
            onClick={onClose}
          >
            <X size={24} />
          </Button>

          {/* Navigation */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/40 text-white"
            onClick={onPrev}
          >
            <ChevronLeft size={24} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/40 text-white"
            onClick={onNext}
          >
            <ChevronRight size={24} />
          </Button>

          {/* Image */}
          <div className="aspect-video relative bg-gradient-to-br from-primary/50 to-forest/50">
            <div className="aspect-video relative">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <Badge className="mb-2">{project.sector}</Badge>
                <h2 className="text-2xl font-display font-bold">
                  {project.title}
                </h2>
              </div>
            </div>
            <p className="text-muted-foreground mb-4">{project.description}</p>
            <div className="flex items-center gap-6 text-sm">
              <span className="flex items-center gap-2">
                <MapPin size={16} className="text-primary" />
                {project.location}
              </span>
              <span className="flex items-center gap-2">
                <Tag size={16} className="text-primary" />
                {project.service}
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// Main Gallery Page
export default function GalleryPage() {
  const [selectedSector, setSelectedSector] = useState("all");
  const [selectedService, setSelectedService] = useState("all");
  const [selectedProject, setSelectedProject] = useState<
    (typeof galleryProjects)[0] | null
  >(null);

  const filteredProjects = galleryProjects.filter((project) => {
    const matchesSector =
      selectedSector === "all" ||
      project.sector.toLowerCase() === selectedSector;
    const matchesService =
      selectedService === "all" ||
      project.service.toLowerCase().includes(selectedService.replace("-", " "));
    return matchesSector && matchesService;
  });

  const handleNext = () => {
    if (!selectedProject) return;
    const currentIndex = filteredProjects.findIndex(
      (p) => p.id === selectedProject.id,
    );
    const nextIndex = (currentIndex + 1) % filteredProjects.length;
    setSelectedProject(filteredProjects[nextIndex]);
  };

  const handlePrev = () => {
    if (!selectedProject) return;
    const currentIndex = filteredProjects.findIndex(
      (p) => p.id === selectedProject.id,
    );
    const prevIndex =
      (currentIndex - 1 + filteredProjects.length) % filteredProjects.length;
    setSelectedProject(filteredProjects[prevIndex]);
  };

  return (
    <>
      <HeroSection />
      <FilterSection
        selectedSector={selectedSector}
        setSelectedSector={setSelectedSector}
        selectedService={selectedService}
        setSelectedService={setSelectedService}
      />
      <ProjectShowcase
        projects={filteredProjects}
        onProjectClick={setSelectedProject}
      />
      <ProjectGrid
        projects={filteredProjects}
        onProjectClick={setSelectedProject}
      />
      <Lightbox
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </>
  );
}
