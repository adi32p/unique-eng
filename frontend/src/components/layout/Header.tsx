import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, User, LogIn, LogOut } from "lucide-react";
import { Logo } from "../../components/common/Logo";
import { Button } from "../../components/ui/button";
import { cn } from "../../lib/utils";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Services",
    href: "/services",
    children: [
      {
        label: "Environmental Clearance",
        href: "/services/environmental-clearance",
      },
      { label: "PCB Licenses", href: "/services/pcb-licenses" },
      { label: "EPC Services", href: "/services/epc" },
      { label: "PMC Services", href: "/services/pmc" },
      { label: "Compliance Management", href: "/services/compliance" },
      { label: "Design Engineering", href: "/services/design-engineering" },
    ],
  },
  { label: "Sectors", href: "/sectors" },
  { label: "Gallery", href: "/gallery" },
  { label: "Reviews", href: "/reviews" },
  { label: "News", href: "/news" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("email");
    localStorage.removeItem("name");

    setIsMobileMenuOpen(false);
    navigate("/login");
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          "bg-background/95 backdrop-blur-md shadow-nature py-2",
        )}
      >
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between">
            {/* Logo */}
            <Logo variant={isScrolled ? "dark" : "auto"} size="md" />
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() =>
                    item.children && setActiveDropdown(item.label)
                  }
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    to={item.href}
                    className={cn(
                      "flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                      isActive(item.href)
                        ? "text-primary bg-primary/10"
                        : "text-foreground/80 hover:text-primary hover:bg-primary/5",
                    )}
                  >
                    {item.label}
                    {item.children && (
                      <ChevronDown
                        size={14}
                        className={cn(
                          "transition-transform",
                          activeDropdown === item.label && "rotate-180",
                        )}
                      />
                    )}
                  </Link>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {item.children && activeDropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-1 w-64 bg-background rounded-xl shadow-elevated border border-border overflow-hidden"
                      >
                        {item.children.map((child) => (
                          <Link
                            key={child.label}
                            to={child.href}
                            className="block px-4 py-3 text-sm text-foreground/80 hover:bg-primary/5 hover:text-primary transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              {!isLoggedIn ? (
                <>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/login" className="flex items-center gap-2">
                      <LogIn size={16} />
                      Login
                    </Link>
                  </Button>

                  <Button size="sm" className="btn-nature" asChild>
                    <Link to="/register" className="flex items-center gap-2">
                      <User size={16} />
                      Get Started
                    </Link>
                  </Button>
                </>
              ) : (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleLogout}
                  className="flex items-center gap-2"
                >
                  <LogOut size={16} />
                  Logout
                </Button>
              )}
            </div>
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-primary/10 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>{" "}
          </nav>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-foreground/20 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              className="absolute right-0 top-0 bottom-0 w-80 max-w-full bg-background shadow-elevated overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-8">
                  <Logo size="sm" />
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-lg hover:bg-primary/10"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="space-y-1">
                  {navItems.map((item) => (
                    <div key={item.label}>
                      <Link
                        to={item.href}
                        className={cn(
                          "flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                          isActive(item.href)
                            ? "text-primary bg-primary/10"
                            : "text-foreground/80 hover:text-primary hover:bg-primary/5",
                        )}
                      >
                        {item.label}
                        {item.children && <ChevronDown size={16} />}
                      </Link>
                      {item.children && (
                        <div className="ml-4 mt-1 space-y-1">
                          {item.children.map((child) => (
                            <Link
                              key={child.label}
                              to={child.href}
                              className="block px-4 py-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-8 space-y-3">
                  {!isLoggedIn ? (
                    <>
                      <Button variant="outline" className="w-full" asChild>
                        <Link to="/login">Login</Link>
                      </Button>

                      <Button className="w-full" asChild>
                        <Link to="/register">Get Started</Link>
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant="destructive"
                      className="w-full flex items-center justify-center gap-2"
                      onClick={handleLogout}
                    >
                      <LogOut size={16} />
                      Logout
                    </Button>
                  )}
                </div>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
