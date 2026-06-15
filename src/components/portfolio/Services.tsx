"use client";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

const services = [
  {
    n: "01",
    title: "Full Stack Development",
    desc: "Building scalable, high-performance web apps using Next.js, React, Node.js and TypeScript, with robust backends, secure REST APIs and clean code practices.",
  },
  {
    n: "02",
    title: "UI/UX Design & Frontend",
    desc: "Modern, responsive interfaces with Figma, Tailwind CSS and Framer Motion. Intuitive experiences with clean design systems and pixel-perfect implementations.",
  },
  {
    n: "03",
    title: "SaaS Platform Development",
    desc: "End-to-end SaaS with subscription systems, Stripe billing and multi-tenant management. Scalable, secure and engineered for growth from day one.",
  },
  {
    n: "04",
    title: "API & System Architecture",
    desc: "Maintainable APIs with PostgreSQL, Prisma and MongoDB. Performance optimization, security best practices and reliable data flow.",
  },
];

export function Services() {
  return (
    <section className="mx-auto max-w-[1600px] px-6 py-32 md:px-10 md:py-48">
      <div className="mb-16 flex flex-col gap-4">
        <div className="text-primary text-xs tracking-[0.3em] uppercase">
          ✺ Services
        </div>
        <h2 className="font-display text-5xl tracking-tight md:text-7xl">
          What I <span className="text-accent italic">do</span> best
        </h2>
      </div>

      <ul className="border-border border-t">
        {services.map((s, i) => (
          <motion.li
            key={s.n}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: i * 0.08 }}
            className="group border-border relative border-b"
          >
            <div className="bg-accent/5 absolute inset-0 origin-left scale-y-0 transition-transform duration-500 group-hover:scale-y-100" />
            <div className="relative grid grid-cols-[auto_1fr_auto] items-start gap-6 px-2 py-8 md:grid-cols-[80px_1fr_1.2fr_auto] md:gap-10 md:py-12">
              <span className="text-primary font-mono text-xs md:text-sm">
                {s.n}
              </span>
              <h3 className="font-display text-2xl tracking-tight transition-transform duration-500 group-hover:translate-x-2 md:text-4xl">
                {s.title}
              </h3>
              <p className="text-muted-foreground hidden max-w-md text-sm leading-relaxed md:block">
                {s.desc}
              </p>
              <ArrowUpRight className="text-muted-foreground group-hover:text-accent h-5 w-5 shrink-0 transition-all duration-500 group-hover:rotate-45 md:h-6 md:w-6" />
            </div>
            <p className="text-muted-foreground px-2 pb-8 text-sm leading-relaxed md:hidden">
              {s.desc}
            </p>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
