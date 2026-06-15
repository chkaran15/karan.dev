"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

type Theme = "dark" | "light";
type ThemeTransitionOrigin = { x: number; y: number };
type ThemeTransitionOptions = { origin?: ThemeTransitionOrigin };

type ViewTransitionDocument = Document & {
  startViewTransition?: (updateCallback: () => void) => {
    ready: Promise<void>;
    finished: Promise<void>;
  };
};

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: (options?: ThemeTransitionOptions) => void;
  setTheme: (theme: Theme, options?: ThemeTransitionOptions) => void;
}

const STORAGE_KEY = "karan-theme";
const ThemeContext = createContext<ThemeContextValue | null>(null);

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.style.colorScheme = theme;
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getTransitionOrigin(origin?: ThemeTransitionOrigin) {
  return {
    x: origin?.x ?? window.innerWidth / 2,
    y: origin?.y ?? 0,
  };
}

function getMaxRadius({ x, y }: ThemeTransitionOrigin) {
  return Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y),
  );
}

function readInitialTheme(): Theme {
  if (typeof document === "undefined") return "dark";

  const current = document.documentElement.dataset.theme;
  return current === "light" ? "light" : "dark";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(readInitialTheme);
  const transitionInFlight = useRef(false);

  const commitTheme = useCallback((nextTheme: Theme) => {
    applyTheme(nextTheme);
    setThemeState(nextTheme);
    try {
      window.localStorage.setItem(STORAGE_KEY, nextTheme);
    } catch {
      // Theme still applies for the current session if storage is unavailable.
    }
  }, []);

  const setTheme = useCallback(
    (nextTheme: Theme, options?: ThemeTransitionOptions) => {
      if (nextTheme === theme || transitionInFlight.current) return;

      const transitionDocument = document as ViewTransitionDocument;

      if (!transitionDocument.startViewTransition || prefersReducedMotion()) {
        commitTheme(nextTheme);
        return;
      }

      const origin = getTransitionOrigin(options?.origin);
      const radius = getMaxRadius(origin);

      transitionInFlight.current = true;
      document.documentElement.classList.add("theme-transitioning");

      const transition = transitionDocument.startViewTransition(() => {
        commitTheme(nextTheme);
      });

      void transition.ready
        .then(() =>
          document.documentElement.animate(
            {
              clipPath: [
                `circle(0px at ${origin.x}px ${origin.y}px)`,
                `circle(${radius}px at ${origin.x}px ${origin.y}px)`,
              ],
            },
            {
              duration: 720,
              easing: "cubic-bezier(0.65, 0, 0.35, 1)",
              pseudoElement: "::view-transition-new(root)",
            },
          ),
        )
        .catch(() => {
          commitTheme(nextTheme);
        });

      void transition.finished.finally(() => {
        transitionInFlight.current = false;
        document.documentElement.classList.remove("theme-transitioning");
      });
    },
    [commitTheme, theme],
  );

  const toggleTheme = useCallback(
    (options?: ThemeTransitionOptions) => {
      setTheme(theme === "dark" ? "light" : "dark", options);
    },
    [setTheme, theme],
  );

  useEffect(() => {
    let stored: string | null = null;

    try {
      stored = window.localStorage.getItem(STORAGE_KEY);
    } catch {
      stored = null;
    }

    const nextTheme = stored === "light" ? "light" : "dark";

    setThemeState(nextTheme);
    applyTheme(nextTheme);
  }, []);

  const value = useMemo(
    () => ({
      theme,
      toggleTheme,
      setTheme,
    }),
    [setTheme, theme, toggleTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }

  return context;
}
