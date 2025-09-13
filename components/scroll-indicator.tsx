"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MousePointer, ChevronsDown } from "lucide-react";

export function ScrollIndicator() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // Hide indicator if scrolled more than 100px
      if (window.scrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);
    
    // Initial check in case page is loaded at a scrolled position
    handleScroll();

    // Clean up
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-10 left-8 hidden md:flex items-center gap-3 text-muted-foreground z-50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-2 text-sm font-medium">
            <MousePointer className="h-4 w-4" />
            <span>Scroll to explore</span>
          </div>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ChevronsDown className="h-4 w-4" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}