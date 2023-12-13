import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { draftMode } from "next/headers";
import { Toaster } from "react-hot-toast";
import {
  ExitDraftModeLink,
  Footer,
  GoogleAnalytics,
} from "@/components";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "400", "700", "900"],
});

export const metadata: Metadata = {
  title: "Indigenous Conference Services",
  description: "Conferences Services Provider Australia",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="!scroll-smooth no-scrollbar">
      <body className={inter.className}>
        {draftMode().isEnabled && (
          <p className="py-4 px-[6vw] z-[999]">
            Draft mode is on! <ExitDraftModeLink className="underline" />
          </p>
        )}
        {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS
          ? <GoogleAnalytics ga_id={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
          : null}
        <main className="relative">
          {children}
          <Footer />
          <Toaster position="top-right" />
        </main>
      </body>
    </html>
  );
}
