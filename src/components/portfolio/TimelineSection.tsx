import { CurvedTimeline } from "@/components/timeline/CurvedTimeline";
import { timelineItems } from "@/data/timeline";

export function TimelineSection() {
  return (
    <section id="timeline" className="mx-auto max-w-[1600px] px-6 py-32 md:px-10 md:py-48">
      <div className="mb-16 flex flex-col gap-4">
        <div className="text-primary text-xs tracking-[0.3em] uppercase">
          ✺ Experience
        </div>
        <h2 className="font-display max-w-2xl text-5xl tracking-tight md:text-7xl">
          Explore my <span className="text-accent italic">journey</span> and the
          technologies that define my craft.
        </h2>
      </div>

      <CurvedTimeline items={timelineItems} />
    </section>
  );
}
