import {
  Users,
  Mail,
  ShieldCheck,
  User,
  Eye,
  Ban,
} from "lucide-react";

import { Card, CardContent } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Section } from "../../../components/common/Section";
import { AnimatedSection } from "../../../components/common/AnimatedSection";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";   // ✅ Added

const API_BASE = "http://localhost:5000/api";

interface UserType {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  status?: "active" | "inactive";
}

export default function UsersList() {
  const [users, setUsers] = useState<UserType[]>([]);
  const navigate = useNavigate();   // ✅ Added

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${API_BASE}/admin/users`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch users");

      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  return (
    <Section className="space-y-10">
      <AnimatedSection>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-primary">
              Users Management
            </h1>
            <p className="text-muted-foreground mt-1">
              View and manage registered users
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users size={18} />
            Total Users:{" "}
            <span className="font-medium text-primary">
              {users.length}
            </span>
          </div>
        </div>
      </AnimatedSection>

      <div className="space-y-4">
        {users.map((user, index) => (
          <AnimatedSection key={user._id} delay={index * 0.05}>
            <Card className="bg-background/80 backdrop-blur border-border/50 hover:shadow-nature transition-all">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-forest flex items-center justify-center text-white font-semibold">
                      {user.name?.charAt(0)}
                    </div>

                    <div>
                      <div className="font-semibold text-lg">
                        {user.name}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Mail size={14} />
                        {user.email}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 text-sm">
                      {user.role === "admin" ? (
                        <ShieldCheck className="text-leaf" size={16} />
                      ) : (
                        <User className="text-sky" size={16} />
                      )}
                      <span className="capitalize">{user.role}</span>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium
                        ${
                          user.status === "inactive"
                            ? "bg-red-500/15 text-red-500"
                            : "bg-leaf/15 text-leaf"
                        }`}
                    >
                      {user.status || "active"}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        navigate(`/admin/users/${user._id}/services`)
                      }
                    >
                      <Eye size={16} className="mr-1" />
                      View
                    </Button>

                    {user.role !== "admin" && (
                      <Button
                        variant="destructive"
                        size="sm"
                        className="bg-red-500/10 text-red-500 hover:bg-red-500/20"
                      >
                        <Ban size={16} className="mr-1" />
                        Disable
                      </Button>
                    )}
                  </div>

                </div>
              </CardContent>
            </Card>
          </AnimatedSection>
        ))}
      </div>
    </Section>
  );
}