"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mail, ArrowRight } from "lucide-react";
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

export default function ContactCTA() {
  return (
    <section id="contact" className="w-full min-h-screen pt-32 pb-8 px-6 lg:px-12 bg-[#0a0a0a] border-t border-white/5 flex flex-col justify-between">
      <div className="flex-1 flex flex-col justify-center max-w-4xl mx-auto w-full text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <a 
            href="mailto:ishivangchaubey@gmail.com"
            className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-8 border border-white/10 hover:bg-white/10 hover:scale-110 hover:border-white/20 transition-all duration-300"
          >
            <Mail className="w-6 h-6 text-zinc-300" />
          </a>
          
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-6">
            Let's uncover insights.
          </h2>
          
          <p className="text-xl text-zinc-400 font-light max-w-xl mx-auto mb-12">
            Open to new opportunities in Business Analytics and Data Analysis. Let's connect and discuss how I can help your team.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <MagneticButton 
              href="mailto:ishivangchaubey@gmail.com"
              variant="primary"
              className="px-8 py-4"
            >
              <span>Send Message</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </MagneticButton>
            
            <MagneticButton 
              href="/Shivang_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              className="px-8 py-4"
            >
              <span>My Resume</span>
            </MagneticButton>
          </div>
        </motion.div>
      </div>

      {/* Footer info */}
      <div className="max-w-7xl mx-auto w-full">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="pt-8 border-t border-white/10 w-full flex flex-col md:flex-row items-center justify-between text-zinc-400 text-sm md:text-base mt-12"
        >
          <p className="font-medium tracking-wide">© 2026 Shivang Chaubey. All rights reserved.</p>
          <div className="flex items-center gap-4 mt-6 md:mt-0">
            <a href="https://linkedin.com/in/ishivangchaubey" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:bg-white/10 hover:text-white transition-colors">
              <LinkedinIcon />
            </a>
            <a href="https://github.com/shivangislost" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:bg-white/10 hover:text-white transition-colors">
              <GithubIcon />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
