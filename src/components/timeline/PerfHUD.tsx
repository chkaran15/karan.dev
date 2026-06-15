"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Lightweight scroll FPS + animation cost monitor.
 * - Measures rAF frame intervals to derive FPS (avg/min over a 1s window).
 * - Tracks long frames (>16.7ms) while the user is actively scrolling.
 * - Uses PerformanceObserver('longtask') to surface main-thread blocks.
 *
 * Enable via ?perf=1 or ?debug=1. Auto-pauses when tab hidden.
 */
export function PerfHUD() {
  const [stats, setStats] = useState({
    fps: 0,
    minFps: 0,
    frame: 0,
    longFrames: 0,
    scrolling: false,
    longTasks: 0,
    longTaskMs: 0,
  });

  const rafRef = useRef<number | null>(null);
  const lastT = useRef<number>(performance.now());
  const frames = useRef<number[]>([]);
  const longFramesRef = useRef(0);
  const scrollingRef = useRef(false);
  const scrollTimer = useRef<number | null>(null);
  const longTaskCount = useRef(0);
  const longTaskMs = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      scrollingRef.current = true;
      if (scrollTimer.current) window.clearTimeout(scrollTimer.current);
      scrollTimer.current = window.setTimeout(() => {
        scrollingRef.current = false;
      }, 180);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    let po: PerformanceObserver | null = null;
    try {
      po = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          longTaskCount.current += 1;
          longTaskMs.current += entry.duration;
        }
      });
      po.observe({ entryTypes: ["longtask"] });
    } catch {
      // longtask not supported (Safari) — silently ignore
    }

    const tick = (t: number) => {
      const dt = t - lastT.current;
      lastT.current = t;
      if (dt > 0 && dt < 1000) {
        frames.current.push(dt);
        if (frames.current.length > 120) frames.current.shift();
        if (scrollingRef.current && dt > 16.7) longFramesRef.current += 1;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    const flush = window.setInterval(() => {
      const arr = frames.current;
      if (arr.length === 0) return;
      const avg = arr.reduce((a, b) => a + b, 0) / arr.length;
      const max = Math.max(...arr);
      setStats({
        fps: Math.round(1000 / avg),
        minFps: Math.round(1000 / max),
        frame: Math.round(avg * 10) / 10,
        longFrames: longFramesRef.current,
        scrolling: scrollingRef.current,
        longTasks: longTaskCount.current,
        longTaskMs: Math.round(longTaskMs.current),
      });
    }, 250);

    const onVis = () => {
      if (document.hidden && rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      } else if (!document.hidden && rafRef.current === null) {
        lastT.current = performance.now();
        rafRef.current = requestAnimationFrame(tick);
      }
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVis);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (scrollTimer.current) window.clearTimeout(scrollTimer.current);
      window.clearInterval(flush);
      po?.disconnect();
    };
  }, []);

  const fpsColor =
    stats.fps >= 55 ? "text-emerald-500" : stats.fps >= 40 ? "text-amber-500" : "text-rose-500";

  return (
    <div className="fixed bottom-4 left-4 z-50 w-60 rounded-lg border border-black/10 bg-white/95 p-3 font-mono text-[11px] text-black shadow-2xl backdrop-blur">
      <div className="mb-2 flex items-center justify-between">
        <strong className="text-sky-600">PERF</strong>
        <span className={stats.scrolling ? "text-emerald-600" : "text-black/40"}>
          {stats.scrolling ? "● scrolling" : "○ idle"}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-y-1">
        <span className="text-black/60">FPS</span>
        <span className={`text-right tabular-nums ${fpsColor}`}>{stats.fps}</span>
        <span className="text-black/60">min FPS</span>
        <span className="text-right tabular-nums">{stats.minFps}</span>
        <span className="text-black/60">frame</span>
        <span className="text-right tabular-nums">{stats.frame} ms</span>
        <span className="text-black/60">jank frames</span>
        <span className="text-right tabular-nums">{stats.longFrames}</span>
        <span className="text-black/60">long tasks</span>
        <span className="text-right tabular-nums">
          {stats.longTasks} · {stats.longTaskMs}ms
        </span>
      </div>
      <p className="mt-2 text-[10px] text-black/50">
        Remove <code>?perf=1</code> to hide.
      </p>
    </div>
  );
}
