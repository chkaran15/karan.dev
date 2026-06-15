"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { AnimatedButton } from "../animate/AnimateButton";
import { ThemeToggle } from "../theme/ThemeToggle";

const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Works", href: "#works" },
  { label: "Contact", href: "#footer" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-background/60 border-border border-b backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-6 md:h-20 md:px-10">
          <Link
            href="/"
            className="font-display flex items-center gap-2 text-2xl tracking-tight"
          >
            <span className="text-accent">✺</span>
            <span>Karan</span>
          </Link>

          <ul className="hidden items-center gap-10 md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="group text-muted-foreground hover:text-foreground relative text-xs tracking-[0.2em] uppercase transition-colors"
                >
                  {l.label}
                  <span className="bg-accent absolute -bottom-1 left-0 h-px w-0 transition-all duration-300 group-hover:w-full" />
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-3 md:flex">
            <ThemeToggle />
            <AnimatedButton href="/contact" variant="outline">
              Let&apos;s talk
            </AnimatedButton>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              type="button"
              aria-label="Toggle menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="border-border bg-background/70 hover:border-accent/50 focus-visible:ring-ring focus-visible:ring-offset-background rounded-full border p-2.5 backdrop-blur-xl transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-background fixed inset-0 z-40 md:hidden"
          >
            <div className="flex h-full flex-col justify-between px-6 pt-24 pb-12">
              <ul className="flex flex-col gap-6">
                {links.map((l, i) => (
                  <motion.li
                    key={l.href}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.05 * i, duration: 0.4 }}
                  >
                    <a
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="font-display text-5xl tracking-tight"
                    >
                      {l.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
              <div className="text-muted-foreground flex items-center justify-between gap-4 text-xs tracking-[0.2em] uppercase">
                <span>Based in Earth</span>
                <span className="flex items-center gap-2">
                  <span className="live-dot bg-accent inline-block h-1.5 w-1.5 rounded-full" />
                  Available
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
