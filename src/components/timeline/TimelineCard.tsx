"use client";
import { motion, useTransform, useReducedMotion, cubicBezier, type MotionValue } from "motion/react";
import type { TimelineItem } from "@/data/timeline";

interface TimelineCardProps {
  item: TimelineItem;
  side: "left" | "right";
  progress: MotionValue<number>;
  activeAt: number;
}

// Smooth ease-in-out curve (close to expo.inOut) for natural activation
const easeInOutQuint = cubicBezier(0.83, 0, 0.17, 1);
const easeOutExpo = cubicBezier(0.16, 1, 0.3, 1);

export function TimelineCard({ item, side, progress, activeAt }: TimelineCardProps) {
  const reduce = useReducedMotion();
  // Enter from the OPPOSITE side and settle into final position
  const dir = side === "left" ? 1 : -1;
  // Widen the activation window slightly so the transition feels less abrupt
  const window = 0.11;
  const start = Math.max(0, activeAt - window);
  const end = Math.min(1, activeAt + window * 0.85);

  // Multi-stop ranges + custom easing produce a smooth, organic reveal
  // that ramps in gently as the S-curve approaches, then settles softly.
  const opacity = useTransform(
    progress,
    [start, activeAt - window * 0.2, activeAt + window * 0.3, end],
    [reduce ? 1 : 0, reduce ? 1 : 0.6, 1, 1],
    { ease: [easeOutExpo, easeOutExpo, easeOutExpo] }
  );
  const x = useTransform(progress, [start, end], [reduce ? 0 : 64 * dir, 0], {
    ease: easeOutExpo,
  });
  const y = useTransform(progress, [start, end], [reduce ? 0 : 20, 0], {
    ease: easeOutExpo,
  });
  const scale = useTransform(progress, [start, end], [reduce ? 1 : 0.96, 1], {
    ease: easeInOutQuint,
  });

  return (
    <motion.article
      style={{ opacity, x, y, scale }}
      className="group relative rounded-2xl border border-border bg-card p-6 shadow-[0_1px_0_rgba(0,0,0,0.02),0_8px_24px_-12px_rgba(15,15,15,0.08)] transition-[border-color,box-shadow,transform] duration-500 hover:-translate-y-0.5 hover:border-accent-clay/40 hover:shadow-[0_2px_0_rgba(0,0,0,0.02),0_18px_40px_-18px_rgba(184,101,26,0.18)] sm:p-8"
    >
      <div className="flex items-baseline justify-between gap-4">
        <span className="font-mono text-xs tracking-[0.18em] text-accent-clay">
          {item.id}
        </span>
        <span className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
          {item.period}
        </span>
      </div>

      <h3 className="mt-4 font-serif text-2xl leading-tight tracking-tight text-foreground sm:text-[28px]">
        {item.title}
      </h3>
      <p className="mt-1.5 text-sm text-muted-foreground">{item.role}</p>

      <p className="mt-4 text-[15px] leading-relaxed text-foreground/75">
        {item.description}
      </p>

      {item.tags && item.tags.length > 0 && (
        <ul className="mt-5 flex flex-wrap gap-1.5">
          {item.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-border/80 bg-background px-2.5 py-1 text-[11px] font-medium tracking-wide text-foreground/70"
            >
              {tag}
            </li>
          ))}
        </ul>
      )}
    </motion.article>
  );
}
