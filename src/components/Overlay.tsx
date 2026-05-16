"use client";

import React from "react";
import { motion, MotionValue, useTransform } from "framer-motion";

interface OverlayProps {
  scrollYProgress: MotionValue<number>;
}

const Overlay: React.FC<OverlayProps> = ({ scrollYProgress }) => {
  // Section 1 (0% to 20% scroll)
  const opacity1 = useTransform(scrollYProgress, [0, 0.1, 0.2], [1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.2], [0, -100]);
  const visibility1 = useTransform(scrollYProgress, (p) => (p > 0.2 ? "hidden" : "visible"));

  // Section 2 (20% to 100% scroll)
  const opacity2 = useTransform(scrollYProgress, [0.2, 0.3, 0.9, 1], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.2, 1], [50, -50]);
  const visibility2 = useTransform(scrollYProgress, (p) => (p <= 0.2 ? "hidden" : "visible"));

  return (
    <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-center max-w-7xl mx-auto px-6 lg:px-12 w-full h-screen">
      
      {/* Section 1: Center */}
      <motion.div
        style={{ opacity: opacity1, y: y1, visibility: visibility1 }}
        className="absolute inset-0 flex flex-col items-center justify-center text-center"
      >
        <div className="flex flex-col items-center mt-72 ml-24 md:ml-32">
          <h1 className="text-[4rem] sm:text-[6rem] md:text-[7.5rem] lg:text-[9rem] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white/70 to-white/5 drop-shadow-2xl leading-none">
            Shivang.
          </h1>
          <p className="mt-4 md:mt-5 text-base sm:text-lg md:text-2xl text-transparent bg-clip-text bg-gradient-to-b from-white/50 to-white/5 font-semibold tracking-[0.3em] uppercase drop-shadow-xl">
            Business Analytics
          </p>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-12 left-[calc(50%+3rem)] md:left-[calc(50%+4rem)] -translate-x-1/2 flex flex-col items-center justify-center gap-3"
        >
          <div className="w-[24px] h-[40px] rounded-full border-2 border-white/20 flex justify-center p-1">
            <motion.div
              animate={{
                y: [0, 14, 0],
                opacity: [1, 0, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-1.5 h-2 rounded-full bg-white/60"
            />
          </div>
          <span className="text-[9px] font-semibold tracking-[0.3em] text-white/40 uppercase">Scroll</span>
        </motion.div>
      </motion.div>

      {/* Section 2: Left aligned */}
      <motion.div
        style={{ opacity: opacity2, y: y2, visibility: visibility2 }}
        className="absolute inset-0 flex flex-col items-start justify-center text-left"
      >
        <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white drop-shadow-2xl leading-[1.1]">
          I turn data<br/>
          <span className="text-zinc-400">into decisions</span><br/>
          that matter.
        </h2>
        <p className="mt-8 text-xl md:text-2xl text-zinc-300 font-light max-w-2xl leading-relaxed drop-shadow-lg">
          Leveraging <span className="text-white font-medium">SQL, Python, and Tableau</span> to build analytics solutions that drive real business impact.
        </p>
      </motion.div>

    </div>
  );
};

export default Overlay;
