import "./globals.css";

import type { Metadata, Viewport } from "next";

import GridPattern from "@/components/magicui/grid-pattern";
import PostHogPageview, { PHProvider } from "@/components/posthog-provider";
import { StaffToolbar } from "@/components/staff-toolbar";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { siteConfig } from "@/config/site";
import { geistVariable } from "@/lib/fonts";
import { Suspense } from "react";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "black" },
    { media: "(prefers-color-scheme: light)", color: "white" },
  ],
  colorScheme: "dark light",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Next.js",
    "React",
    "Shadcn",
    "Radix UI",
    "Tailwind CSS",
    "Server Components",
    "Server Actions",
    siteConfig.name,
    "Anime",
    "Watch Anime",
    "Anime Streaming Site",
  ],
  authors: [
    {
      name: "gneiru",
      url: "https://github.com/gneiru",
    },
  ],
  creator: "gneiru",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    creator: "@gneiru",
  },
  icons: {
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" className={geistVariable} suppressHydrationWarning>
        <head />
        <body className="min-h-screen bg-background font-sans antialiased">
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <PHProvider>{children}</PHProvider>
            <TailwindIndicator />
          </ThemeProvider>
          <Toaster />
          <Suspense>
            <PostHogPageview />
          </Suspense>
          <Suspense>
            <StaffToolbar />
          </Suspense>
          <GridPattern
            width={40}
            height={40}
            x={-1}
            y={-1}
            className={
              "-z-10 stroke-gray-300/30 [mask-image:linear-gradient(to_bottom_left,white,transparent,transparent)]"
            }
          />
        </body>
      </html>
    </>
  );
}
