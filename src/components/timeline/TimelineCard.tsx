"use client";
import {
  motion,
  useTransform,
  useReducedMotion,
  cubicBezier,
  type MotionValue,
} from "motion/react";
import type { TimelineItem } from "@/data/timeline";

interface TimelineCardProps {
  item: TimelineItem;
  side: "left" | "right";
  progress: MotionValue<number>;
  activeAt: number;
}

export const TIMELINE_CARD_REVEAL_WINDOW = 0.12;

const easeOutExpo = cubicBezier(0.16, 1, 0.3, 1);
const easeOutQuint = cubicBezier(0.22, 1, 0.36, 1);

export function TimelineCard({
  item,
  side,
  progress,
  activeAt,
}: TimelineCardProps) {
  const reduce = useReducedMotion();

  // Enter from the curve side, then settle into the card column.
  const dir = side === "left" ? 1 : -1;
  const revealWindow = TIMELINE_CARD_REVEAL_WINDOW;
  const start = Math.max(0, activeAt - revealWindow);
  const focus = activeAt - revealWindow * 0.18;
  const end = Math.min(1, activeAt + revealWindow * 0.86);
  const revealClip =
    side === "left"
      ? "inset(0% 0% 0% 18% round 1rem)"
      : "inset(0% 18% 0% 0% round 1rem)";

  const opacity = useTransform(
    progress,
    [start, focus, activeAt + revealWindow * 0.28, end],
    [reduce ? 1 : 0.08, reduce ? 1 : 0.62, 1, 1],
    { ease: [easeOutExpo, easeOutExpo, easeOutExpo] },
  );
  const x = useTransform(progress, [start, end], [reduce ? 0 : 46 * dir, 0], {
    ease: easeOutExpo,
  });
  const y = useTransform(progress, [start, end], [reduce ? 0 : 18, 0], {
    ease: easeOutExpo,
  });
  const scale = useTransform(progress, [start, end], [reduce ? 1 : 0.975, 1], {
    ease: easeOutQuint,
  });
  const clipPath = useTransform(
    progress,
    [start, focus, end],
    [
      reduce ? "inset(0% 0% 0% 0% round 1rem)" : revealClip,
      "inset(0% 0% 0% 0% round 1rem)",
      "inset(0% 0% 0% 0% round 1rem)",
    ],
    { ease: [easeOutExpo, easeOutQuint] },
  );
  const filter = useTransform(
    progress,
    [start, focus, end],
    [
      reduce ? "blur(0px) saturate(1)" : "blur(10px) saturate(0.84)",
      reduce ? "blur(0px) saturate(1)" : "blur(2px) saturate(0.96)",
      "blur(0px) saturate(1)",
    ],
    { ease: [easeOutExpo, easeOutQuint] },
  );
  const accentOpacity = useTransform(
    progress,
    [start, focus, end],
    [reduce ? 0 : 0, reduce ? 0 : 0.42, 0],
    { ease: [easeOutExpo, easeOutQuint] },
  );

  return (
    <motion.article
      style={{ opacity, x, y, scale, clipPath, filter }}
      className="group border-border bg-card hover:border-premium/50 relative overflow-hidden rounded-2xl border p-6 shadow-[0_1px_0_rgba(0,0,0,0.02)] transition-[border-color,box-shadow,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:shadow-[0_8px_8px_-8px_var(--premium-glow)] sm:p-8"
    >
      <motion.div
        aria-hidden
        style={{ opacity: accentOpacity }}
        className={`pointer-events-none absolute inset-y-0 w-20 bg-[radial-gradient(circle_at_center,var(--premium-glow),transparent_68%)] blur-xl ${
          side === "left" ? "-right-8" : "-left-8"
        }`}
      />

      <div className="relative flex items-baseline justify-between gap-4">
        <span className="text-primary font-mono text-xs tracking-[0.18em]">
          {item.id}
        </span>
        <span className="text-muted-foreground text-xs tracking-[0.14em] uppercase">
          {item.period}
        </span>
      </div>

      <h3 className="text-foreground relative mt-4 font-serif text-2xl leading-tight tracking-tight sm:text-[28px]">
        {item.title}
      </h3>
      <p className="text-muted-foreground relative mt-1.5 text-sm">
        {item.role}
      </p>

      <p className="text-foreground/75 relative mt-4 text-[15px] leading-relaxed">
        {item.description}
      </p>

      {item.tags && item.tags.length > 0 && (
        <ul className="relative mt-5 flex flex-wrap gap-1.5">
          {item.tags.map((tag) => (
            <li
              key={tag}
              className="border-premium/35 bg-premium/10 text-accent rounded-full border px-2.5 py-1 text-[11px] font-medium tracking-wide"
            >
              {tag}
            </li>
          ))}
        </ul>
      )}
    </motion.article>
  );
}
