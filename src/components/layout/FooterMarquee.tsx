const phrases = [
  "Handcrafted Digital Solutions",
  "Driven by Passion, Built with Code",
  "Custom Web Experiences",
  "Innovative Self-Made Creations",
  "Tailored Web Development for You",
];

export function FooterMarquee() {
  return (
    <section className="overflow-hidden border-y border-border py-10 md:py-16">
      <div className="marquee-track-slow">
        {[0, 1].map((dup) => (
          <div key={dup} className="flex shrink-0 items-center gap-10 pr-10">
            {phrases.map((p, i) => (
              <span
                key={i}
                className="flex shrink-0 items-center gap-10 font-display text-4xl tracking-tight md:text-7xl"
              >
                <span className="italic text-muted-foreground">{p}</span>
                <span className="text-accent">✺</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
