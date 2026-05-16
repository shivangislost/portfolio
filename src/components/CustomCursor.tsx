"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Outer glow: slower, floatier trailing
  const outerSpring = { damping: 20, stiffness: 150 };
  const outerX = useSpring(cursorX, outerSpring);
  const outerY = useSpring(cursorY, outerSpring);

  // Inner ring: snappier follow
  const innerSpring = { damping: 28, stiffness: 400 };
  const innerX = useSpring(cursorX, innerSpring);
  const innerY = useSpring(cursorY, innerSpring);

  // Core dot: near-instant
  const dotSpring = { damping: 35, stiffness: 600 };
  const dotX = useSpring(cursorX, dotSpring);
  const dotY = useSpring(cursorY, dotSpring);
  
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };
    
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", moveCursor);
    document.body.addEventListener("mouseleave", handleMouseLeave);
    document.body.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [cursorX, cursorY, isVisible]);

  return (
    <>
      {/* Layer 1: Large soft outer aura */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 w-44 h-44 rounded-full z-[9998]"
        style={{
          x: outerX,
          y: outerY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible ? 1 : 0,
          background: "radial-gradient(circle, rgba(59,130,246,0.08) 0%, rgba(20,184,166,0.04) 40%, transparent 70%)",
          filter: "blur(20px)",
          mixBlendMode: "screen",
        }}
      />

      {/* Layer 2: Mid ring with border */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 w-10 h-10 rounded-full z-[9999] transition-[width,height] duration-200"
        style={{
          x: innerX,
          y: innerY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible ? 1 : 0,
          border: "1.5px solid rgba(255,255,255,0.25)",
          background: "radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)",
          boxShadow: "0 0 20px rgba(59,130,246,0.15), 0 0 60px rgba(20,184,166,0.08)",
          mixBlendMode: "screen",
        }}
      />

      {/* Layer 3: Sharp center dot */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[10000]"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible ? 1 : 0,
        }}
      >
        <div 
          className="w-1.5 h-1.5 rounded-full"
          style={{
            background: "linear-gradient(135deg, #3b82f6, #14b8a6)",
            boxShadow: "0 0 6px rgba(59,130,246,0.8), 0 0 15px rgba(20,184,166,0.4)",
          }}
        />
      </motion.div>
    </>
  );
}

