"use client";

import React from "react";
import { motion } from "framer-motion";
import { Database, LineChart, PieChart, LayoutTemplate } from "lucide-react";
import SpotlightCard from "./SpotlightCard";

const capabilities = [
  {
    title: "Data Visualization",
    desc: "Designing interactive Tableau dashboards tailored for enterprise decision-making.",
    icon: <PieChart className="w-5 h-5 text-blue-400" />,
    stat: "10+",
    statLabel: "Dashboards Built",
  },
  {
    title: "Statistical Analysis",
    desc: "Extracting actionable insights through RFM segmentation and complex datasets.",
    icon: <LineChart className="w-5 h-5 text-blue-400" />,
    stat: "15K+",
    statLabel: "Records Analyzed",
  },
  {
    title: "Data Engineering",
    desc: "Cleaning, transforming, and modeling large-scale SQL databases for performance.",
    icon: <Database className="w-5 h-5 text-blue-400" />,
    stat: "100%",
    statLabel: "Data Integrity",
  },
  {
    title: "Dashboard Development",
    desc: "Building clean, automated reporting workflows that reduce manual preparation.",
    icon: <LayoutTemplate className="w-5 h-5 text-blue-400" />,
    stat: "40%",
    statLabel: "Time Saved",
  },
];

export default function CoreCapabilities() {
  return (
    <section id="services" className="w-full py-24 md:py-32 px-6 lg:px-12 bg-[#0a0a0a]">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 md:mb-24 flex flex-col items-center text-center"
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl tracking-tighter text-zinc-300 font-light mb-6">
            What I <span className="font-bold text-white">Do</span>
          </h2>
          <div className="inline-flex items-center justify-center px-6 py-2 rounded-full border border-white/10 bg-transparent text-[10px] sm:text-xs font-semibold tracking-[0.2em] text-zinc-400 uppercase">
            Core Capabilities
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {capabilities.map((cap, i) => (
            <motion.div
              key={cap.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <SpotlightCard className="h-full">
                <div className="h-full p-8 md:p-10 flex flex-col group">
                  
                  {/* Top row: Icon & Stat */}
                  <div className="flex items-start justify-between mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-300">
                      {cap.icon}
                    </div>
                    <div className="text-right">
                      <div className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">
                        {cap.stat}
                      </div>
                      <div className="text-[10px] font-semibold tracking-[0.15em] text-zinc-500 uppercase">
                        {cap.statLabel}
                      </div>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-teal-400 transition-all duration-300">
                    {cap.title}
                  </h3>

                  {/* Divider */}
                  <div className="w-12 h-[2px] bg-gradient-to-r from-blue-500/50 to-transparent mb-4 group-hover:w-full transition-all duration-500" />

                  {/* Description */}
                  <p className="text-sm md:text-base text-zinc-400 leading-relaxed font-light group-hover:text-zinc-300 transition-colors duration-300">
                    {cap.desc}
                  </p>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

