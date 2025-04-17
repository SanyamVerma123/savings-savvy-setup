
import React, { useEffect } from "react";
import { useAppContext } from "@/contexts/AppContext";
import { motion, AnimatePresence } from "framer-motion";

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const { theme } = useAppContext();

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    
    // Apply different background gradients based on theme
    if (theme === 'light') {
      document.body.style.background = 'linear-gradient(135deg, #e6f7ff 0%, #ffffff 100%)';
    } else {
      document.body.style.background = 'linear-gradient(135deg, #1a1f2c 0%, #2d3748 100%)';
    }
  }, [theme]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={theme}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
