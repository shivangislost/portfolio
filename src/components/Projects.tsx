"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const projects = [
  {
    id: 1,
    title: "Sales & Performance Data Analysis",
    category: "Excel / MS Office",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
    bullets: [
      "Analyzed a 15,000+ row sales dataset to identify revenue trends, performance gaps, and growth opportunities across 5 product lines using pivot tables and statistical analysis.",
      "Produced executive-level summary reports with dynamic charts and data visualizations, reducing manual reporting effort by an estimated 35%."
    ]
  },
  {
    id: 2,
    title: "Guest Segmentation Dashboard – Serene Valley Resort",
    category: "Tableau",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop",
    bullets: [
      "Built an interactive Tableau dashboard segmenting 2,000+ guests by behavioral patterns and booking preferences, enabling targeted marketing strategies for 3 guest tiers.",
      "Delivered data visualization of key guest metrics, enabling the marketing team to increase campaign relevance and improve guest engagement by an estimated 20%."
    ]
  },
  {
    id: 3,
    title: "Customer Segmentation – GroomWell",
    category: "RFM Analysis / Python & Excel",
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1000&auto=format&fit=crop",
    bullets: [
      "Applied RFM statistical analysis to segment 5,000+ customers by value tier, identifying the top 15% high-value cohorts for retention campaigns.",
      "Delivered actionable segmentation insights that informed loyalty campaign targeting strategy, reducing churn risk for the highest-value customer segment."
    ]
  }
];

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
};

const Projects = () => {
  return (
    <section className="bg-[#121212] py-32 px-6 lg:px-12 w-full min-h-screen">
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="text-4xl md:text-5xl font-bold text-white mb-16 tracking-tight"
        >
          Selected Work
        </motion.h2>
        
        <div className="grid grid-cols-1 gap-12 md:gap-16">
          {projects.map((project, index) => (
            <motion.div 
              key={project.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: { opacity: 0, scale: 0.95, y: 50 },
                visible: { 
                  opacity: 1, 
                  scale: 1, 
                  y: 0, 
                  transition: { duration: 0.7, delay: index * 0.1, ease: "easeOut" } 
                }
              }}
              className="group relative rounded-2xl overflow-hidden min-h-[400px] md:aspect-[21/9] bg-zinc-900 border border-white/10 hover:border-white/20 transition-all duration-500 hover:shadow-[0_0_40px_-15px_rgba(255,255,255,0.2)] flex flex-col md:flex-row"
            >
              {/* Image side */}
              <div className="w-full md:w-1/2 relative min-h-[250px] md:min-h-full overflow-hidden">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105 opacity-60 group-hover:opacity-80"
                  style={{ backgroundImage: `url(${project.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#121212] opacity-0 md:opacity-100" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent md:hidden" />
              </div>
              
              {/* Content side */}
              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center relative z-10 bg-[#121212]/80 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none">
                <div>
                  <p className="text-zinc-400 text-sm font-medium mb-3 tracking-widest uppercase">
                    {project.category}
                  </p>
                  <h3 className="text-2xl md:text-3xl font-semibold text-white tracking-tight mb-6">
                    {project.title}
                  </h3>
                  
                  <ul className="space-y-4 text-zinc-300 font-light text-sm md:text-base list-disc pl-4">
                    {project.bullets.map((bullet, i) => (
                      <li key={i}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
