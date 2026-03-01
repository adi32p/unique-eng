import { motion } from "framer-motion";
import { Leaf } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "light" | "dark" | "auto";
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
}

const sizeConfig = {
  sm: { icon: 20, text: "text-lg" },
  md: { icon: 28, text: "text-xl" },
  lg: { icon: 36, text: "text-2xl" },
};

export function Logo({
  variant = "auto",
  size = "md",
  showText = true,
  className,
}: LogoProps) {
  const config = sizeConfig[size];

  const colorClasses = {
    light: "text-white",
    dark: "text-primary",
    auto: "text-primary dark:text-primary-foreground",
  };

  return (
    <Link to="/" className={cn("flex items-center gap-2 group", className)}>
      <motion.div
        whileHover={{ rotate: 15, scale: 1.1 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="relative"
      >
        {/* Leaf icon with gradient background */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-forest rounded-full blur-md opacity-50 group-hover:opacity-75 transition-opacity" />
          <div className="relative bg-gradient-forest p-2 rounded-full">
            <Leaf className="text-white" size={config.icon} strokeWidth={2} />
          </div>
        </div>
      </motion.div>

      {showText && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col leading-none"
        >
          <span
            className={cn(
              "font-display font-bold tracking-tight",
              config.text,
              colorClasses[variant]
            )}
          >
            Unique<span className="text-leaf">.EPC</span>
          </span>
          <span className="text-[10px] text-muted-foreground tracking-widest uppercase">
            Environment & Engineering
          </span>
        </motion.div>
      )}
    </Link>
  );
}
