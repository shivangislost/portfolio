"use client";

import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { FileText } from "lucide-react";
import { useLenis } from "@studio-freight/react-lenis";
import MagneticButton from "./MagneticButton";

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.03c3.15-.38 6.5-1.4 6.5-7.17A5.05 5.05 0 0 0 19 5.21 5.05 5.05 0 0 0 19 1s-1.3-.4-4 1.4A14.2 14.2 0 0 0 12 2.1a14.2 14.2 0 0 0-3 .3C6.3 1.4 5 1 5 1a5.05 5.05 0 0 0-.2 4.21A5.05 5.05 0 0 0 3 8.83c0 5.77 3.34 6.79 6.5 7.17A4.8 4.8 0 0 0 8 18v4"></path>
  </svg>
);

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

export default function Navbar() {
  const lenis = useLenis();
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const scrollTo = (id: string) => {
    if (lenis) {
      // Easing function for smooth cinematic stop
      lenis.scrollTo(`#${id}`, { duration: 1.5, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const scrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 2, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const navLinks = [
    { name: "Services", id: "services" },
    { name: "Work", id: "work" },
    { name: "About", id: "about" },
    { name: "Experience", id: "experience" },
    { name: "Contact", id: "contact" },
  ];

  return (
    <>
      {/* Global Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-teal-400 origin-left z-[100]"
        style={{ scaleX }}
      />
      
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 2 }} // delay to appear after loading screen
        className="fixed top-0 left-0 w-full z-50 px-6 lg:px-12 py-6 flex items-center justify-between pointer-events-none mt-1"
      >
        {/* Left: Logo */}
        <div 
          onClick={scrollToTop}
          className="pointer-events-auto cursor-pointer font-bold text-2xl tracking-tighter text-white hover:opacity-80 transition-opacity"
        >
          SC.
        </div>

        {/* Center: Links */}
        <div className="hidden md:flex items-center gap-10 pointer-events-auto absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => scrollTo(link.id)}
              className="text-base font-medium text-zinc-400 hover:text-white transition-colors"
            >
              {link.name}
            </button>
          ))}
        </div>

        {/* Right: Social & Resume */}
        <div className="flex items-center gap-4 pointer-events-auto">
          <MagneticButton 
            href="/Shivang_Resume.pdf" 
            target="_blank" 
            rel="noopener noreferrer"
            variant="secondary"
            className="!px-4 !py-2 !text-sm !border-white/10 !bg-white/5 hover:!bg-white/10"
          >
            <FileText className="w-4 h-4" />
            Resume
          </MagneticButton>
          <a 
            href="https://github.com/shivangislost" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-2 rounded-full hover:bg-white/10 transition-colors text-zinc-400 hover:text-white"
          >
            <GithubIcon />
          </a>
          <a 
            href="https://linkedin.com/in/ishivangchaubey" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-2 rounded-full hover:bg-white/10 transition-colors text-zinc-400 hover:text-white"
          >
            <LinkedinIcon />
          </a>
        </div>
      </motion.nav>
    </>
  );
}
