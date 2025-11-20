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
    <header className="bg-stone-950 relative border-b border-yellow-400/10">
      <div className="section_container py-16 sm:py-20 md:py-24">
        <div className="max-w-5xl mx-auto">
          {/* Category */}
          <div className="mb-6">
            <span className="text-yellow-400/80 text-xs sm:text-sm font-medium uppercase tracking-wider">
              National Conference
            </span>
          </div>

          {/* Title */}
          <h1 className="font-bold leading-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-6 text-stone-100 tracking-tight">
            {title}
          </h1>

          {/* Subtitle */}
          <div className="flex items-center gap-3 text-sm sm:text-base text-stone-400 flex-wrap">
            <span>{subtitle.split('|')[0]?.trim()}</span>
            {subtitle.includes('|') && (
              <>
                <span className="hidden sm:inline text-yellow-400/40">•</span>
                <span>{subtitle.split('|')[1]?.trim()}</span>
              </>
            )}
          </div>
        </div>

        {/* Scroll indicator */}
        <Link
          href={anchor}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 text-stone-600 hover:text-yellow-400 transition-colors"
          aria-label="Scroll to event details"
        >
          <BsChevronDown className="text-xl" />
        </Link>
      </div>
    </header>
  );
}
