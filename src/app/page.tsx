
import { getSession } from "@/server/better-auth/server";
import { api, HydrateClient } from "@/trpc/server";
import { About } from "@/components/portfolio/About";
import { Experience } from "@/components/portfolio/Experience";
import { FooterMarquee } from "@/components/layout/FooterMarquee";
import { Hero } from "@/components/portfolio/Hero";
import { Marquee } from "@/components/sharable/Marquee";
import { Services } from "@/components/portfolio/Services";
import { Works } from "@/components/portfolio/Works";
import { Stats } from "@/components/portfolio/Stats";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });
  const session = await getSession();

  console.log("Session:", hello);

  if (session) {
    void api.post.getLatest.prefetch();
  }

  return (
    <HydrateClient>
      <main className="relative">
        <Hero />
        <Marquee />
        <About />
        <Stats />
        <Services />
        <Works />
        <Experience />
        <FooterMarquee />
      </main>
    </HydrateClient >
  );
}
