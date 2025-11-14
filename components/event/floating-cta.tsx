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
      <div className="relative bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-lg shadow-2xl p-4 max-w-xs">
        <button
          onClick={() => setIsDismissed(true)}
          className="absolute -top-2 -right-2 bg-stone-900 text-white rounded-full p-1 hover:bg-stone-800 transition-colors"
          aria-label="Dismiss"
        >
          <IoClose className="text-xl" />
        </button>
        <p className="text-stone-900 font-bold mb-3 text-sm">
          Ready to join us?
        </p>
        <Link
          href={`/forms/delegates?conference=${conferenceSlug}`}
          className="block w-full bg-stone-900 hover:bg-stone-800 text-yellow-400 font-bold py-2 px-4 rounded-md transition-all duration-200 text-center text-sm shadow-md hover:shadow-lg transform hover:scale-105"
        >
          Register Now
        </Link>
      </div>
    </div>
  );
}
