import React from "react";
import Link from "next/link";
import { BsChevronDown } from "react-icons/bs";

type EventHeaderProps = {
  title: string;
  subtitle: string;
  anchor: string;
};

export default function EventHeader({ title, subtitle, anchor }: EventHeaderProps) {
  return (
    <header className="bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-400 relative">
      <div className="section_container py-12 sm:py-16 md:py-20 text-stone-900">
        <div className="max-w-4xl mx-auto text-center">
          {/* Breadcrumb / Category */}
          <div className="mb-3">
            <span className="inline-block bg-stone-900/10 backdrop-blur-sm px-3 py-1 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wide">
              National Conference
            </span>
          </div>

          {/* Title */}
          <h1 className="font-extrabold leading-tight text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-4 drop-shadow-sm">
            {title}
          </h1>

          {/* Subtitle with enhanced styling */}
          <div className="flex items-center justify-center gap-2 text-sm sm:text-base md:text-lg flex-wrap">
            <span className="flex items-center gap-2">
              <span className="text-lg">📅</span>
              <span className="font-semibold">{subtitle.split('|')[0]?.trim()}</span>
            </span>
            {subtitle.includes('|') && (
              <>
                <span className="hidden sm:inline">•</span>
                <span className="flex items-center gap-2">
                  <span className="text-lg">📍</span>
                  <span className="font-semibold">{subtitle.split('|')[1]?.trim()}</span>
                </span>
              </>
            )}
          </div>

          {/* Value proposition / Quick highlights */}
          <div className="mt-6 flex flex-wrap gap-3 sm:gap-4 justify-center text-xs sm:text-sm">
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-2 rounded-md">
              <span>🎤</span>
              <span className="font-medium">Expert Speakers</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-2 rounded-md">
              <span>🤝</span>
              <span className="font-medium">Networking</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-2 rounded-md">
              <span>📜</span>
              <span className="font-medium">CPD Certified</span>
            </div>
          </div>
        </div>

        {/* Scroll indicator - minimal and subtle */}
        <Link
          href={anchor}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 text-stone-900/40 hover:text-stone-900/70 transition-colors"
          aria-label="Scroll to event details"
        >
          <BsChevronDown className="text-2xl animate-bounce" />
        </Link>
      </div>
    </header>
  );
}
