import { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LogIn, Mail, Lock, Leaf } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("email", data.email);
      localStorage.setItem("name", data.name);

      if (data.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/user/dashboard");
      }
    } catch (error) {
      alert("Login failed");
    }
  };

  return (
    <section className="relative min-h-[calc(100vh-120px)] flex items-center justify-center bg-gradient-to-br from-forest via-primary to-forest px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-md"
      >
        <Card className="bg-background/90 backdrop-blur-md shadow-nature border-border/50">
          <CardContent className="p-8">
            <div className="flex flex-col items-center mb-6">
              <div className="w-14 h-14 rounded-xl bg-gradient-forest flex items-center justify-center mb-3">
                <Leaf className="text-white" size={26} />
              </div>
              <h1 className="text-2xl text-black font-display font-bold text-primary">
                Welcome Back
              </h1>
              <p className="text-sm font-medium">
                Login to manage your services
              </p>
            </div>

            {/* 🔑 IMPORTANT: onSubmit */}
            <form className="space-y-4" onSubmit={handleLogin}>
              <div>
                <label className="text-sm font-medium">Email</label>
                <div className="relative mt-1">
                  <Mail
                    className="absolute left-3 top-3 text-muted-foreground"
                    size={18}
                  />
                  <input
                    type="email"
                    required
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Password</label>
                <div className="relative mt-1">
                  <Lock
                    className="absolute left-3 top-3 text-muted-foreground"
                    size={18}
                  />
                  <input
                    type="password"
                    required
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
                    placeholder="••••••••"
                    value={form.password}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                  />
                </div>
              </div>

              <Button size="lg" className="w-full btn-nature" type="submit">
                <LogIn size={18} className="mr-2" />
                Login
              </Button>
            </form>

            <div className="mt-6 text-black text-center text-sm text-muted-foreground">
              Don’t have an account?{" "}
              <Link
                to="/register"
                className="text-primary text-black font-medium hover:underline"
              >
                Create one
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
}
