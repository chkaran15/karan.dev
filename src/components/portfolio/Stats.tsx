"use client";

import { animate, useInView, useMotionValue, useTransform } from "motion/react";
import { useEffect, useRef } from "react";

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => `${Math.round(v)}${suffix}`);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, to, { duration: 2, ease: [0.22, 1, 0.36, 1] });
    return () => controls.stop();
  }, [inView, mv, to]);

  useEffect(() => {
    return rounded.on("change", (v) => {
      if (ref.current) ref.current.textContent = v;
    });
  }, [rounded]);

  return <span ref={ref}>0{suffix}</span>;
}

export function Stats() {
  return (
    <section className="border-border mx-auto max-w-[1600px] border-t px-6 py-24 md:px-10 md:py-32">
      <div className="grid gap-12 md:grid-cols-3">
        <div>
          <div className="font-display text-primary text-7xl tracking-tight md:text-9xl">
            <Counter to={3} />
            <span className="text-accent">+</span>
          </div>
          <div className="text-muted-foreground mt-4 text-sm tracking-[0.25em] uppercase">
            Years of Experience
          </div>
        </div>
        <div>
          <div className="font-display text-primary text-7xl tracking-tight md:text-9xl">
            <Counter to={40} />
            <span className="text-accent">+</span>
          </div>
          <div className="text-muted-foreground mt-4 text-sm tracking-[0.25em] uppercase">
            Projects Completed
          </div>
        </div>
        <div className="flex items-end">
          <p className="text-muted-foreground max-w-xs text-sm leading-relaxed">
            A blend of craft, code and care — shipped with engineering precision
            and a designer&apos;s eye for the smallest detail.
          </p>
        </div>
      </div>
    </section>
  );
}
