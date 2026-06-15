export interface TimelineItem {
  id: string;
  title: string;
  role: string;
  period: string;
  description: string;
  tags?: string[];
}

export const timelineItems: TimelineItem[] = [
  {
    id: "01",
    title: "TeChivation",
    role: "Full Stack Developer · Part-time",
    period: "May 2025 — Present",
    description:
      "Building and maintaining TeChivation's full web and SaaS ecosystem powering audio plugin licensing and management.",
    tags: ["Next.js", "SaaS", "Licensing"],
  },
  {
    id: "02",
    title: "VexLogic",
    role: "Full Stack Engineer · Part-time",
    period: "Jun 2025 — Present",
    description:
      "Developing an AI-powered SaaS platform with real-time collaboration, billing systems, and intelligent document management.",
    tags: ["AI SaaS", "Collaboration", "Billing"],
  },
  {
    id: "03",
    title: "Comra AI",
    role: "Full Stack Developer · Full-time",
    period: "Nov 2024 — Present",
    description:
      "Building immersive 3D virtual tour systems using React Three Fiber, Prisma and PostgreSQL for real estate and architecture.",
    tags: ["React Three Fiber", "Prisma", "PostgreSQL"],
  },
  {
    id: "04",
    title: "Northwind Studio",
    role: "Frontend Engineer · Contract",
    period: "Feb 2024 — Oct 2024",
    description:
      "Led the rebuild of a content-first marketing platform with a focus on motion design, accessibility, and editorial typography.",
    tags: ["React", "Motion", "Design Systems"],
  },
  {
    id: "05",
    title: "Atlas & Co.",
    role: "Product Engineer · Full-time",
    period: "Aug 2022 — Jan 2024",
    description:
      "Shipped end-to-end product features across web and mobile, partnering closely with design to ship polished, accessible interfaces.",
    tags: ["TypeScript", "Mobile", "Product"],
  },
  {
    id: "06",
    title: "Independent Practice",
    role: "Freelance Developer",
    period: "2020 — 2022",
    description:
      "Worked with founders and studios on brand sites, microsites, and early-stage MVPs across a range of industries.",
    tags: ["Freelance", "Brand", "MVP"],
  },
];
