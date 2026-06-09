"use client";
import React from "react";
import { motion } from "framer-motion";

export default function LiveBadge() {
  return (
    <div className="flex items-center gap-2 text-[#ff3355] font-bold tracking-widest font-[var(--font-orbitron)]">
      <motion.div
        animate={{ opacity: [1, 0.5, 1], scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="w-3 h-3 rounded-full bg-[#ff3355] shadow-[0_0_10px_rgba(255,51,85,0.8)]"
      />
      LIVE
    </div>
  );
}
