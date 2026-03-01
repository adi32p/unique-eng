import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FileText,
  ClipboardCheck,
  Bell,
  TrendingUp,
  ArrowRight,
  PlusCircle,
  Briefcase,
} from "lucide-react";

import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Section, SectionHeader } from "../../components/common/Section";
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "../../components/common/AnimatedSection";

const API_BASE = "http://localhost:5000/api";

/* ------------------------------------------------------------------ */
/* Dashboard Page */
/* ------------------------------------------------------------------ */
export default function Dashboard() {
  const [stats, setStats] = useState([
    {
      label: "My Services",
      value: 0,
      icon: ClipboardCheck,
      link: "/user/my-services",
    },
    {
      label: "Documents",
      value: 0,
      icon: FileText,
      link: "/user/documents",
    },
    {
      label: "Notifications",
      value: 0,
      icon: Bell,
      link: "/user/notifications",
    },
    {
      label: "Service Progress",
      value: "0%",
      icon: TrendingUp,
      link: "/user/my-services",
    },
  ]);

  /* ---------------- Fetch Dashboard Data ---------------- */
  const fetchDashboard = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await fetch(`${API_BASE}/user/dashboard`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch dashboard");
      }

      const data = await response.json();

      setStats([
        {
          label: "My Services",
          value: data.myServices ?? 0,
          icon: ClipboardCheck,
          link: "/user/my-services",
        },
        {
          label: "Documents",
          value: data.documents ?? 0,
          icon: FileText,
          link: "/user/documents",
        },
        {
          label: "Notifications",
          value: data.notifications ?? 0,
          icon: Bell,
          link: "/user/notifications",
        },
        {
          label: "Service Progress",
          value: `${data.serviceProgress ?? 0}%`,
          icon: TrendingUp,
          link: "/user/my-services",
        },
      ]);
    } catch (error) {
      console.error("Failed to load dashboard data:", error);
    }
  }, []);

  useEffect(() => {
    fetchDashboard();

    // 🔥 Optional: auto refresh every 30 seconds
    const interval = setInterval(() => {
      fetchDashboard();
    }, 30000);

    return () => clearInterval(interval);
  }, [fetchDashboard]);

  return (
    <>
      {/* Welcome */}
      <Section className="bg-gradient-to-br from-forest via-primary to-forest text-white">
        <AnimatedSection>
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">
            Welcome back 👋
          </h1>
          <p className="text-white/80 max-w-2xl">
            Apply for new services, track approvals, and manage documents —
            everything in one place.
          </p>

          <div className="mt-6 flex gap-4 flex-wrap">
            <Button asChild className="bg-leaf hover:bg-leaf/90">
              <Link to="/services">
                <Briefcase size={18} className="mr-2" />
                Browse Services
              </Link>
            </Button>

            <Button asChild className="bg-leaf/80 hover:bg-leaf/90 text-white">
              <Link to="/user/my-services">My Applications</Link>
            </Button>
          </div>
        </AnimatedSection>
      </Section>

      {/* Stats */}
      <Section className="-mt-20 pt-24 bg-gradient-to-r from-leaf/5 to-sky/5">
        <SectionHeader
          badge="Overview"
          title="Your Activity"
          subtitle="Quick snapshot of your account"
        />

        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <StaggerItem key={stat.label}>
                <Link to={stat.link}>
                  <Card className="h-full bg-background/80 backdrop-blur-sm hover:shadow-nature transition-shadow group">
                    <CardContent className="p-6 text-center">
                      <div className="w-14 h-14 mx-auto rounded-xl bg-gradient-forest flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Icon className="text-white" size={24} />
                      </div>

                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring" }}
                        className="text-3xl font-display font-bold text-primary mb-1"
                      >
                        {stat.value}
                      </motion.div>

                      <div className="text-sm text-muted-foreground">
                        {stat.label}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </Section>

      {/* Actions */}
      <Section className="leaf-pattern">
        <SectionHeader
          badge="Actions"
          title="Get Things Done"
          subtitle="Common actions you’ll need"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ActionCard
            title="Apply for New Service"
            description="Explore and apply for our environmental services"
            link="/services"
            icon={PlusCircle}
          />

          <ActionCard
            title="My Services"
            description="Track status of requested services"
            link="/user/my-services"
            icon={ClipboardCheck}
          />

          <ActionCard
            title="Upload Documents"
            description="Submit required compliance documents"
            link="/user/documents"
            icon={FileText}
          />

          <ActionCard
            title="Notifications"
            description="View alerts, updates, and reminders"
            link="/user/notifications"
            icon={Bell}
          />
        </div>
      </Section>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Reusable Action Card */
/* ------------------------------------------------------------------ */
function ActionCard({
  title,
  description,
  link,
  icon: Icon,
}: {
  title: string;
  description: string;
  link: string;
  icon: any;
}) {
  return (
    <AnimatedSection>
      <Card className="h-full card-nature hover:shadow-nature transition-all">
        <CardContent className="p-6 flex flex-col h-full">
          <div className="w-12 h-12 rounded-lg bg-gradient-forest flex items-center justify-center mb-4">
            <Icon className="text-white" size={22} />
          </div>

          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <p className="text-muted-foreground text-sm mb-6">
            {description}
          </p>

          <Button asChild variant="outline" className="mt-auto">
            <Link to={link}>
              Open
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </AnimatedSection>
  );
}