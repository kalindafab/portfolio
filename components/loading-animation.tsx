"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getPersonalInfo } from "@/lib/config";

export function LoadingAnimation() {
  const [isLoading, setIsLoading] = useState(true);
  const personalInfo = getPersonalInfo();
  const firstName = personalInfo.name.split(" ")[0];
  const lastName = personalInfo.name.split(" ").slice(1).join(" ");

  useEffect(() => {
    // Simulate loading time (you can remove this in production)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Variants for container animation
  const containerVariants = {
    initial: { opacity: 1 },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.8,
        ease: "easeInOut",
      },
    },
  };

  // Variants for text animation
  const textVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      }
    },
  };

  // Variants for loader animation
  const loaderVariants = {
    animate: {
      scaleX: [0, 1],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        repeatType: "reverse" as const,
        ease: "easeInOut",
      },
    },
  };

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 bg-background z-[100] flex flex-col items-center justify-center"
          variants={containerVariants}
          initial="initial"
          exit="exit"
        >
          <div className="text-center mb-12">
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl font-bold mb-2"
              variants={textVariants}
              initial="initial"
              animate="animate"
            >
              <span className="inline-block">{firstName}</span>
              <span className="inline-block text-primary ml-2">{lastName}</span>
            </motion.h1>
            
            <motion.p
              className="text-muted-foreground text-lg"
              variants={textVariants}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.2 }}
            >
              {personalInfo.title}
            </motion.p>
          </div>
          
          <motion.div 
            className="w-48 h-1 bg-primary/20 rounded-full overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div
              className="h-full w-full bg-primary origin-left"
              variants={loaderVariants}
              animate="animate"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}