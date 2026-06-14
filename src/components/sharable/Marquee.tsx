export function Marquee({
  text = "FULL-STACK DEVELOPER",
  alt = "UI & UX DESIGNER.",
  slow = false,
}: {
  text?: string;
  alt?: string;
  slow?: boolean;
}) {
  const items = Array.from({ length: 6 });
  return (
    <div className="relative overflow-hidden border-y border-border py-8 md:py-12">
      <div className={slow ? "marquee-track-slow" : "marquee-track"}>
        {[0, 1].map((dup) => (
          <div key={dup} className="flex shrink-0 items-center gap-12 pr-12">
            {items.map((_, i) => (
              <span
                key={i}
                className="flex shrink-0 items-center gap-12 font-display text-5xl tracking-tight md:text-8xl"
              >
                {text}
                <span className="text-accent">✺</span>
                <span className="italic text-muted-foreground">{alt}</span>
                <span className="text-accent">✺</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
