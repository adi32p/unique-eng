import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Image as ImageIcon,
  Plus,
  Edit,
  Trash2,
  MapPin,
  Pencil,
  Tag,
} from "lucide-react";

import { Link } from "react-router-dom";

import { Button } from "../../../components/ui/button";
import { Card, CardContent } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Section, SectionHeader } from "../../../components/common/Section";
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "../../../components/common/AnimatedSection";

const API_BASE = "http://localhost:5000/api";

/* ------------------------------------------------------------------ */
/* Types */
/* ------------------------------------------------------------------ */
interface Project {
  _id: string;
  title: string;
  location: string;
  sector: string;
  service: string;
  description?: string;
  image: string;
}

/* ------------------------------------------------------------------ */
/* Main Component */
/* ------------------------------------------------------------------ */
export default function GalleryManager() {
  const [projects, setProjects] = useState<Project[]>([]);

  /* ---------------- Fetch Projects ---------------- */
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch(`${API_BASE}/projects`);
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error("Failed to fetch projects", error);
    }
  };

  /* ---------------- Delete Project ---------------- */
  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${API_BASE}/projects/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Delete failed");
      }

      setProjects((prev) => prev.filter((p) => p._id !== id));
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <Section className="leaf-pattern">
      <SectionHeader
        badge="Admin Panel"
        title="Gallery Manager"
        subtitle="Add, edit, and manage project gallery items"
      />

      {/* Add Project */}
      <AnimatedSection className="flex justify-end mb-6">
        <Button asChild className="bg-leaf hover:bg-leaf/90 text-white">
          <Link to="/admin/gallery/add">
            <Plus size={18} className="mr-2" />
            Add Project
          </Link>
        </Button>
      </AnimatedSection>

      {/* Gallery Grid */}
      <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <StaggerItem key={project._id}>
            <Card className="group h-full bg-card border-border/50 hover:shadow-nature transition-shadow overflow-hidden">
              
              {/* Real Image */}
              <div className="aspect-video overflow-hidden">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="aspect-video bg-gradient-to-br from-primary/30 to-forest/30 flex items-center justify-center">
                    <ImageIcon className="w-16 h-16 text-white/40" />
                  </div>
                )}
              </div>

              <CardContent className="p-5 flex flex-col h-full">
                {/* Title */}
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>

                {/* Meta */}
                <div className="space-y-2 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-2">
                    <MapPin size={14} />
                    {project.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <Tag size={14} />
                    {project.service}
                  </div>
                </div>

                {/* Badges */}
                <div className="flex gap-2 mb-6">
                  <Badge variant="secondary">{project.sector}</Badge>
                </div>
                
                <div className="flex gap-3 pt-4 border-t border-border/50">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1"
                        asChild
                      >
                        <Link to={`/admin/services/edit/${project._id}`}>
                          <Pencil size={16} className="mr-2" />
                          Edit
                        </Link>
                      </Button>

                      <Button
                        size="sm"
                        variant="destructive"
                        className="flex-1 bg-red-500/10 text-red-500 hover:bg-red-500/20"
                        onClick={() => handleDelete((project._id))}
                      >
                        <Trash2 size={16} className="mr-2" />
                        Delete
                      </Button>
                    </div>
              </CardContent>
            </Card>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </Section>
  );
}
