"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Simulate loading progress
    const duration = 2500; // 2.5 seconds total loading time
    const intervalTime = 30; // update every 30ms
    const steps = duration / intervalTime;
    let currentStep = 0;

    // Use an easing function for a more natural progress feel (starts fast, slows down at the end)
    const easeOutQuart = (x: number): number => {
      return 1 - Math.pow(1 - x, 4);
    };

    const interval = setInterval(() => {
      currentStep++;
      const progressRatio = currentStep / steps;
      const easedProgress = easeOutQuart(progressRatio);
      
      const newProgress = Math.min(Math.round(easedProgress * 100), 100);
      setProgress(newProgress);

      if (currentStep >= steps) {
        clearInterval(interval);
        setTimeout(() => {
          setIsVisible(false);
        }, 500); // Pause briefly at 100% before fading out
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, []);

  // Use a slight hack to prevent scrolling while loading
  useEffect(() => {
    // Force page to top on reload
    if (typeof window !== "undefined" && "scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
    
    if (isVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0a0a0a] text-white"
        >
          <div className="flex flex-col w-full max-w-[300px] sm:max-w-[350px] px-6">
            <motion.h1 
              initial={{ opacity: 0, y: 30, filter: "blur(12px)", scale: 0.95 }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
              transition={{ duration: 1.2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl sm:text-5xl font-bold tracking-tight mb-10 text-center"
            >
              Shivang.
            </motion.h1>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full relative"
            >
              {/* Progress bar background */}
              <div className="w-full h-[1px] bg-white/20 overflow-hidden">
                {/* Progress bar fill */}
                <div 
                  className="h-full bg-white transition-all duration-75 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
              
              {/* Text underneath */}
              <div className="flex justify-between items-center mt-4 text-[10px] sm:text-xs text-white/50 tracking-[0.15em] font-medium">
                <span className="uppercase">Loading Experience</span>
                <span className="tabular-nums">{progress}%</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
