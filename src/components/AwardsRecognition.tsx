"use client";

import React from "react";
import { motion } from "framer-motion";
import { Award, Calendar, Building2 } from "lucide-react";
import SpotlightCard from "./SpotlightCard";

const awards = [
  {
    title: "Certified Data Analyst 101",
    issuer: "Simplilearn × Microsoft",
    date: "2025",
  },
  {
    title: "Business Intelligence and Data Visualization in Excel 365",
    issuer: "Udemy",
    date: "2026",
  },
  {
    title: "Fundamentals of Business Analytics",
    issuer: "L&T Edutech",
    date: "2025",
  },
  {
    title: "Business Analytics with Excel",
    issuer: "Simplilearn × Microsoft",
    date: "2026",
  }
];

export default function AwardsRecognition() {
  return (
    <section className="w-full py-24 md:py-32 px-6 lg:px-12 bg-[#0a0a0a]">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 md:mb-24 flex flex-col items-center text-center"
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl tracking-tighter text-zinc-300 font-light mb-6">
            Certifications & <span className="font-bold text-white">Honors</span>
          </h2>
          <div className="inline-flex items-center justify-center px-6 py-2 rounded-full border border-white/10 bg-transparent text-[10px] sm:text-xs font-semibold tracking-[0.2em] text-zinc-400 uppercase">
            Professional Credentials
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {awards.map((award, i) => (
            <motion.div
              key={award.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <SpotlightCard className="h-full">
                <div className="h-full p-8 md:p-10 flex flex-col group">
                  
                  {/* Icon & Date */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Award className="w-5 h-5 text-blue-400" />
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium tracking-widest text-zinc-400 group-hover:border-white/20 transition-colors duration-300">
                      <Calendar className="w-4 h-4 text-zinc-500 group-hover:text-zinc-300 transition-colors" />
                      {award.date}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400 tracking-tight mb-4 transition-transform duration-300 group-hover:translate-x-1">
                    {award.title}
                  </h3>

                  {/* Issuer */}
                  <div className="flex items-center gap-3 text-zinc-300 font-medium mt-auto">
                    <Building2 className="w-5 h-5 text-blue-500/70" />
                    <span className="text-base">{award.issuer}</span>
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

