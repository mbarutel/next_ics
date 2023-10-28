import "./globals.css";
import type { Metadata } from "next";
import { Lato } from "next/font/google";
import { draftMode } from "next/headers";
import { Toaster } from "react-hot-toast";
import { ExitDraftModeLink, Footer, Navbar } from "@/components";

const lato = Lato({
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
      <body className={`${lato.className} bg-indian/70`}>
        {draftMode().isEnabled && (
          <p className="bg-elden/80 py-4 px-[6vw] z-[999]">
            Draft mode is on! <ExitDraftModeLink className="underline" />
          </p>
        )}
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
