import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Users,
  FileCheck,
  ClipboardList,
  Image,
  Newspaper,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { useEffect, useState } from "react";

import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Section } from "../../components/common/Section";
import { AnimatedSection } from "../../components/common/AnimatedSection";

/* -----------------------------
   API BASE
-------------------------------- */
const API_BASE = "http://localhost:5000/api";

/* -----------------------------
   Quick Actions (unchanged)
-------------------------------- */
const quickActions = [
  {
    title: "Manage Services",
    description: "Add, edit or remove services",
    icon: FileCheck,
    link: "/admin/services",
  },
  {
    title: "Gallery Manager",
    description: "Upload recent project images",
    icon: Image,
    link: "/admin/gallery",
  },
  {
    title: "News & Updates",
    description: "Publish announcements & updates",
    icon: Newspaper,
    link: "/admin/news",
  },
  {
    title: "User Management",
    description: "View and manage users",
    icon: Users,
    link: "/admin/users",
  },
];

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState({
    totalUsers: 0,
    activeServices: 0,
    pendingRequests: 0,
    expiringLicenses: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await fetch(
          `${API_BASE}/admin/dashboard`,
          {
            headers: {
              Authorization: `Bearer ${
                localStorage.getItem("token") || ""
              }`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch dashboard data");
        }

        const data = await response.json();

        setDashboardData({
          totalUsers: data.totalUsers || 0,
          activeServices: data.activeServices || 0,
          pendingRequests: data.pendingRequests || 0,
          expiringLicenses: data.expiringLicenses || 0,
        });
      } catch (error) {
        console.error("Error fetching dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  /* -----------------------------
     Dynamic Stats
  -------------------------------- */
  const stats = [
    {
      label: "Total Users",
      value: dashboardData.totalUsers,
      icon: Users,
      color: "from-sky/20 to-sky/5",
      link: "/admin/users",
    },
    {
      label: "Active Services",
      value: dashboardData.activeServices,
      icon: FileCheck,
      color: "from-leaf/20 to-leaf/5",
      link: "/admin/services",
    },
    {
      label: "Pending Requests",
      value: dashboardData.pendingRequests,
      icon: ClipboardList,
      color: "from-sunrise/20 to-sunrise/5",
      link: "/admin/requests",
    },
    {
      label: "Licenses Expiring",
      value: dashboardData.expiringLicenses,
      icon: ShieldCheck,
      color: "from-red-500/20 to-red-500/5",
      link: "/admin/licenses",
    },
  ];

  return (
    <Section className="space-y-12">
      <AnimatedSection>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-primary">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">
              Monitor, manage, and control all platform activities
            </p>
          </div>

          <Button className="bg-leaf text-white hover:bg-leaf/90">
            View Platform Overview
          </Button>
        </div>
      </AnimatedSection>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <AnimatedSection key={stat.label} delay={index * 0.1}>
              <Link to={stat.link}>
                <Card className="group cursor-pointer bg-background/80 backdrop-blur border-border/50 hover:shadow-nature transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-muted-foreground">
                          {stat.label}
                        </div>
                        <div className="text-3xl font-display font-bold text-primary mt-1">
                          {loading ? "..." : stat.value}
                        </div>
                      </div>

                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}
                      >
                        <Icon className="text-primary" size={24} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </AnimatedSection>
          );
        })}
      </div>

      {/* Quick Actions unchanged */}
      <div>
        <AnimatedSection>
          <h2 className="text-2xl font-display font-semibold mb-6">
            Quick Actions
          </h2>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <AnimatedSection key={action.title} delay={index * 0.1}>
                <Link to={action.link}>
                  <Card className="group h-full card-nature bg-card border-border/50 hover:bg-gradient-to-br hover:from-leaf/5 hover:to-transparent transition-all">
                    <CardContent className="p-6">
                      <div className="w-14 h-14 rounded-xl bg-gradient-forest flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Icon className="text-white" size={26} />
                      </div>

                      <h3 className="text-lg font-semibold mb-2 group-hover:text-primary">
                        {action.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {action.description}
                      </p>

                      <span className="inline-flex items-center text-primary font-medium">
                        Open
                        <ArrowRight size={16} className="ml-1" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
