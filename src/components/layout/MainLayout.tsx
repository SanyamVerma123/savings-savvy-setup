
import React, { useEffect } from "react";
import { Header } from "./Header";
import { useAppContext } from "@/contexts/AppContext";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const { theme, setTheme } = useAppContext();
  
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
          ? "bg-gradient-to-br from-blue-50 via-white to-blue-50" 
          : "bg-gradient-to-br from-gray-900 via-gray-800 to-slate-900"
      )}
    >
      <Header />
      <main className="flex-1 container py-6 md:py-8">
        <div className="fixed bottom-6 right-6 z-50">
          <Button 
            onClick={toggleTheme}
            variant="outline"
            className={cn(
              "rounded-full p-3 h-12 w-12 hover:scale-110 transition-all",
              theme === 'light' 
                ? "bg-white text-primary shadow-lg" 
                : "bg-gray-800 text-primary shadow-lg border-gray-700"
            )}
          >
            {theme === 'light' ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </Button>
        </div>
        {children}
      </main>
      <footer className={cn(
        "border-t py-6",
        theme === 'light' 
          ? "bg-white/50 border-blue-100" 
          : "bg-gray-800/50 border-gray-700"
      )}>
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className={cn(
            "text-sm text-center md:text-left",
            theme === 'light' 
              ? "text-muted-foreground" 
              : "text-gray-400"
          )}>
            &copy; {new Date().getFullYear()} Savings Savvy. All rights reserved.
          </p>
          <p className={cn(
            "text-sm",
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
