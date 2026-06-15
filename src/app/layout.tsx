import "@/styles/globals.css";
import { type Metadata } from "next";

import { TRPCReactProvider } from "@/trpc/react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ThemeProvider } from "@/components/theme/ThemeProvider";

export const metadata: Metadata = {
  title: "Karan Chaudhary",
  description:
    "Portfolio of Karan Chaudhary, a software engineer and designer specializing in web development, UI/UX design, and interactive experiences.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const themeScript = `
  (function() {
    try {
      var theme = window.localStorage.getItem("karan-theme") || "dark";
      var root = document.documentElement;
      root.dataset.theme = theme;
      root.classList.toggle("dark", theme === "dark");
      root.style.colorScheme = theme;
    } catch (_) {
      document.documentElement.dataset.theme = "dark";
      document.documentElement.classList.add("dark");
      document.documentElement.style.colorScheme = "dark";
    }
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="dark" className="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <ThemeProvider>
          <TRPCReactProvider>
            <SiteLayout>{children}</SiteLayout>
          </TRPCReactProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
