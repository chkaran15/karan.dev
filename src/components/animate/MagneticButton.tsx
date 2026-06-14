"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
    children: ReactNode;
    className?: string;
    strength?: number;
    as?: "button" | "a" | "div";
    href?: string;
    onClick?: () => void;
    ariaLabel?: string;
}

/**
 * Wraps content in a magnetic hover effect — the element drifts toward the
 * cursor and springs back on leave. Falls back gracefully (no motion) for
 * touch / reduced-motion since pointer events simply won't fire.
 */
export function MagneticButton({
    children,
    className,
    strength = 0.4,
    as = "div",
    href,
    onClick,
    ariaLabel,
}: MagneticButtonProps) {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const sx = useSpring(x, { stiffness: 180, damping: 15, mass: 0.4 });
    const sy = useSpring(y, { stiffness: 180, damping: 15, mass: 0.4 });

    const handleMove = (e: React.MouseEvent) => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const relX = e.clientX - (rect.left + rect.width / 2);
        const relY = e.clientY - (rect.top + rect.height / 2);
        x.set(relX * strength);
        y.set(relY * strength);
    };

    const reset = () => {
        x.set(0);
        y.set(0);
    };

    const Comp = motion[as] as React.ElementType;

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMove}
            onMouseLeave={reset}
            style={{ x: sx, y: sy }}
            className="inline-flex"
        >
            <Comp
                {...(href ? { href } : {})}
                onClick={onClick}
                aria-label={ariaLabel}
                className={cn("inline-flex items-center justify-center", className)}
            >
                {children}
            </Comp>
        </motion.div>
    );
}