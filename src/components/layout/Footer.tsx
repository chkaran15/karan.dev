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
        })
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
    <footer id="footer" className="relative overflow-hidden border-t border-border bg-background">
      <div className="mx-auto max-w-[1600px] px-6 pt-24 md:px-10 md:pt-32">
        <div className="grid gap-16 md:grid-cols-[1.4fr_1fr_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              ✺ Let's build something
            </div>
            <h2 className="mt-6 font-display text-5xl leading-[0.95] tracking-tight md:text-7xl">
              Got a project in <span className="italic text-accent">mind?</span>
            </h2>
            <a
              href="mailto:contact@example.com"
              className="mt-8 inline-flex items-center gap-3 font-display text-2xl md:text-3xl"
            >
              contact@example.com
              <ArrowUpRight className="h-6 w-6 text-accent transition-transform duration-300 hover:-translate-y-1 hover:translate-x-1" />
            </a>
          </motion.div>

          <div>
            <div className="mb-6 text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Navigation
            </div>
            <ul className="space-y-3">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="group inline-flex items-center gap-2 text-lg transition-colors hover:text-accent"
                  >
                    <span className="inline-block h-px w-4 bg-border transition-all duration-300 group-hover:w-8 group-hover:bg-accent" />
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="mb-6 text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Socials
            </div>
            <ul className="space-y-3">
              {socials.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="group inline-flex items-center gap-3 text-lg transition-colors hover:text-accent"
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

        <div className="mt-20 flex flex-wrap items-center justify-between gap-4 border-t border-border py-6 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          <span className="flex items-center gap-2">
            <span className="live-dot inline-block h-1.5 w-1.5 rounded-full bg-accent" />
            Local Time — {time}
          </span>
          <span>v.2.5.0</span>
          <span>2025 © Edition</span>
        </div>
      </div>

      <div aria-hidden className="select-none px-2 pb-8 md:pb-12">
        <h3 className="font-display text-[28vw] leading-[0.8] tracking-[-0.04em] text-foreground/95">
          Karan
        </h3>
      </div>
    </footer>
  );
}
