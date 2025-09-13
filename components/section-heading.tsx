import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionHeading({ title, subtitle, className }: SectionHeadingProps) {
  return (
    <div className={cn("flex flex-col items-center text-center mb-12", className)}>
      <motion.h2
        className="text-3xl md:text-4xl font-bold mb-3"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        {title}
      </motion.h2>
      
      {subtitle && (
        <motion.p
          className="text-muted-foreground max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}