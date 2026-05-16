"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import SpotlightCard from "./SpotlightCard";

const projects = [
  {
    id: "01",
    title: "Serene Valley Dashboard",
    category: "TABLEAU / RFM ANALYSIS",
    image: "/images/serene_valley_dashboard_1778951848983.png",
    desc: "Built an interactive Tableau dashboard analyzing 100+ bookings and over Rs 16L in total revenue, segmenting guests based on booking behavior and spending patterns.",
    link: "https://public.tableau.com/app/profile/shivang.chaubey/viz/Shivang_SereneValley/Dashboard"
  },
  {
    id: "02",
    title: "GroomWell Segmentation",
    category: "TABLEAU / EXCEL",
    image: "/images/groomwell_dashboard_1778951894403.png",
    desc: "Applied RFM analysis to segment customers into Champions, Loyal Customers, and At-Risk Users. Built a dashboard tracking total revenue (~Rs 2.6L) to support retention strategies.",
    link: "https://public.tableau.com/app/profile/shivang.chaubey/viz/Shivang_GroomWell/Dashboard"
  },
  {
    id: "03",
    title: "ElectroMart Analysis",
    category: "MS EXCEL / DATA WRANGLING",
    image: "/images/electromart_dashboard_1778951972288.png",
    desc: "Analyzed a 15,000+ row dataset using ETL techniques. Built an interactive Excel dashboard tracking key metrics to evaluate platform performance across 6 e-commerce channels.",
    link: "https://docs.google.com/spreadsheets/d/1DBsG3HX-YJ7KZtDR7d2YNkfQTYbiIPxane31Wooec-k/edit?usp=sharing"
  },
  {
    id: "04",
    title: "Interactive 3D Portfolio",
    category: "WEB / 3D INTERACTIVE",
    image: "/images/interactive_portfolio.png",
    desc: "A highly interactive portfolio website featuring 3D physics-based animations, dynamic typography, and a modern dark aesthetic.",
    link: "https://shivang-portfolio1.vercel.app/"
  }
];

export default function SelectedWork() {
  return (
    <section id="work" className="w-full py-24 md:py-32 px-6 lg:px-12 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 md:mb-24 flex flex-col items-center text-center"
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl tracking-tighter text-zinc-300 font-light mb-6">
            Selected <span className="font-bold text-white">Work</span>
          </h2>
          <p className="text-lg text-zinc-500 max-w-xl">
            Highlighting recent projects where data met decision-making.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {projects.map((project, index) => {
            return <ProjectCard key={project.id} project={project} index={index} />;
          })}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: any, index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={`group h-full ${project.link ? "cursor-pointer" : ""}`}
      onClick={() => project.link && window.open(project.link, "_blank")}
    >
      <SpotlightCard className="h-full">
        <div className="h-full flex flex-col overflow-hidden relative group">
          
          {/* Image Block */}
          <div className="w-full aspect-[4/3] md:aspect-[16/10] overflow-hidden bg-zinc-900 border-b border-white/5 relative p-4 pb-0">
            <div className="w-full h-full rounded-t-2xl overflow-hidden relative">
              <div 
                className="w-full h-full bg-cover bg-top transition-all duration-700 ease-[0.16,1,0.3,1] group-hover:scale-105 filter brightness-95 saturate-100 opacity-90 group-hover:brightness-110 group-hover:saturate-150 group-hover:opacity-100 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]"
                style={{ backgroundImage: `url(${project.image})` }}
              />
            </div>
          </div>

          {/* Content Block */}
          <div className="p-8 md:p-10 flex flex-col flex-grow relative justify-end">
            <h3 className="text-2xl md:text-3xl font-semibold text-white mb-2 tracking-tight group-hover:text-blue-500 transition-colors duration-300">
              {project.title}
            </h3>
            <span className="text-xs md:text-sm font-semibold tracking-[0.2em] uppercase text-zinc-500">
              {project.category}
            </span>
            
            {project.link && (
              <div className="absolute bottom-8 right-8 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-blue-600 group-hover:border-blue-600 group-hover:text-white text-zinc-400 transition-all duration-300">
                <ArrowUpRight className="w-5 h-5" />
              </div>
            )}
          </div>
        </div>
      </SpotlightCard>
    </motion.div>
  );
}
