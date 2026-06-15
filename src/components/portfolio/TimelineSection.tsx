import { CurvedTimeline } from "@/components/timeline/CurvedTimeline";
import { timelineItems } from "@/data/timeline";


export function TimelineSection() {
  return (
    <section
      id="timeline"
      className="relative bg-background px-5 py-24 sm:px-8 sm:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-6xl">
        <header className="mb-16 max-w-2xl sm:mb-24">
          <span className="font-mono text-xs uppercase tracking-[0.22em] text-accent-clay">
            The Path
          </span>
          <h2 className="mt-4 font-serif text-4xl leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl">
            A timeline of work,<br />
            woven together.
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            A curated sequence of teams, products, and ideas — each shaping the
            craft, every chapter drawing the line that follows.
          </p>
        </header>

        <CurvedTimeline items={timelineItems} />
      </div>
    </section>
  );
}
