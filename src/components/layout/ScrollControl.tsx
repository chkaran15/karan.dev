"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { ArrowUp } from "lucide-react";

/** Top scroll-progress bar + floating back-to-top control. */
export function ScrollControls() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.4,
  });
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.div
        style={{ scaleX }}
        className="accent-gradient fixed inset-x-0 top-0 z-70 h-0.75 origin-left shadow-[0_0_16px_var(--glow)]"
      />
      <AnimatePresence>
        {show && (
          <motion.button
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.3 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            className="border-border bg-background/80 hover:border-premium/70 hover:text-primary-foreground fixed right-6 bottom-6 z-70 flex h-14 w-14 items-center justify-center rounded-full border shadow-[0_10px_30px_-12px_var(--glow)] backdrop-blur-xl transition-colors hover:bg-[color-mix(in_oklab,var(--primary)_76%,var(--premium))]"
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
