"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";

type FloatingCTAProps = {
  conferenceSlug: string;
};

export default function FloatingCTA({ conferenceSlug }: FloatingCTAProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling down 300px
      if (window.scrollY > 300 && !isDismissed) {
        setIsVisible(true);
      } else if (window.scrollY <= 300) {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDismissed]);

  if (isDismissed) return null;

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
      }`}
    >
      <div className="relative bg-stone-900 border border-stone-700 rounded-sm shadow-2xl p-5 max-w-xs">
        <button
          onClick={() => setIsDismissed(true)}
          className="absolute -top-2 -right-2 bg-stone-800 text-stone-300 rounded-full p-1.5 hover:bg-stone-700 hover:text-white transition-colors"
          aria-label="Dismiss"
        >
          <IoClose className="text-base" />
        </button>
        <p className="text-stone-200 font-medium mb-3 text-sm">
          Ready to join us?
        </p>
        <Link
          href={`/forms/delegates?conference=${conferenceSlug}`}
          className="block w-full bg-yellow-400 hover:bg-yellow-300 text-stone-900 font-semibold py-3 px-4 rounded-sm transition-colors text-center text-xs uppercase tracking-wider"
        >
          Register Now
        </Link>
      </div>
    </div>
  );
}
