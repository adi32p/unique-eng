import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import { Card, CardContent } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import { Label } from "../../../components/ui/label";
import { Section, SectionHeader } from "../../../components/common/Section";
import { useToast } from "../../../hooks/use-toast";

import { newsApi } from "../../../services/api";

export default function AddNews() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "Compliance",
    featured: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      await newsApi.create(form);

      toast({
        title: "News Added",
        description: "News published successfully",
      });

      navigate("/admin/news");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.response?.data?.message || "Failed to publish news",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Section>
      <SectionHeader
        badge="Admin Panel"
        title="Add News"
        subtitle="Publish a new announcement or article"
      />

      <Card className="max-w-3xl mx-auto">
        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label>Title *</Label>
              <Input
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>

            <div>
              <Label>Short Excerpt *</Label>
              <Textarea
                required
                rows={3}
                value={form.excerpt}
                onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
              />
            </div>

            <div>
              <Label>Full Content *</Label>
              <Textarea
                required
                rows={6}
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
              />
            </div>

            <div>
              <Label>Category</Label>
              <select
                className="w-full border rounded px-3 py-2"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              >
                <option>Compliance</option>
                <option>Industry</option>
                <option>Company</option>
              </select>
            </div>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) =>
                  setForm({ ...form, featured: e.target.checked })
                }
              />
              Featured Article
            </label>

            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                type="button"
                onClick={() => navigate("/admin/news")}
              >
                Cancel
              </Button>

              <Button className="bg-leaf text-white" disabled={loading}>
                {loading ? "Publishing..." : "Publish"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </Section>
  );
}
