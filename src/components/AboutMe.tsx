"use client";

import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, MapPin, Briefcase } from "lucide-react";
import SpotlightCard from "./SpotlightCard";

const stats = [
  { value: "10+", label: "Dashboards Built", icon: <Briefcase className="w-4 h-4 text-blue-400" /> },
  { value: "15K+", label: "Records Analyzed", icon: <GraduationCap className="w-4 h-4 text-blue-400" /> },
  { value: "5+", label: "Deployments Managed", icon: <MapPin className="w-4 h-4 text-blue-400" /> },
];

export default function AboutMe() {
  return (
    <section id="about" className="relative w-full py-32 md:py-48 px-6 lg:px-12 bg-[#0a0a0a] overflow-hidden">
      
      {/* Ambient Background Glow */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.04, 0.12, 0.04]
        }}
        transition={{ 
          duration: 10, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[900px] h-[600px] md:h-[900px] bg-gradient-to-br from-blue-500/20 to-teal-500/10 blur-[150px] rounded-full pointer-events-none z-0"
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 md:mb-24 flex flex-col items-center text-center"
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl tracking-tighter text-zinc-300 font-light mb-6">
            About <span className="font-bold text-white">Me</span>
          </h2>
          <div className="inline-flex items-center justify-center px-6 py-2 rounded-full border border-white/10 bg-transparent text-[10px] sm:text-xs font-semibold tracking-[0.2em] text-zinc-400 uppercase">
            The Story So Far
          </div>
        </motion.div>

        {/* Main Content Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <SpotlightCard className="w-full">
            <div className="p-10 md:p-16 flex flex-col items-center text-center group">
              
              {/* Quote mark */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-6xl md:text-8xl font-serif text-transparent bg-clip-text bg-gradient-to-b from-blue-400/40 to-transparent leading-none mb-4 select-none"
              >
                "
              </motion.div>

              {/* Main Quote */}
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tighter text-zinc-400 leading-[1.3] max-w-4xl mb-8">
                An <span className="text-white font-semibold">MBA candidate</span> interested in what{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400 font-semibold">data changes</span>{" "}
                — not just what it <span className="text-white font-semibold">shows</span>.
              </h3>

              {/* Animated divider */}
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: "6rem" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="h-[2px] bg-gradient-to-r from-blue-500 to-teal-400 mb-8"
              />

              {/* Description */}
              <p className="text-lg md:text-xl text-zinc-400 font-light max-w-2xl leading-relaxed mb-12 group-hover:text-zinc-300 transition-colors duration-300">
                Currently pursuing an MBA in Business Analytics at Shri Ramswaroop Memorial University. I've worked across QA and data visualization, focusing on making data easier to understand and actually useful in business decisions.
              </p>

              {/* Location tag */}
              <div className="flex items-center gap-2 text-sm text-zinc-500 mb-12">
                <MapPin className="w-4 h-4 text-blue-400" />
                <span>Lucknow, India</span>
              </div>

            </div>
          </SpotlightCard>
        </motion.div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
            >
              <SpotlightCard>
                <div className="p-6 md:p-8 flex items-center gap-5 group">
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-300">
                    {stat.icon}
                  </div>
                  <div>
                    <div className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">
                      {stat.value}
                    </div>
                    <div className="text-xs font-semibold tracking-[0.15em] text-zinc-500 uppercase">
                      {stat.label}
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

