import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { MagneticButton } from "./MagneticButton";
import { cn } from "@/lib/utils";

interface AnimatedButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "solid" | "outline";
  withArrow?: boolean;
  className?: string;
}

/**
 * Pill CTA with a magnetic pull and a sliding fill on hover. Built on
 * MagneticButton + design tokens only.
 */
export function AnimatedButton({
  children,
  href,
  onClick,
  variant = "solid",
  withArrow = true,
  className,
}: AnimatedButtonProps) {
  return (
    <MagneticButton
      as={href ? "a" : "button"}
      href={href}
      onClick={onClick}
      strength={0.35}
      className={cn(
        "group relative overflow-hidden rounded-full px-7 py-3.5 text-sm font-medium tracking-tight shadow-[0_0_0_1px_color-mix(in_oklab,var(--primary)_18%,transparent)] transition-colors duration-300",
        variant === "solid"
          ? "bg-primary text-primary-foreground hover:text-secondary-foreground hover:shadow-[0_0_24px_-10px_var(--glow)]"
          : "border-primary/40 text-foreground hover:border-premium hover:text-accent-foreground border",
        className,
      )}
    >
      <span
        className={cn(
          "absolute inset-0 z-0 translate-y-full rounded-full transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:translate-y-0",
          variant === "solid"
            ? "bg-primary-violet"
            : "bg-[color-mix(in_oklab,var(--primary)_72%,var(--premium))]",
        )}
      />
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {withArrow && (
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        )}
      </span>
    </MagneticButton>
  );
}
