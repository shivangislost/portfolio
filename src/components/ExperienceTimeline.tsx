"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Building2, Calendar, ChevronRight } from "lucide-react";
import SpotlightCard from "./SpotlightCard";

const experiences = [
  {
    role: "Data Analyst Trainee",
    company: "Invact Metaversity",
    duration: "MAY 2025 - JUL 2025",
    description: [
      "Collected, cleaned, and analyzed datasets of 10,000+ records using SQL and Excel.",
      "Designed 3+ interactive Tableau dashboards with KPI visualizations.",
      "Performed statistical analysis reducing reporting errors by ensuring 100% data integrity.",
    ]
  },
  {
    role: "QA Tester & Release Manager",
    company: "eL Nova Labs",
    duration: "APR 2024 - JAN 2025",
    description: [
      "Designed and executed 100+ structured test cases, achieving zero critical defect escapes.",
      "Tracked software defects using structured reports, reducing regression issues by 25%.",
      "Managed end-to-end release schedules for 5+ deployments.",
    ]
  }
];

export default function ExperienceTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section id="experience" className="w-full py-24 md:py-32 px-6 lg:px-12 bg-[#0a0a0a]">
      <div className="max-w-5xl mx-auto" ref={containerRef}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 md:mb-24 flex flex-col items-center text-center"
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl tracking-tighter text-zinc-300 font-light mb-6">
            Professional <span className="font-bold text-white">Experience</span>
          </h2>
          <div className="inline-flex items-center justify-center px-6 py-2 rounded-full border border-white/10 bg-transparent text-[10px] sm:text-xs font-semibold tracking-[0.2em] text-zinc-400 uppercase">
            My Career Journey
          </div>
        </motion.div>

        <div className="relative">
          {/* Vertical Timeline Line */}
          <div className="absolute left-0 md:left-4 top-0 bottom-0 w-[2px] bg-white/5 hidden md:block" />
          <motion.div 
            style={{ scaleY, originY: 0 }}
            className="absolute left-0 md:left-4 top-0 bottom-0 w-[2px] bg-blue-500 hidden md:block shadow-[0_0_15px_rgba(59,130,246,0.6)]" 
          />

          <div className="flex flex-col gap-12">
            {experiences.map((exp, i) => (
              <TimelineCard key={i} exp={exp} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineCard({ exp, index }: { exp: any, index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start center", "center center"]
  });
  
  // The dot lights up when the card hits center
  const dotColor = useTransform(scrollYProgress, [0, 1], ["rgba(255,255,255,0.1)", "rgba(59,130,246,1)"]);
  const dotScale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);

  return (
    <div ref={cardRef} className="relative flex md:pl-16">
      {/* Timeline Dot */}
      <motion.div 
        style={{ backgroundColor: dotColor, scale: dotScale }}
        className="absolute left-[-5px] md:left-[11px] top-12 w-[12px] h-[12px] rounded-full hidden md:block border-2 border-[#0a0a0a] shadow-[0_0_10px_rgba(59,130,246,0.5)] z-10"
      />

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="w-full"
      >
        <SpotlightCard className="w-full">
          <div className="w-full p-8 md:p-10 flex flex-col group">
            
            {/* Header: Title & Date Pill */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <h3 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400 tracking-tight transition-transform duration-300 group-hover:translate-x-1">
                {exp.role}
              </h3>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 w-fit text-sm font-medium tracking-widest text-zinc-400 group-hover:border-white/20 transition-colors duration-300">
                <Calendar className="w-4 h-4 text-zinc-500 group-hover:text-zinc-300 transition-colors" />
                {exp.duration}
              </div>
            </div>

            {/* Sub-header: Company */}
            <div className="flex items-center gap-3 text-zinc-300 mb-8 font-medium">
              <Building2 className="w-5 h-5 text-blue-500/70" />
              <span className="text-lg">{exp.company}</span>
            </div>

            {/* Description Points */}
            <ul className="space-y-4">
              {exp.description.map((point: string, idx: number) => (
                <li key={idx} className="flex items-start gap-3 text-zinc-400 font-light leading-relaxed">
                  <div className="mt-1.5 w-4 h-4 flex-shrink-0 flex items-center justify-center rounded-full bg-blue-500/10 text-blue-400">
                    <ChevronRight className="w-3 h-3" />
                  </div>
                  <span className="group-hover:text-zinc-300 transition-colors duration-300">{point}</span>
                </li>
              ))}
            </ul>

          </div>
        </SpotlightCard>
      </motion.div>
    </div>
  );
}
