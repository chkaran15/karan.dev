"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatedButton } from "../animate/AnimateButton";
import { ease } from "@/lib/animations";
import { ThemeToggle } from "../theme/ThemeToggle";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Articles", href: "/articles" },
  { label: "Profile", href: "/profile" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: ease.expo, delay: 0.2 }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,box-shadow,backdrop-filter] duration-500",
          scrolled
            ? "border-border bg-background/80 shadow-[0_1px_0_var(--border)] backdrop-blur-2xl"
            : "bg-background/20 border-transparent backdrop-blur-md",
        )}
      >
        <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-6 md:h-20 md:px-10">
          <Link
            href="/"
            className="font-display flex items-center gap-2 text-2xl tracking-tight"
          >
            <span className="text-primary">✺</span>
            <span>Karan</span>
          </Link>

          <nav className="hidden items-center gap-9 md:flex">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  data-active={active}
                  className={cn(
                    "link-underline text-sm transition-colors",
                    active
                      ? "text-primary"
                      : "text-muted-foreground hover:text-primary",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

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
              className="border-border bg-background/70 hover:border-primary/60 hover:text-primary focus-visible:ring-ring focus-visible:ring-offset-background rounded-full border p-2.5 backdrop-blur-xl transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "circle(0% at 90% 6%)" }}
            animate={{ clipPath: "circle(150% at 90% 6%)" }}
            exit={{ clipPath: "circle(0% at 90% 6%)" }}
            transition={{ duration: 0.7, ease: ease.inOut }}
            className="fixed inset-0 z-60 bg-black text-white md:hidden dark:bg-white dark:text-black"
          >
            <div className="flex items-center justify-between px-5 py-5">
              <Link
                href="/"
                className="font-display flex items-center gap-2 text-2xl tracking-tight"
              >
                <span className="text-primary">✺</span>
                <span>Karan</span>
              </Link>

              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/30 dark:border-black/20"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <motion.nav
              initial="hidden"
              animate="show"
              variants={{
                show: {
                  transition: { staggerChildren: 0.08, delayChildren: 0.15 },
                },
              }}
              className="flex flex-col gap-2 px-5 pt-10"
            >
              {NAV_LINKS.map((link) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  variants={{
                    hidden: { y: 40, opacity: 0 },
                    show: {
                      y: 0,
                      opacity: 1,
                      transition: { duration: 0.6, ease: ease.expo },
                    },
                  }}
                  className="font-display hover:text-premium-light border-b border-white/15 py-4 text-4xl font-medium tracking-tight transition-colors dark:border-black/15"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.div
                variants={{
                  hidden: { y: 20, opacity: 0 },
                  show: {
                    y: 0,
                    opacity: 1,
                    transition: { duration: 0.6, ease: ease.expo },
                  },
                }}
                className="pt-10"
              >
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="hover:bg-premium-light dark:hover:bg-premium-light inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-medium text-black transition-[background-color,color,transform] duration-300 hover:-translate-y-0.5 hover:text-black dark:bg-black dark:text-white dark:hover:text-black"
                >
                  Let&apos;s talk
                </Link>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
