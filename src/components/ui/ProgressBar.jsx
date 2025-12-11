import React from "react";
import { motion } from "framer-motion";

export default function ProgressBar({ 
  percentage = 0, 
  height = 8,
  showLabel = false,
  animated = true 
}) {
  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between mb-1">
          <span className="text-sm text-gray-600">Progress</span>
          <span className="text-sm font-semibold text-aqua-700">{percentage}%</span>
        </div>
      )}
      <div 
        className="w-full bg-gray-200 rounded-full overflow-hidden"
        style={{ height }}
      >
        <motion.div
          className="h-full bg-aqua-gradient rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={animated ? { duration: 1, ease: "easeOut" } : { duration: 0 }}
        />
      </div>
    </div>
  );
}
