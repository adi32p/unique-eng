import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Newspaper,
  Plus,
  Edit,
  Trash2,
  Calendar,
} from "lucide-react";

import { Button } from "../../../components/ui/button";
import { Card, CardContent } from "../../../components/ui/card";
import { Section, SectionHeader } from "../../../components/common/Section";
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "../../../components/common/AnimatedSection";
import { useToast } from "../../../hooks/use-toast";

const API_BASE = "http://localhost:5000/api";

interface NewsItem {
  _id: string;
  title: string;
  excerpt: string;
  category: string;
  createdAt: string;
  featured: boolean;
}

export default function NewsManager() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  /* Fetch News */
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(`${API_BASE}/news`);
        const data = await res.json();
        setNewsList(data);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch news",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  /* Delete News */
  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this news?"
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(`${API_BASE}/news/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Delete failed");
      }

      setNewsList((prev) => prev.filter((item) => item._id !== id));

      toast({
        title: "Deleted",
        description: "News deleted successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <Section className="leaf-pattern">
      <SectionHeader
        badge="Admin Panel"
        title="News Manager"
        subtitle="Create, update and manage website news & announcements"
      />

      {/* Add News */}
      <AnimatedSection className="flex justify-end mb-6">
        <Button
          className="bg-leaf hover:bg-leaf/90 text-white"
          onClick={() => navigate("/admin/news/add")}
        >
          <Plus size={18} className="mr-2" />
          Add News
        </Button>
      </AnimatedSection>

      {/* News List */}
      {loading ? (
        <p className="text-center text-muted-foreground">Loading...</p>
      ) : (
        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsList.map((news) => (
            <StaggerItem key={news._id}>
              <Card className="group h-full bg-card border-border/50 hover:shadow-nature transition-shadow">
                <CardContent className="p-6 flex flex-col h-full">
                  {/* Icon + Date */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-forest flex items-center justify-center">
                      <Newspaper className="text-white" size={22} />
                    </div>

                    <div className="flex items-center text-sm text-muted-foreground gap-1">
                      <Calendar size={14} />
                      {new Date(news.createdAt).toLocaleDateString()}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                    {news.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-muted-foreground text-sm flex-1">
                    {news.excerpt}
                  </p>

                  {/* Actions */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    className="mt-6 flex gap-3"
                  >
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1"
                    >
                      <Edit size={16} className="mr-2" />
                      Edit
                    </Button>

                    {/* Styled Delete Button */}
                    <Button
                      size="sm"
                      variant="destructive"
                      className="flex-1 bg-red-500/10 text-red-500 hover:bg-red-500/20"
                      onClick={() => handleDelete(news._id)}
                    >
                      <Trash2 size={16} className="mr-2" />
                      Delete
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      )}
    </Section>
  );
}
