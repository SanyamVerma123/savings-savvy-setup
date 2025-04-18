
import React from "react";
import { Header } from "./Header";
import { useAppContext } from "@/contexts/AppContext";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Settings } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const { theme, setTheme } = useAppContext();
  const navigate = useNavigate();
  
  // Toggle theme function
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "min-h-screen flex flex-col",
        theme === 'light' 
          ? "bg-gradient-to-br from-blue-50 via-white to-blue-100 text-gray-800" 
          : "bg-gradient-to-br from-gray-900 via-gray-800 to-slate-900 text-gray-100"
      )}
    >
      <Header />
      <main className="flex-1 container py-6 md:py-8 px-3 md:px-6">
        <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-2">
          <motion.div 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              onClick={() => navigate('/settings')}
              variant="outline"
              className={cn(
                "rounded-full p-3 h-12 w-12 transition-all duration-300",
                theme === 'light' 
                  ? "bg-white text-primary shadow-lg hover:shadow-xl" 
                  : "bg-gray-800 text-primary shadow-lg border-gray-700 hover:bg-gray-700"
              )}
            >
              <Settings className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </Button>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              onClick={toggleTheme}
              variant="outline"
              className={cn(
                "rounded-full p-3 h-12 w-12 transition-all duration-300",
                theme === 'light' 
                  ? "bg-white text-primary shadow-lg hover:shadow-xl" 
                  : "bg-gray-800 text-primary shadow-lg border-gray-700 hover:bg-gray-700"
              )}
            >
              {theme === 'light' ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
              <span className="sr-only">Toggle Theme</span>
            </Button>
          </motion.div>
        </div>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {children}
        </motion.div>
      </main>
      <footer className={cn(
        "border-t py-4 md:py-6",
        theme === 'light' 
          ? "bg-white/50 border-blue-100 backdrop-blur-sm" 
          : "bg-gray-800/30 border-gray-700 backdrop-blur-sm"
      )}>
        <div className="container flex flex-col items-center justify-between gap-2 md:flex-row px-3 md:px-6">
          <p className={cn(
            "text-xs md:text-sm text-center md:text-left",
            theme === 'light' 
              ? "text-muted-foreground" 
              : "text-gray-400"
          )}>
            &copy; {new Date().getFullYear()} Savings Savvy. All rights reserved.
          </p>
          <p className={cn(
            "text-xs md:text-sm",
            theme === 'light' 
              ? "text-muted-foreground" 
              : "text-gray-400"
          )}>
            Helping you save for what matters most
          </p>
        </div>
      </footer>
    </motion.div>
  );
}
