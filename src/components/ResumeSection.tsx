"use client";

import React from "react";
import { Briefcase, GraduationCap, Code2, Award, Mail, Phone } from "lucide-react";
import { motion } from "framer-motion";
import TiltCard from "./TiltCard";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const ResumeSection = () => {
  return (
    <section className="bg-[#121212] py-24 px-6 lg:px-12 w-full text-white border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="text-4xl md:text-5xl font-bold mb-16 tracking-tight"
        >
          Background
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Experience Column */}
          <div className="space-y-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeUp} className="flex items-center gap-3 mb-8">
                <Briefcase className="w-6 h-6 text-zinc-400" />
                <h3 className="text-2xl font-semibold tracking-tight">Experience</h3>
              </motion.div>
              
              <div className="space-y-10">
                {/* Job 1 */}
                <TiltCard tiltIntensity={5}>
                  <motion.div variants={fadeUp} className="relative pl-6 border-l border-white/10 group cursor-default">
                    <div className="absolute w-3 h-3 bg-zinc-400 rounded-full -left-[1.5px] top-1.5 -translate-x-1/2 group-hover:scale-150 transition-transform duration-300" />
                    <h4 className="text-xl font-medium">Data Analyst Trainee</h4>
                    <p className="text-zinc-400 mt-1">Invact Metaversity | Remote, Lucknow, IN | May 2025 - Jul 2025</p>
                    <p className="text-sm font-medium text-zinc-500 mt-2 mb-3">SQL • Excel • Tableau</p>
                    <ul className="text-zinc-300 space-y-2 font-light text-sm list-disc pl-4">
                      <li>Collected, cleaned, and analyzed datasets of 10,000+ records using SQL and Excel, extracting actionable business insights that informed weekly reporting cycles.</li>
                      <li>Designed 3+ interactive Tableau dashboards with KPI visualizations and data visualization best practices, adopted by multiple business teams for decision-making.</li>
                      <li>Performed statistical analysis and data validation across all deliverables, reducing reporting errors by ensuring 100% data integrity before stakeholder review.</li>
                      <li>Translated business requirements into structured analytical reports and presentations, reducing reporting prep time by ~30%.</li>
                    </ul>
                  </motion.div>
                </TiltCard>

                {/* Job 2 */}
                <TiltCard tiltIntensity={5}>
                  <motion.div variants={fadeUp} className="relative pl-6 border-l border-white/10 group cursor-default">
                    <div className="absolute w-3 h-3 bg-zinc-600 rounded-full -left-[1.5px] top-1.5 -translate-x-1/2 group-hover:scale-150 transition-transform duration-300" />
                    <h4 className="text-xl font-medium">QA Tester & Release Manager</h4>
                    <p className="text-zinc-400 mt-1">eL Nova Labs | Remote, Lucknow, IN | Apr 2024 - Jan 2025</p>
                    <ul className="text-zinc-300 mt-4 space-y-2 font-light text-sm list-disc pl-4">
                      <li>Designed and executed 100+ structured test cases for web applications, achieving zero critical defect escapes across 5+ major product releases.</li>
                      <li>Tracked and analyzed software defects using structured reports, identifying recurring failure patterns and reducing regression issues by 25% over the engagement.</li>
                      <li>Performed regression testing across multiple release cycles, resolving 40+ defects within sprint timelines alongside the development team.</li>
                      <li>Managed end-to-end release schedules for 5+ deployments, coordinating between QA and development teams to ensure on-time, stable software releases.</li>
                    </ul>
                  </motion.div>
                </TiltCard>
              </div>
            </motion.div>

            {/* Education */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeUp} className="flex items-center gap-3 mb-8 pt-8 lg:pt-0">
                <GraduationCap className="w-6 h-6 text-zinc-400" />
                <h3 className="text-2xl font-semibold tracking-tight">Education</h3>
              </motion.div>
              
              <div className="space-y-8">
                <TiltCard tiltIntensity={12}>
                  <motion.div variants={fadeUp} className="p-6 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors shadow-xl">
                    <h4 className="text-xl font-medium">MBA, Business Analytics</h4>
                    <p className="text-zinc-400 mt-2">Shri Ramswaroop Memorial University, Lucknow</p>
                    <p className="text-zinc-500 text-sm mt-1">2025 - 2027</p>
                  </motion.div>
                </TiltCard>
                
                <TiltCard tiltIntensity={12}>
                  <motion.div variants={fadeUp} className="p-6 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors shadow-xl">
                    <h4 className="text-xl font-medium">B.A. (Hons), Public Administration</h4>
                    <p className="text-zinc-400 mt-2">Babasaheb Bhimrao Ambedkar University, Lucknow</p>
                    <p className="text-zinc-500 text-sm mt-1">2016 - 2019</p>
                  </motion.div>
                </TiltCard>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Skills & Certifications */}
          <div className="space-y-16">
            
            {/* Skills */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeUp} className="flex items-center gap-3 mb-8">
                <Code2 className="w-6 h-6 text-zinc-400" />
                <h3 className="text-2xl font-semibold tracking-tight">Skills</h3>
              </motion.div>
              
              <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
                {[
                  "SQL", "Microsoft Excel", "Tableau", "Python", "Power BI", 
                  "Google Sheets", "Data Visualization", "Statistical Analysis", 
                  "RFM Analysis", "Data Cleaning", "Dashboard Development", 
                  "HTML & CSS", "Git"
                ].map((skill) => (
                  <motion.span 
                    whileHover={{ scale: 1.05 }}
                    key={skill} 
                    className="px-4 py-2 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-sm font-medium hover:border-zinc-600 transition-colors cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>

            {/* Certifications */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeUp} className="flex items-center gap-3 mb-8">
                <Award className="w-6 h-6 text-zinc-400" />
                <h3 className="text-2xl font-semibold tracking-tight">Certifications</h3>
              </motion.div>
              
              <div className="space-y-4">
                <TiltCard tiltIntensity={8}>
                  <motion.div variants={fadeUp} className="flex flex-col md:flex-row md:items-center justify-between p-5 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors gap-2 shadow-lg">
                    <h4 className="font-medium">Certified Data Analyst 101</h4>
                    <p className="text-zinc-400 text-sm">Simplilearn × Microsoft</p>
                  </motion.div>
                </TiltCard>
                <TiltCard tiltIntensity={8}>
                  <motion.div variants={fadeUp} className="flex flex-col md:flex-row md:items-center justify-between p-5 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors gap-2 shadow-lg">
                    <h4 className="font-medium">Business Analytics with Excel</h4>
                    <p className="text-zinc-400 text-sm">Simplilearn × Microsoft</p>
                  </motion.div>
                </TiltCard>
                <TiltCard tiltIntensity={8}>
                  <motion.div variants={fadeUp} className="flex flex-col md:flex-row md:items-center justify-between p-5 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors gap-2 shadow-lg">
                    <h4 className="font-medium">Fundamentals of Business Analytics</h4>
                    <p className="text-zinc-400 text-sm">L&T Edutech</p>
                  </motion.div>
                </TiltCard>
              </div>
            </motion.div>

            {/* Contact / Languages */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
              className="pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-8"
            >
              <div>
                <h3 className="text-lg font-medium mb-4 text-zinc-300">Languages</h3>
                <ul className="space-y-2 text-zinc-400 text-sm">
                  <li><strong className="text-zinc-300 font-medium">Hindi</strong> — Native</li>
                  <li><strong className="text-zinc-300 font-medium">English</strong> — Professional Working Proficiency</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-4 text-zinc-300">Contact</h3>
                <ul className="space-y-3 text-zinc-400 text-sm">
                  <li className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <a href="mailto:ishivangchaubey@gmail.com" className="hover:text-white transition-colors">ishivangchaubey@gmail.com</a>
                  </li>
                  <li className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span>+91 7348182789</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-400"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                    <a href="https://linkedin.com/in/ishivangchaubey" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">linkedin.com/in/ishivangchaubey</a>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-400"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                    <a href="https://github.com/shivangislost" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">github.com/shivangislost</a>
                  </li>
                </ul>
              </div>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default ResumeSection;
