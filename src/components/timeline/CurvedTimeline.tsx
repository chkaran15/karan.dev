"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { TimelineCard } from "./TimelineCard";
import { PerfHUD } from "./PerfHUD";
import type { TimelineItem } from "@/data/timeline";

interface CurvedTimelineProps {
  items: TimelineItem[];
}

const ROW_HEIGHT = 380;
const VB_WIDTH = 1000;
const CARD_WINDOW = 0.08; // must match TimelineCard

export function CurvedTimeline({ items }: CurvedTimelineProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // Debug mode: append ?debug=1 (full debug) or ?perf=1 (perf only)
  const [debug, setDebug] = useState(false);
  const [perf, setPerf] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const d = params.get("debug");
    const p = params.get("perf");
    const debugOn = d === "1" || d === "timeline" || d === "true";
    setDebug(debugOn);
    setPerf(debugOn || p === "1" || p === "true");
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 70%"],
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [reduce ? 1 : 0, 1]);

  const vbHeight = items.length * ROW_HEIGHT;
  const cx = VB_WIDTH / 2;
  const amp = 240; // stronger S swing

  // Build continuous S-curves. Each segment swings to alternating side
  // using opposing cubic control points, producing a classic S shape.
  let d = `M ${cx} 0`;
  // Lead-in to first anchor
  const firstY = ROW_HEIGHT / 2;
  d += ` L ${cx} ${firstY - 60}`;
  for (let i = 0; i < items.length; i++) {
    const y = i * ROW_HEIGHT + ROW_HEIGHT / 2;
    const prevY = i === 0 ? firstY - 60 : (i - 1) * ROW_HEIGHT + ROW_HEIGHT / 2;
    const dir = i % 2 === 0 ? 1 : -1; // alternate swing direction per segment
    const span = y - prevY;
    // Two control points on opposite sides => S curve
    const c1x = cx + dir * amp;
    const c1y = prevY + span * 0.3;
    const c2x = cx - dir * amp;
    const c2y = prevY + span * 0.7;
    d += ` C ${c1x} ${c1y}, ${c2x} ${c2y}, ${cx} ${y}`;
  }
  d += ` L ${cx} ${vbHeight}`;

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-6xl">
      {/* SVG defs: brush texture */}
      <svg aria-hidden width="0" height="0" className="absolute">
        <defs>
          <filter id="brushFilter" x="-5%" y="-5%" width="110%" height="110%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.9"
              numOctaves="2"
              seed="4"
              result="noise"
            />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="3.5" />
          </filter>
          <linearGradient id="brushGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-accent-clay)" stopOpacity="0.95" />
            <stop offset="100%" stopColor="var(--color-accent-clay)" stopOpacity="0.75" />
          </linearGradient>
        </defs>
      </svg>

      {/* Desktop S-curved brush path */}
      <svg
        aria-hidden
        viewBox={`0 0 ${VB_WIDTH} ${vbHeight}`}
        preserveAspectRatio="none"
        className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-[min(100%,900px)] -translate-x-1/2 md:block"
      >
        <path
          d={d}
          fill="none"
          stroke="var(--color-border)"
          strokeWidth={2}
          strokeLinecap="round"
        />
        <motion.path
          d={d}
          fill="none"
          stroke="var(--color-accent-clay)"
          strokeOpacity={0.18}
          strokeWidth={24}
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#brushFilter)"
          style={{ pathLength }}
        />
        <motion.path
          d={d}
          fill="none"
          stroke="url(#brushGradient)"
          strokeWidth={12}
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#brushFilter)"
          style={{ pathLength }}
        />
        <motion.path
          d={d}
          fill="none"
          stroke="var(--color-accent-clay)"
          strokeOpacity={0.9}
          strokeWidth={4}
          strokeLinecap="round"
          style={{ pathLength }}
        />
      </svg>

      {/* Mobile brush stripe */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-5 top-0 h-full w-px bg-border md:hidden"
      />
      <motion.div
        aria-hidden
        style={{ scaleY: pathLength, transformOrigin: "top" }}
        className="pointer-events-none absolute left-[18px] top-0 h-full w-[6px] rounded-full bg-accent-clay/85 md:hidden"
      />

      <ol className="relative space-y-16 sm:space-y-20 md:space-y-0">
        {items.map((item, i) => {
          const side: "left" | "right" = i % 2 === 0 ? "right" : "left";
          const activeAt = (i + 0.5) / items.length;
          return (
            <li
              key={item.id}
              className="relative md:grid md:min-h-[var(--row)] md:grid-cols-[1fr_64px_1fr] md:items-center"
              style={{ ["--row" as string]: `${ROW_HEIGHT}px` }}
            >
              <div
                className={`pl-12 md:pl-0 ${side === "left"
                  ? "md:col-start-1 md:pr-10"
                  : "md:col-start-3 md:pl-10"
                  }`}
              >
                <TimelineCard
                  item={item}
                  side={side}
                  progress={scrollYProgress}
                  activeAt={activeAt}
                />
              </div>

              {debug && (
                <DebugRow
                  index={i}
                  side={side}
                  activeAt={activeAt}
                  progress={scrollYProgress}
                />
              )}
            </li>
          );
        })}
      </ol>

      {debug && <DebugHUD progress={scrollYProgress} items={items} />}
      {perf && <PerfHUD />}
    </div>
  );
}

