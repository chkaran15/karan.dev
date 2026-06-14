"use client";

import { motion } from "motion/react";

export function About() {
  return (
    <section id="about" className="mx-auto max-w-[1600px] px-6 py-32 md:px-10 md:py-48">
      <div className="mb-16 flex items-end justify-between gap-6">
        <div>
          <div className="mb-4 text-xs uppercase tracking-[0.3em] text-muted-foreground">
            ✺ About Me
          </div>
          <h2 className="font-display text-5xl tracking-tight md:text-7xl">My Short Story</h2>
        </div>
        <span className="hidden text-xs uppercase tracking-[0.3em] text-muted-foreground md:block">
          Scroll to Explore ↓
        </span>
      </div>

      <div className="grid gap-12 md:grid-cols-[1fr_1.3fr] md:gap-20">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-secondary"
        >
          <div
            className="h-full w-full bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
            style={{
              backgroundImage:
                "radial-gradient(circle at 30% 30%, oklch(0.78 0.16 75 / 0.4), transparent 60%), linear-gradient(135deg, oklch(0.2 0.02 250), oklch(0.12 0.005 250))",
            }}
          />
          <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between p-6 text-xs uppercase tracking-[0.25em]">
            <span>Karan</span>
            <span className="text-muted-foreground">EST. 2022</span>
          </div>
        </motion.div>

        <div className="flex flex-col justify-between gap-10">
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-display text-3xl leading-tight tracking-tight md:text-5xl"
          >
            Driving measurable growth and engagement through{" "}
            <span className="italic text-accent">thoughtful design</span> and engineering.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="max-w-lg text-base leading-relaxed text-muted-foreground"
          >
            Every product I build starts with understanding user goals and translating them into
            intuitive, high-performance experiences. From concept to launch, I focus on meaningful
            results — boosting user engagement, retention, and overall business impact.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
