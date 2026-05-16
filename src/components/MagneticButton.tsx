"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  href?: string;
  className?: string;
  variant?: "primary" | "secondary";
  target?: string;
  rel?: string;
}

export default function MagneticButton({
  children,
  href,
  className = "",
  variant = "primary",
  target,
  rel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  // Hover state for the spotlight
  const [isHovered, setIsHovered] = useState(false);
  
  // Motion values for magnetic pull
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Mouse position relative to the button (for the spotlight)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics for the magnetic pull
  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  // Parallax effect for the inner content (moves slightly more than the button)
  const textX = useTransform(springX, (v) => v * 0.5);
  const textY = useTransform(springY, (v) => v * 0.5);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Mouse position relative to the center of the button
    const centerX = rect.left + width / 2;
    const centerY = rect.top + height / 2;
    
    // Calculate distance from center
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    
    // Update magnetic pull (pulls the button towards the cursor)
    x.set(distanceX * 0.3);
    y.set(distanceY * 0.3);

    // Update local mouse position for the spotlight
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // Reset magnetic pull
    x.set(0);
    y.set(0);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const baseStyles = "relative overflow-hidden rounded-full flex items-center justify-center font-medium text-lg transition-colors duration-300 group";
  
  const variantStyles = {
    primary: "bg-white text-black hover:text-white border border-transparent shadow-[0_0_20px_rgba(255,255,255,0.2)]",
    secondary: "bg-transparent text-white border border-white/20 hover:border-white/40 hover:bg-white/5 backdrop-blur-sm",
  };

  const background = useTransform(
    () => `radial-gradient(100px circle at ${mouseX.get()}px ${mouseY.get()}px, ${
      variant === "primary" ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.15)"
    }, transparent)`
  );

  // The inner glowing spotlight effect
  const glowOverlay = (
    <motion.div
      className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300"
      style={{
        opacity: isHovered ? 1 : 0,
        background: background,
      }}
    />
  );

  // Cosmos fill with stars and nebula gradient
  const cosmosFill = (
    <div
      className="absolute inset-0 z-0 h-full w-full transition-all duration-700 ease-[0.16,1,0.3,1]"
      style={{
        clipPath: isHovered ? "inset(0 0 0 0)" : "inset(0 100% 0 0)",
        backgroundImage: `
          radial-gradient(1px 1px at 15% 25%, #ffffff 100%, transparent),
          radial-gradient(1.5px 1.5px at 35% 65%, #ffffff 100%, transparent),
          radial-gradient(2px 2px at 55% 35%, #ffffff 100%, transparent),
          radial-gradient(1px 1px at 75% 75%, #ffffff 100%, transparent),
          radial-gradient(1.5px 1.5px at 85% 20%, #ffffff 100%, transparent),
          radial-gradient(1px 1px at 95% 50%, #ffffff 100%, transparent),
          linear-gradient(90deg, #030014 0%, #11002c 25%, #2a004f 50%, #610094 75%, #00e5ff 100%)
        `,
        backgroundSize: "100% 100%",
        boxShadow: "inset 0 0 40px rgba(97, 0, 148, 0.8)",
      }}
    />
  );

  const content = (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      className="p-4 inline-block cursor-pointer" // Expand hover area slightly outside the actual button boundaries
    >
      <motion.div
        style={{ x: springX, y: springY }}
        className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      >
        {cosmosFill}
        {glowOverlay}
        
        {/* Inner Parallax Content */}
        <motion.div
          style={{ x: textX, y: textY }}
          className="relative z-10 flex items-center justify-center gap-2 pointer-events-none drop-shadow-md"
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  );

  if (href) {
    return (
      <a href={href} target={target} rel={rel} className="inline-block outline-none">
        {content}
      </a>
    );
  }

  return <button className="inline-block outline-none">{content}</button>;
}