/* ---------------- Debug overlays ---------------- */

function DebugRow({
  index,
  side,
  activeAt,
  progress,
}: {
  index: number;
  side: "left" | "right";
  activeAt: number;
  progress: MotionValue<number>;
}) {
  const start = Math.max(0, activeAt - CARD_WINDOW);
  const end = Math.min(1, activeAt + CARD_WINDOW);
  const localProgress = useTransform(progress, [start, end], [0, 1], {
    clamp: true,
  });
  const widthPct = useTransform(localProgress, (v) => `${Math.round(v * 100)}%`);
  const label = useTransform(
    localProgress,
    (v) => `#${index} (${side}) p=${v.toFixed(2)} active@${activeAt.toFixed(2)}`,
  );

  return (
    <div className="pointer-events-none absolute inset-x-0 top-1/2 z-20 -translate-y-1/2">
      {/* Center reference line */}
      <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 border-t border-dashed border-fuchsia-500/60" />
      {/* Activation range band */}
      <div className="absolute inset-x-0 top-1/2 h-10 -translate-y-1/2 border-y border-emerald-500/40 bg-emerald-500/5" />
      {/* Marker dot (debug only, since real dots removed) */}
      <span className="absolute left-1/2 top-1/2 z-10 hidden h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-500 ring-2 ring-white md:block" />
      {/* Mobile marker */}
      <span className="absolute left-[18px] top-1/2 z-10 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-500 ring-2 ring-white md:hidden" />
      {/* Per-card progress bar */}
      <div className="absolute left-2 right-2 top-1/2 mt-6 h-1 -translate-y-1/2 overflow-hidden rounded bg-black/10">
        <motion.div
          style={{ width: widthPct }}
          className="h-full bg-emerald-500"
        />
      </div>
      <motion.div className="absolute left-2 top-1/2 mt-8 -translate-y-1/2 rounded bg-black/80 px-1.5 py-0.5 font-mono text-[10px] text-white">
        {label}
      </motion.div>
    </div>
  );
}

function DebugHUD({
  progress,
  items,
}: {
  progress: MotionValue<number>;
  items: TimelineItem[];
}) {
  const [p, setP] = useState(0);
  useMotionValueEvent(progress, "change", (v) => setP(v));

  return (
    <div className="fixed bottom-4 right-4 z-50 w-72 rounded-lg border border-black/10 bg-white/95 p-3 font-mono text-[11px] text-black shadow-2xl backdrop-blur">
      <div className="mb-2 flex items-center justify-between">
        <strong className="text-fuchsia-600">TIMELINE DEBUG</strong>
        <span>{p.toFixed(3)}</span>
      </div>
      <div className="mb-2 h-1.5 overflow-hidden rounded bg-black/10">
        <div
          className="h-full bg-fuchsia-500 transition-[width] duration-75"
          style={{ width: `${p * 100}%` }}
        />
      </div>
      <ul className="space-y-1">
        {items.map((it, i) => {
          const at = (i + 0.5) / items.length;
          const start = Math.max(0, at - CARD_WINDOW);
          const end = Math.min(1, at + CARD_WINDOW);
          const local = Math.max(0, Math.min(1, (p - start) / (end - start)));
          const state =
            p < start ? "idle" : p > end ? "done" : "active";
          return (
            <li key={it.id} className="flex items-center gap-2">
              <span
                className={`inline-block h-1.5 w-1.5 rounded-full ${state === "active"
                  ? "bg-emerald-500"
                  : state === "done"
                    ? "bg-black/50"
                    : "bg-black/20"
                  }`}
              />
              <span className="w-6 text-black/60">#{i}</span>
              <span className="w-10">{at.toFixed(2)}</span>
              <span className="w-12">[{start.toFixed(2)}-{end.toFixed(2)}]</span>
              <span className="ml-auto tabular-nums">{local.toFixed(2)}</span>
            </li>
          );
        })}
      </ul>
      <p className="mt-2 text-[10px] text-black/50">
        Remove <code>?debug=1</code> from URL to hide.
      </p>
    </div>
  );
}
