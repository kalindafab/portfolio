"use client";

import { motion, AnimatePresence } from "framer-motion";

export default function Loading() {
  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-background z-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="relative"
        >
          <motion.div
            className="h-16 w-16 rounded-full border-4 border-primary/30"
            animate={{ rotate: 360 }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          <motion.div
            className="absolute top-0 left-0 h-16 w-16 rounded-full border-t-4 border-r-4 border-primary"
            animate={{ rotate: 360 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </motion.div>
      </div>
    </AnimatePresence>
  );
}