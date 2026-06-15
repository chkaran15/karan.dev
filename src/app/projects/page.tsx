import type { Metadata } from "next";
import {
  ProjectIndexCard,
  type ProjectIndexCardData,
} from "./_components/ProjectIndexCard";

export const metadata: Metadata = {
  title: "Projects | Karan Chaudhary",
  description:
    "A curated project index from Karan Chaudhary, spanning AI assistants, SaaS platforms, 3D visualization, and booking products.",
};

const projects: ProjectIndexCardData[] = [
  {
    title: "VexLogic AI",
    description:
      "AI assistant interface work shaped around fast prompts, structured answers, and a premium command experience.",
    category: "AI Assistant",
    year: "2025",
    image: "/projects/vexlogic-ai.svg",
    imageAlt:
      "Abstract violet and gold AI assistant interface preview for VexLogic AI.",
    heightClass: "h-[420px] sm:h-[520px] lg:h-[620px]",
  },
  {
    title: "VexLogic Business",
    description:
      "Business operating surface for teams that need sharp dashboards, clear workflows, and executive-grade product feel.",
    category: "Business Platform",
    year: "2025",
    image: "/projects/vexlogic-business.svg",
    imageAlt:
      "Layered light and dark business dashboard preview for VexLogic Business.",
    heightClass: "h-[380px] sm:h-[460px] lg:h-[520px]",
  },
  {
    title: "Comra",
    description:
      "Three-dimensional visualization system with precise spatial scenes, technical polish, and interactive product storytelling.",
    category: "3D Visualisation",
    year: "2024",
    image: "/projects/comra.svg",
    imageAlt:
      "Dark 3D visualization scene with luminous geometric forms for Comra.",
    heightClass: "h-[390px] sm:h-[500px] lg:h-[560px]",
  },
  {
    title: "Superhost",
    description:
      "Hospitality booking product focused on confident search, clear inventory, and a refined guest-to-host journey.",
    category: "Property Booking",
    year: "2024",
    image: "/projects/superhost.svg",
    imageAlt:
      "Refined booking platform composition with room panels and calendar blocks for Superhost.",
    heightClass: "h-[440px] sm:h-[560px] lg:h-[680px]",
  },
];

export default function ProjectsPage() {
  return (
    <main className="bg-background text-foreground relative overflow-hidden pt-28 md:pt-36">
      <section className="ds-container pt-10 pb-16 md:pb-24">
        <div className="border-border grid gap-8 border-b pb-12 md:grid-cols-[1.15fr_0.85fr] md:items-end">
          <div>
            <p className="text-primary mb-5 text-sm">✺ Project Index</p>
            <h1 className="font-display max-w-5xl text-6xl leading-[0.9] tracking-[-0.025em] md:text-8xl lg:text-9xl">
              Selected work, built with motion and product clarity.
            </h1>
          </div>
          <p className="text-muted-foreground max-w-md text-base leading-relaxed md:justify-self-end">
            A focused archive of interface systems, AI products, SaaS surfaces,
            and immersive web builds. Case studies are being prepared; current
            entries are safe preview states.
          </p>
        </div>
      </section>

      <section className="ds-container pb-28 md:pb-40">
        <div className="grid gap-x-7 gap-y-16 md:grid-cols-2 md:gap-y-20">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className={index % 2 === 1 ? "md:pt-20" : undefined}
            >
              <ProjectIndexCard project={project} index={index} />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
