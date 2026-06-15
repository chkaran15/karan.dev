"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Mail, MessageCircle, ArrowUpRight } from "lucide-react";

function useLocalTime() {
  const [t, setT] = useState("");
  useEffect(() => {
    const update = () =>
      setT(
        new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }),
      );
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);
  return t;
}

const links = [
  { label: "Home", href: "#home" },
  { label: "Work", href: "#works" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#footer" },
];

const socials = [
  { label: "Email", href: "mailto:contact@example.com", Icon: Mail },
  // { label: "LinkedIn", href: "#", Icon: Linkedin },
  { label: "WhatsApp", href: "#", Icon: MessageCircle },
  // { label: "GitHub", href: "#", Icon: Github },
];

export function Footer() {
  const time = useLocalTime();
  return (
    <footer
      id="footer"
      className="border-border bg-background relative overflow-hidden border-t"
    >
      <div className="mx-auto max-w-[1600px] px-6 pt-24 md:px-10 md:pt-32">
        <div className="grid gap-16 md:grid-cols-[1.4fr_1fr_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-primary text-xs tracking-[0.3em] uppercase">
              ✺ Let&apos;s build something
            </div>
            <h2 className="font-display mt-6 text-5xl leading-[0.95] tracking-tight md:text-7xl">
              Got a project in <span className="text-accent italic">mind?</span>
            </h2>
            <a
              href="mailto:contact@example.com"
              className="font-display hover:text-accent mt-8 inline-flex items-center gap-3 text-2xl transition-colors md:text-3xl"
            >
              contact@example.com
              <ArrowUpRight className="text-accent h-6 w-6 transition-transform duration-300 hover:translate-x-1 hover:-translate-y-1" />
            </a>
          </motion.div>

          <div>
            <div className="text-muted-foreground mb-6 text-xs tracking-[0.3em] uppercase">
              Navigation
            </div>
            <ul className="space-y-3">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="group hover:text-accent inline-flex items-center gap-2 text-lg transition-colors"
                  >
                    <span className="bg-border group-hover:bg-accent inline-block h-px w-4 transition-all duration-300 group-hover:w-8" />
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-muted-foreground mb-6 text-xs tracking-[0.3em] uppercase">
              Socials
            </div>
            <ul className="space-y-3">
              {socials.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="group hover:text-accent inline-flex items-center gap-3 text-lg transition-colors"
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                    <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-border text-muted-foreground mt-20 flex flex-wrap items-center justify-between gap-4 border-t py-6 font-mono text-[10px] tracking-[0.25em] uppercase">
          <span className="flex items-center gap-2">
            <span className="live-dot bg-primary inline-block h-1.5 w-1.5 rounded-full shadow-[0_0_14px_var(--glow)]" />
            Local Time — {time}
          </span>
          <span className="text-accent">v.2.5.0</span>
          <span>2025 © Edition</span>
        </div>
      </div>

      <div aria-hidden className="px-2 pb-8 select-none md:pb-12">
        <h3 className="font-display text-foreground/95 text-[28vw] leading-[0.8] tracking-[-0.04em]">
          Karan
          <span className="text-primary text-[10vw]">✺</span>
        </h3>

      </div>
    </footer>
  );
}
