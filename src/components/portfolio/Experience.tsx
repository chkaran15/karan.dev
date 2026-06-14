"use client";
import { motion } from "motion/react";

const items = [
  {
    company: "Techivation",
    role: "Full Stack Developer · Part-time",
    desc: "Building and maintaining Techivation's full web and SaaS ecosystem powering audio plugin licensing and management.",
    date: "May 2025 — Present",
  },
  {
    company: "VexLogic",
    role: "Full Stack Engineer · Part-time",
    desc: "Developing an AI-powered SaaS platform with real-time collaboration, billing systems, and intelligent document management.",
    date: "Jun 2025 — Present",
  },
  {
    company: "Comra AI",
    role: "Full Stack Developer · Full-time",
    desc: "Building immersive 3D virtual tour systems using React Three Fiber, Prisma and PostgreSQL for real estate and architecture.",
    date: "Nov 2024 — Present",
  },
  {
    company: "Digital Natives",
    role: "Frontend Developer · Full-time",
    desc: "Built scalable web apps and reusable UI systems using React, Next.js and Tailwind CSS for enterprise clients.",
    date: "Feb 2024 — Oct 2024",
  },
  {
    company: "Fintechracy",
    role: "Frontend Developer · Full-time",
    desc: "Developed a mobile-first PWA for financial management with offline storage, barcode scanning and performance optimization.",
    date: "Nov 2023 — Mar 2024",
  },
  {
    company: "Codintex",
    role: "Software Engineer · Internship",
    desc: "Worked on enterprise desktop apps using .NET and C#, gaining foundational experience in backend systems and security.",
    date: "Jul 2022 — Sep 2023",
  },
];

export function Experience() {
  return (
    <section className="mx-auto max-w-[1600px] px-6 py-32 md:px-10 md:py-48">
      <div className="mb-16 flex flex-col gap-4">
        <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">✺ Experience</div>
        <h2 className="max-w-2xl font-display text-5xl tracking-tight md:text-7xl">
          Explore my <span className="italic text-accent">journey</span> and the technologies that
          define my craft.
        </h2>
      </div>

      <ol className="border-t border-border">
        {items.map((it, i) => (
          <motion.li
            key={it.company}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: i * 0.05 }}
            className="group grid grid-cols-[auto_1fr] items-start gap-4 border-b border-border py-8 transition-colors hover:bg-accent/5 md:grid-cols-[80px_1.2fr_2fr_1fr] md:gap-10 md:py-10"
          >
            <span className="font-mono text-xs text-muted-foreground md:text-sm">
              0{i + 1}
            </span>
            <div className="col-span-2 md:col-span-1">
              <h3 className="font-display text-2xl tracking-tight transition-transform duration-500 group-hover:translate-x-2 md:text-4xl">
                {it.company}
              </h3>
              <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {it.role}
              </p>
            </div>
            <p className="col-span-2 max-w-lg text-sm leading-relaxed text-muted-foreground md:col-span-1">
              {it.desc}
            </p>
            <span className="col-span-2 font-mono text-xs text-muted-foreground md:col-span-1 md:justify-self-end md:text-right">
              {it.date}
            </span>
          </motion.li>
        ))}
      </ol>
    </section>
  );
}
