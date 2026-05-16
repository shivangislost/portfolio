"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Matter from "matter-js";

const techData = [
  { name: "HTML", src: "https://api.iconify.design/logos:html-5.svg" },
  { name: "CSS", src: "https://api.iconify.design/logos:css-3.svg" },
  { name: "JavaScript", src: "https://api.iconify.design/logos:javascript.svg" },
  { name: "Excel", src: "https://api.iconify.design/vscode-icons:file-type-excel.svg" },
  { name: "Google Sheets", src: "/google-sheets.svg" },
  { name: "Power BI", src: "https://api.iconify.design/logos:microsoft-power-bi.svg" },
  { name: "Python", src: "https://api.iconify.design/logos:python.svg" },
  { name: "SQL", src: "https://api.iconify.design/logos:mysql.svg" },
  { name: "Tableau", src: "https://api.iconify.design/logos:tableau-icon.svg" },
  { name: "GitHub", src: "https://api.iconify.design/logos:github-icon.svg" }
];

export default function TechStack() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef(Matter.Engine.create({ gravity: { x: 0, y: 0, scale: 0 } }));
  const renderRef = useRef<number>();
  const [balls, setBalls] = useState<Matter.Body[]>([]);

  useEffect(() => {
    if (!sceneRef.current) return;

    const engine = engineRef.current;
    const { width, height } = sceneRef.current.getBoundingClientRect();
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = width < 768 ? 48 : 64; 

    // 1. Generate Physics Bodies
    const newBalls = techData.map((tech, i) => {
      const angle = (i / techData.length) * Math.PI * 2;
      const dist = 100 + Math.random() * 50;
      const x = centerX + Math.cos(angle) * dist;
      const y = centerY + Math.sin(angle) * dist;

      return Matter.Bodies.circle(x, y, radius, {
        restitution: 0.9,
        friction: 0.005,
        frictionAir: 0.04,
        density: 0.03,
        inertia: Infinity,
      });
    });

    Matter.World.add(engine.world, newBalls);
    setBalls(newBalls);

    // Add invisible bouncy walls
    const wallOptions = { 
      isStatic: true, 
      restitution: 0.95, 
      friction: 0, 
      render: { visible: false } 
    };
    
    const thickness = 60;
    const ground = Matter.Bodies.rectangle(width / 2, height + thickness / 2, width * 2, thickness, wallOptions);
    const ceiling = Matter.Bodies.rectangle(width / 2, -thickness / 2, width * 2, thickness, wallOptions);
    const leftWall = Matter.Bodies.rectangle(-thickness / 2, height / 2, thickness, height * 2, wallOptions);
    const rightWall = Matter.Bodies.rectangle(width + thickness / 2, height / 2, thickness, height * 2, wallOptions);

    Matter.World.add(engine.world, [ground, ceiling, leftWall, rightWall]);

    // 2. Mouse interaction - grab & throw
    const mouse = Matter.Mouse.create(sceneRef.current);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.15,
        damping: 0.02,
        render: { visible: false }
      }
    });

    Matter.World.add(engine.world, mouseConstraint);

    // Boost throw velocity on release
    Matter.Events.on(mouseConstraint, "enddrag", (event: any) => {
      const body = event.body;
      if (body) {
        const velocityBoost = 1.8;
        Matter.Body.setVelocity(body, {
          x: body.velocity.x * velocityBoost,
          y: body.velocity.y * velocityBoost,
        });
      }
    });

    // 3. Enhanced Physics Loop
    const handleBeforeUpdate = () => {
      newBalls.forEach((body, i) => {
        // A. Center gravity spring
        const dx = centerX - body.position.x;
        const dy = centerY - body.position.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        const forceMagnitude = 0.00003 * body.mass * distance; 
        Matter.Body.applyForce(body, body.position, {
          x: (dx / distance) * forceMagnitude,
          y: (dy / distance) * forceMagnitude
        });

        // B. Cursor Force Field - Stronger & wider repulsion
        if (mouse.position.x !== 0 && mouse.position.y !== 0) {
          const mdx = mouse.position.x - body.position.x;
          const mdy = mouse.position.y - body.position.y;
          const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
          
          if (mDist < 300 && mDist > 0) {
            const repelStrength = Math.pow((300 - mDist) / 300, 1.5);
            Matter.Body.applyForce(body, body.position, {
              x: -(mdx / mDist) * repelStrength * 0.05 * body.mass,
              y: -(mdy / mDist) * repelStrength * 0.05 * body.mass
            });
          }
        }

        // C. Inter-ball soft repulsion (prevents clumping)
        for (let j = i + 1; j < newBalls.length; j++) {
          const other = newBalls[j];
          const bdx = other.position.x - body.position.x;
          const bdy = other.position.y - body.position.y;
          const bDist = Math.sqrt(bdx * bdx + bdy * bdy);
          const minDist = radius * 2.5;

          if (bDist < minDist && bDist > 0) {
            const overlap = (minDist - bDist) / minDist;
            const pushForce = overlap * overlap * 0.0008 * body.mass;
            Matter.Body.applyForce(body, body.position, {
              x: -(bdx / bDist) * pushForce,
              y: -(bdy / bDist) * pushForce
            });
            Matter.Body.applyForce(other, other.position, {
              x: (bdx / bDist) * pushForce,
              y: (bdy / bDist) * pushForce
            });
          }
        }
      });
    };

    Matter.Events.on(engine, "beforeUpdate", handleBeforeUpdate);

    // 4. Start Matter.js Engine Runner
    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);

    // 5. 60FPS DOM Render Loop with velocity-based glow
    const updateDOM = () => {
      newBalls.forEach((body, i) => {
        const el = document.getElementById(`ball-${i}`);
        if (el) {
          el.style.transform = `translate3d(${body.position.x - radius}px, ${body.position.y - radius}px, 0)`;
          
          // Velocity-based glow effect
          const speed = Math.sqrt(body.velocity.x ** 2 + body.velocity.y ** 2);
          const glowIntensity = Math.min(speed / 8, 1); // Normalize to 0-1
          const glowEl = el.querySelector('.velocity-glow') as HTMLElement;
          if (glowEl) {
            glowEl.style.opacity = `${glowIntensity * 0.7}`;
            glowEl.style.transform = `scale(${1 + glowIntensity * 0.15})`;
          }
        }
      });
      renderRef.current = requestAnimationFrame(updateDOM);
    };
    renderRef.current = requestAnimationFrame(updateDOM);

    // Cleanup
    return () => {
      Matter.Runner.stop(runner);
      Matter.Events.off(engine, "beforeUpdate", handleBeforeUpdate);
      Matter.Engine.clear(engine);
      Matter.World.clear(engine.world, false);
      if (renderRef.current) cancelAnimationFrame(renderRef.current);
    };
  }, []);

  return (
    <section className="w-full py-24 md:py-32 bg-[#0a0a0a] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-16 flex flex-col items-center text-center">
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-sm font-bold tracking-widest uppercase text-zinc-500 mb-2"
        >
          Technologies & Tools
        </motion.p>
        <h2 className="text-4xl md:text-5xl tracking-tighter text-zinc-300">
          My <span className="font-bold text-white">Arsenal</span>
        </h2>
      </div>

      <div 
        ref={sceneRef}
        className="relative w-full h-[60vh] max-w-5xl mx-auto cursor-crosshair overflow-hidden"
      >
        {balls.length > 0 && techData.map((tech, i) => (
          <div
            key={tech.name}
            id={`ball-${i}`}
            className="absolute top-0 left-0 w-24 h-24 md:w-32 md:h-32 rounded-full cursor-grab active:cursor-grabbing group z-10 hover:z-20 will-change-transform"
            style={{ 
              transition: "box-shadow 0.3s ease",
            }}
          >
            {/* 3D Sphere Container */}
            <div 
              className="relative w-full h-full rounded-full overflow-hidden"
              style={{
                background: "radial-gradient(circle at 35% 30%, #ffffff 0%, #f0f0f0 40%, #d4d4d8 75%, #a1a1aa 100%)",
                boxShadow: `
                  10px 15px 30px rgba(0,0,0,0.5),
                  -2px -2px 10px rgba(255,255,255,0.05),
                  inset -8px -8px 20px rgba(0,0,0,0.15),
                  inset 4px 4px 15px rgba(255,255,255,0.9)
                `,
              }}
            >
              {/* Velocity-based glow ring */}
              <div 
                className="velocity-glow absolute -inset-2 rounded-full pointer-events-none transition-all duration-150"
                style={{
                  background: "radial-gradient(circle, rgba(59,130,246,0.3) 0%, rgba(20,184,166,0.15) 50%, transparent 70%)",
                  opacity: 0,
                  filter: "blur(8px)",
                }}
              />

              {/* Highlight / light reflection overlay */}
              <div 
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                  background: "radial-gradient(circle at 30% 25%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.1) 35%, transparent 60%)",
                }}
              />
              
              {/* Logo */}
              <div className="absolute inset-0 flex items-center justify-center">
                <img 
                  src={tech.src} 
                  alt={tech.name} 
                  draggable="false"
                  className="w-10 h-10 md:w-14 md:h-14 transition-transform duration-300 group-hover:scale-125 drop-shadow-sm relative z-10 pointer-events-none" 
                />
              </div>
              
              {/* Subtle edge ring */}
              <div 
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                  boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.15), inset 0 0 0 2px rgba(0,0,0,0.05)",
                }}
              />
            </div>

            {/* Hover tooltip */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-[10px] font-semibold tracking-wider text-white uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
              {tech.name}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

