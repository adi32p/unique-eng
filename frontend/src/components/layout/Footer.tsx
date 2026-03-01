import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Leaf,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  ArrowRight,
} from "lucide-react";
import { Logo } from "@/components/common/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const footerLinks = {
  services: [
    { label: "Environmental Clearance", href: "/services/environmental-clearance" },
    { label: "PCB Licenses", href: "/services/pcb-licenses" },
    { label: "EPC Services", href: "/services/epc" },
    { label: "PMC Services", href: "/services/pmc" },
    { label: "Compliance Management", href: "/services/compliance" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Our Team", href: "/about#team" },
    { label: "Careers", href: "/careers" },
    { label: "News & Updates", href: "/news" },
    { label: "Contact", href: "/contact" },
  ],
  resources: [
    { label: "Gallery", href: "/gallery" },
    { label: "Customer Reviews", href: "/reviews" },
    { label: "Sectors", href: "/sectors" },
    { label: "FAQs", href: "/contact#faq" },
    { label: "Privacy Policy", href: "/privacy" },
  ],
};

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Instagram, href: "#", label: "Instagram" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-forest text-white overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-leaf/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-leaf/5 rounded-full blur-3xl" />
        <Leaf className="absolute top-20 right-[10%] text-leaf/10 w-40 h-40 rotate-45" />
        <Leaf className="absolute bottom-40 left-[5%] text-leaf/10 w-24 h-24 -rotate-12" />
      </div>

      <div className="relative container mx-auto px-4 py-16">
        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-leaf/20 to-primary/20 rounded-2xl p-8 mb-16 backdrop-blur-sm border border-white/10"
        >
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div>
              <h3 className="text-2xl font-display font-bold mb-2">
                Stay Updated with Environmental News
              </h3>
              <p className="text-white/70">
                Subscribe to receive the latest compliance updates and industry insights.
              </p>
            </div>
            <div className="flex gap-3">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-leaf"
              />
              <Button className="bg-leaf hover:bg-leaf/90 text-white shrink-0">
                Subscribe
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Logo variant="light" size="lg" className="mb-6" />
            <p className="text-white/70 mb-6 max-w-md">
              Leading environmental engineering and compliance solutions across
              India. Committed to sustainable development and regulatory excellence.
            </p>
            <div className="space-y-3">
              <a
                href="tel:+919876543210"
                className="flex items-center gap-3 text-white/70 hover:text-leaf transition-colors"
              >
                <Phone size={18} />
                +91 98765 43210
              </a>
              <a
                href="mailto:info@uniqueep.com"
                className="flex items-center gap-3 text-white/70 hover:text-leaf transition-colors"
              >
                <Mail size={18} />
                info@uniqueep.com
              </a>
              <div className="flex items-start gap-3 text-white/70">
                <MapPin size={18} className="mt-1 shrink-0" />
                <span>
                  123 Environmental Plaza, Green Avenue,
                  <br />
                  New Delhi - 110001, India
                </span>
              </div>
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-leaf">Services</h4>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-white/70 hover:text-leaf transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-leaf">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-white/70 hover:text-leaf transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-leaf">Resources</h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-white/70 hover:text-leaf transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/50 text-sm">
              © {currentYear} Unique.EP. All rights reserved. PAN-India Environmental Solutions.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="p-2 rounded-full bg-white/10 hover:bg-leaf/30 transition-colors"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
