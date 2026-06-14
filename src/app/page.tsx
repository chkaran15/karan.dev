
import { getSession } from "@/server/better-auth/server";
import { api, HydrateClient } from "@/trpc/server";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { About } from "@/components/portfolio/About";
import { Experience } from "@/components/portfolio/Experience";
import { FooterMarquee } from "@/components/layout/FooterMarquee";
import { Hero } from "@/components/portfolio/Hero";
import { Marquee } from "@/components/sharable/Marquee";
import { Navbar } from "@/components/layout/Navbar";
import { Services } from "@/components/portfolio/Services";
import { Works } from "@/components/portfolio/Works";
import { Footer } from "react-day-picker";
import { Stats } from "@/components/portfolio/Stats";
import { SmoothScroll } from "@/components/layout/SmoothScroll";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });
  const session = await getSession();

  console.log("Session:", hello);

  if (session) {
    void api.post.getLatest.prefetch();
  }

  return (
    <HydrateClient>
      <main>
        <SiteLayout>
          <SmoothScroll>
            <main className="relative">
              <Navbar />
              <Hero />
              <Marquee />
              <About />
              <Stats />
              <Services />
              <Works />
              <Experience />
              <FooterMarquee />
              <Footer />
            </main>
          </SmoothScroll>
        </SiteLayout>
      </main>
    </HydrateClient>
  );
}
