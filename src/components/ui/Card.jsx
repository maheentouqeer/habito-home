import React from "react";
import { motion } from "framer-motion";

export default function Card({ 
  children, 
  className = "", 
  hover = true,
  gradient = false,
  ...props 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={hover ? { y: -4, transition: { duration: 0.2 } } : {}}
      className={`
        ${gradient 
          ? "bg-aqua-gradient text-white" 
          : "bg-white/80 backdrop-blur-sm"
        }
        rounded-2xl shadow-card p-6
        ${hover ? "hover:shadow-card-hover transition-shadow duration-300" : ""}
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.div>
  );
}
