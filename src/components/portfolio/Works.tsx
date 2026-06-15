"use client";
import { motion } from "motion/react";
import { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";

const projects = [
  { title: "VexLogic AI", category: "AI Assistant", hue: "260" },
  { title: "VexLogic Business", category: "Business", hue: "200" },
  { title: "Comra", category: "3D Visualisation", hue: "75" },
  { title: "Superhost", category: "Property Booking", hue: "20" },
];

export function Works() {
  const [hover, setHover] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const hoveredProject = hover === null ? null : (projects[hover] ?? null);

  return (
    <section
      id="works"
      className="mx-auto max-w-[1600px] px-6 py-32 md:px-10 md:py-48"
    >
      <div className="mb-16 grid gap-8 md:grid-cols-2 md:items-end">
        <div>
          <div className="text-muted-foreground mb-4 text-xs tracking-[0.3em] uppercase">
            ✺ Selected Works
          </div>
          <h2 className="font-display text-5xl tracking-tight md:text-7xl">
            Recent <span className="text-accent italic">projects</span>
          </h2>
        </div>
        <p className="text-muted-foreground max-w-md text-base leading-relaxed md:justify-self-end">
          Discover my latest work and creative solutions that bring ideas to
          life.
        </p>
      </div>

      <div
        ref={containerRef}
        onMouseMove={(e) => {
          const r = containerRef.current?.getBoundingClientRect();
          if (!r) return;
          setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
        }}
        onMouseLeave={() => setHover(null)}
        className="border-border relative border-t"
      >
        {/* Cursor-follow preview */}
        <motion.div
          aria-hidden
          animate={{
            x: pos.x - 160,
            y: pos.y - 100,
            opacity: hover !== null ? 1 : 0,
            scale: hover !== null ? 1 : 0.85,
          }}
          transition={{
            type: "spring",
            stiffness: 220,
            damping: 24,
            mass: 0.5,
          }}
          className="pointer-events-none absolute top-0 left-0 z-20 hidden h-[200px] w-[320px] overflow-hidden rounded-lg md:block"
          style={{
            background:
              hoveredProject !== null
                ? `radial-gradient(circle at 30% 30%, oklch(0.78 0.16 ${hoveredProject.hue} / 0.7), oklch(0.18 0.02 ${hoveredProject.hue}))`
                : "transparent",
          }}
        >
          <div className="font-display flex h-full items-end p-6 text-2xl">
            {hoveredProject?.title ?? ""}
          </div>
        </motion.div>

        {projects.map((p, i) => (
          <motion.a
            key={p.title}
            href="#"
            onMouseEnter={() => setHover(i)}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.06 }}
            className="group border-border block border-b"
          >
            <div className="grid grid-cols-[1fr_auto] items-baseline gap-6 py-8 md:grid-cols-[auto_1fr_auto_auto] md:gap-10 md:py-12">
              <span className="text-muted-foreground hidden font-mono text-xs md:block">
                0{i + 1}
              </span>
              <h3 className="font-display text-3xl tracking-tight transition-transform duration-500 group-hover:translate-x-3 md:text-6xl">
                {p.title}
              </h3>
              <span className="text-muted-foreground hidden text-xs tracking-[0.25em] uppercase md:block">
                {p.category}
              </span>
              <ArrowUpRight className="text-muted-foreground group-hover:text-accent h-5 w-5 transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 md:h-6 md:w-6" />
            </div>
            <span className="text-muted-foreground block pb-6 text-xs tracking-[0.25em] uppercase md:hidden">
              {p.category}
            </span>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
