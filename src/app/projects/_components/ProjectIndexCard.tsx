"use client";

import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { ease } from "@/lib/animations";

export type ProjectIndexCardData = {
  title: string;
  description: string;
  category: string;
  year: string;
  image: string;
  imageAlt: string;
  heightClass: string;
  href?: string;
};

type ProjectIndexCardProps = {
  project: ProjectIndexCardData;
  index: number;
};

export function ProjectIndexCard({ project, index }: ProjectIndexCardProps) {
  const isLinked = Boolean(project.href);

  return (
    <motion.article
      initial={{ opacity: 0, y: 42 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.85, delay: index * 0.08, ease: ease.out }}
      className="group relative"
    >
      <div className="bg-surface-muted relative overflow-hidden rounded-[var(--radius-ds-lg)]">
        <img
          src={project.image}
          alt={project.imageAlt}
          className={cn(
            "w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045]",
            project.heightClass,
          )}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(180deg,transparent_42%,rgba(6,6,20,0.74))] opacity-80 transition-opacity duration-500 group-hover:opacity-60"
        />
        <div
          aria-hidden="true"
          className="group-hover:ring-primary/55 absolute inset-0 rounded-[var(--radius-ds-lg)] ring-1 ring-white/10 transition-[box-shadow,ring-color] duration-500 group-hover:shadow-[0_0_0_1px_color-mix(in_oklab,var(--primary-violet)_42%,transparent)]"
        />
      </div>

      <div className="relative z-10 mx-4 -mt-24 bg-white p-5 text-black shadow-[0_10px_28px_rgba(0,0,0,0.28)] transition-transform duration-500 ease-out group-hover:-translate-y-2 sm:mx-6 sm:-mt-28 sm:p-6">
        <div className="mb-4 flex items-center justify-between gap-4 text-[0.68rem] font-semibold tracking-[0.18em] text-black/50 uppercase">
          <span>{project.category}</span>
          <span>{project.year}</span>
        </div>

        <h2 className="text-2xl leading-none font-bold tracking-[-0.01em] text-black uppercase sm:text-3xl">
          {project.title}
        </h2>

        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-black/60">
          {project.description}
        </p>

        {isLinked ? (
          <a
            href={project.href}
            className="hover:text-primary focus-visible:ring-ring focus-visible:ring-offset-background mt-6 inline-flex items-center gap-2 text-[0.68rem] font-bold tracking-[0.18em] text-black uppercase transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:outline-none"
          >
            View Project
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>
        ) : (
          <button
            type="button"
            disabled
            className="mt-6 inline-flex cursor-not-allowed items-center gap-2 text-[0.68rem] font-bold tracking-[0.18em] text-black/45 uppercase"
          >
            Coming soon
            <ArrowUpRight className="h-4 w-4" />
          </button>
        )}
      </div>
    </motion.article>
  );
}
