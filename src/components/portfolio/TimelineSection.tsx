import { CurvedTimeline } from "@/components/timeline/CurvedTimeline";
import { timelineItems } from "@/data/timeline";

export function TimelineSection() {
  return (
    <section
      id="timeline"
      className="bg-background relative px-5 py-24 sm:px-8 sm:py-32 lg:py-40"
    >
      <div className="mx-auto">
        <header className="mb-16 sm:mb-24">
          <span className="text-primary font-mono text-xs tracking-[0.22em] uppercase">
            The Path
          </span>
          <h2 className="text-foreground mt-4 font-serif text-4xl leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
            A timeline of work,
            <br />
            woven together.
          </h2>
          <p className="text-muted-foreground mt-6 max-w-xl text-base leading-relaxed sm:text-lg">
            A curated sequence of teams, products, and ideas — each shaping the
            craft, every chapter drawing the line that follows.
          </p>
        </header>

        <CurvedTimeline items={timelineItems} />
      </div>
    </section>
  );
}
