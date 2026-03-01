import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function AuthLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-forest via-primary to-forest">
      <Header />

      {/* Push content below fixed header */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="pt-24 flex items-center justify-center min-h-screen"
      >
        <Outlet />
      </motion.main>
      <Footer />
    </div>
  );
}
