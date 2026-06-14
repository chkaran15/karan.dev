"use client";
import { motion, useScroll, useTransform, type Variants } from "motion/react";
import { useRef } from "react";
import { ArrowDown } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const reveal: Variants = {
  hidden: { y: "110%" },
  show: (i: number) => ({
    y: "0%",
    transition: { duration: 1.1, ease: EASE, delay: 0.1 + i * 0.08 },
  }),
};

function Line({ children, i }: { children: React.ReactNode; i: number }) {
  return (
    <span className="block overflow-hidden">
      <motion.span variants={reveal} initial="hidden" animate="show" custom={i} className="block">
        {children}
      </motion.span>
    </span>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section id="home" ref={ref} className="relative min-h-screen overflow-hidden pt-28 md:pt-32">
      <motion.div style={{ y, opacity }} className="mx-auto max-w-[1600px] px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mb-10 flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-muted-foreground"
        >
          <span className="live-dot inline-block h-1.5 w-1.5 rounded-full bg-accent" />
          Hello! — Portfolio 2025 © Edition
        </motion.div>

        <h1 className="font-display text-[14vw] leading-[0.9] tracking-[-0.02em] md:text-[10vw]">
          <Line i={0}>Hi! I'm Karan</Line>
          <Line i={1}>
            <span className="text-muted-foreground">Full-stack</span> Developer
          </Line>
          <Line i={2}>
            <span className="italic text-accent">UI &amp; UX</span> Designer.
          </Line>
        </h1>

        <div className="mt-14 grid gap-10 md:mt-20 md:grid-cols-[1fr_auto_1fr]">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="max-w-md text-sm leading-relaxed text-muted-foreground md:text-base"
          >
            I'm Karan — a Full Stack Developer crafting fast, scalable, and immersive digital
            experiences that merge creativity with engineering precision.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="hidden flex-col items-center gap-2 md:flex"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              Scroll
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowDown className="h-4 w-4 text-accent" />
            </motion.div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="ml-auto max-w-md text-sm leading-relaxed text-muted-foreground md:text-base"
          >
            I specialize in SaaS platforms, AI-driven products, and interactive 3D web experiences
            using Next.js, Node.js, and Three.js.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="mt-16 flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-muted-foreground md:mt-24"
        >
          <span>Karan Chaudhary</span>
          <span>v.2.5 — 2025</span>
        </motion.div>
      </motion.div>
    </section>
  );
}
