// components/site/ComingSoon.tsx
"use client";

import { motion } from "motion/react";
import { CalendarDays, Sparkles } from "lucide-react";
import { AnimatedButton } from "../animate/AnimateButton";

type ComingSoonProps = {
  title?: string;
  description?: string;
  badge?: string;
  showBackButton?: boolean;
  contactHref?: string;
};

export function ComingSoon({
  title = "Coming Soon",
  description = "We are preparing something beautiful for you. This page will be available soon.",
  badge = "Maya Devi Resort",
  showBackButton = true,
  contactHref = "tel:+9779847062177",
}: ComingSoonProps) {
  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden px-4 py-24">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,color-mix(in_oklab,var(--primary-violet)_34%,transparent)_0%,transparent_35%),radial-gradient(circle_at_bottom_right,color-mix(in_oklab,var(--premium)_30%,transparent)_0%,transparent_30%)] opacity-70 dark:opacity-45" />

      {/* Grid texture */}
      <div className="absolute inset-0 bg-[linear-gradient(color-mix(in_oklab,var(--foreground)_8%,transparent)_1px,transparent_1px),linear-gradient(90deg,color-mix(in_oklab,var(--foreground)_8%,transparent)_1px,transparent_1px)] bg-[size:48px_48px] opacity-35 dark:opacity-20" />

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10 mx-auto max-w-3xl text-center"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="border-border bg-card/70 mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border shadow-[0_10px_30px_-18px_var(--premium-glow)] backdrop-blur-md"
        >
          <Sparkles className="text-accent h-7 w-7" />
        </motion.div>

        <div className="border-border bg-card/70 text-muted-foreground mb-5 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm backdrop-blur-md">
          <CalendarDays className="text-accent h-4 w-4" />
          {badge}
        </div>

        <h1 className="text-foreground text-5xl font-semibold tracking-tight md:text-7xl">
          {title}
        </h1>

        <p className="text-muted-foreground mx-auto mt-6 max-w-xl text-base leading-7 md:text-lg">
          {description}
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <AnimatedButton href={contactHref}>Contact Now</AnimatedButton>

          {showBackButton && (
            <AnimatedButton href="/" variant="outline">
              Back to Home
            </AnimatedButton>
          )}
        </div>
      </motion.div>
    </section>
  );
}
