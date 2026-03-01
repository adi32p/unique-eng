import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function AdminLayout() {
  return (
    <div className="min-h-screen bg-muted/40 flex">
      {/* 
        🔹 Sidebar will go here later 
        Example: <AdminSidebar />
      */}

      <div className="flex-1 flex flex-col">
        {/* 
          🔹 Optional: Admin top bar later
          Example: <AdminTopbar />
        */}
        <Header />
        <motion.main
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex-1 p-6 md:p-8"
        >
          <Outlet />
        </motion.main>
        <Footer />
      </div>
    </div>
  );
}
