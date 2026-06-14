"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ArrowUpRight } from "lucide-react";

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
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled
          ? "backdrop-blur-xl bg-background/60 border-b border-border"
          : "bg-transparent"
          }`}
      >
        <nav className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-6 md:h-20 md:px-10">
          <a href="#home" className="flex items-center gap-2 font-display text-2xl tracking-tight">
            <span className="text-accent">✺</span>
            <span>Karan</span>
          </a>

          <ul className="hidden items-center gap-10 md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="group relative text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
                >
                  {l.label}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#footer"
            className="hidden items-center gap-2 rounded-full border border-border bg-secondary/40 px-5 py-2.5 text-xs uppercase tracking-[0.18em] transition-all hover:border-accent hover:bg-accent hover:text-accent-foreground md:inline-flex"
          >
            Contact <ArrowUpRight className="h-3.5 w-3.5" />
          </a>

          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="rounded-full border border-border p-2.5 md:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-background md:hidden"
          >
            <div className="flex h-full flex-col justify-between px-6 pb-12 pt-24">
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
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-muted-foreground">
                <span>Based in Earth</span>
                <span className="flex items-center gap-2">
                  <span className="live-dot inline-block h-1.5 w-1.5 rounded-full bg-accent" />
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
