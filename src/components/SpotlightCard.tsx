"use client";

import React, { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  borderGradient?: string;
}

export default function SpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(59,130,246,0.15)",
  borderGradient = "linear-gradient(135deg, rgba(59,130,246,0.4), rgba(20,184,166,0.4))",
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });

    // 3D tilt
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;
    setTilt({ rotateX, rotateY });
  }, []);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: tilt.rotateX,
        rotateY: tilt.rotateY,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`relative ${className}`}
      style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
    >
      {/* Animated gradient border */}
      <div
        className="absolute -inset-[1px] rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
        style={{
          background: borderGradient,
          filter: "blur(1px)",
          opacity: isHovered ? 1 : 0,
          transition: "opacity 0.5s ease",
        }}
      />

      {/* Main card body */}
      <div className="relative rounded-[2rem] bg-[#111111] border border-white/5 z-10 overflow-hidden transition-colors duration-300"
        style={{ borderColor: isHovered ? "rgba(255,255,255,0.1)" : undefined }}
      >
        {/* Cursor spotlight */}
        <div
          className="absolute inset-0 pointer-events-none z-20"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, ${spotlightColor}, transparent 40%)`,
            transition: "opacity 0.3s ease",
          }}
        />

        {/* Top edge highlight line */}
        <div
          className="absolute top-0 left-0 right-0 h-[1px] z-20"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(ellipse at ${mousePos.x}px 0%, rgba(59,130,246,0.6) 0%, rgba(20,184,166,0.3) 30%, transparent 70%)`,
            transition: "opacity 0.5s ease",
          }}
        />

        {/* Floating particles */}
        {isHovered && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-20">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  x: mousePos.x,
                  y: mousePos.y,
                  opacity: 0,
                  scale: 0,
                }}
                animate={{
                  x: mousePos.x + (Math.random() - 0.5) * 120,
                  y: mousePos.y + (Math.random() - 0.5) * 120,
                  opacity: [0, 0.8, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 1.2 + Math.random() * 0.8,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeOut",
                }}
                className="absolute w-1 h-1 rounded-full bg-blue-400/60"
              />
            ))}
          </div>
        )}

        {/* Content */}
        <div className="relative z-30">
          {children}
        </div>
      </div>
    </motion.div>
  );
}
