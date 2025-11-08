import { Arvo, Inter, Space_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { draftMode } from "next/headers";
import type { Metadata } from "next";
import {
  ExitDraftModeLink,
  GoogleAnalytics,
  Footer,
  Navbar,
} from "@/components";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["100", "400", "700", "900"],
});

const arvo = Arvo({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-arvo",
  weight: ["400", "700"],
});

const space_mono = Space_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space_mono",
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Indigenous Conference Services",
  description: "Conferences Services Provider Australia",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isEnabled } = await draftMode();

  return (
    <html lang="en" className="!scroll-smooth no-scrollbar">
      <body
        className={`${inter.variable} ${space_mono.variable} ${arvo.variable}`}
      >
        {isEnabled && (
          <p className="py-4 px-[6vw] z-[999]">
            Draft mode is on! <ExitDraftModeLink className="underline" />
          </p>
        )}
        {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ? (
          <GoogleAnalytics ga_id={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
        ) : null}
        <main className="relative">
          <Navbar />
          {children}
          <Footer />
          <Toaster position="top-right" />
        </main>
      </body>
    </html>
  );
}
