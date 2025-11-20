import React from "react";
import Link from "next/link";
import { BsChevronDown } from "react-icons/bs";
import Image from "next/image";

type EventHeaderProps = {
  title: string;
  subtitle: string;
  anchor: string;
};

export default function EventHeader({ title, subtitle, anchor }: EventHeaderProps) {
  return (
    <header className="relative overflow-hidden">
      <div className="header_wrapper">
        {/* Content - Full Width */}
        <div className="relative z-40 h-full flex items-center">
          <div className="section_container w-full">
            <div className="max-w-full w-full">
              {/* Category */}
              <div className="mb-4">
                <span className="text-yellow-400 text-xs sm:text-sm font-medium uppercase tracking-wider">
                  National Conference
                </span>
              </div>

              {/* Title */}
              <h1 className="arvo font-extrabold leading-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-4 text-white uppercase tracking-tight">
                {title}
              </h1>

              {/* Separator Line */}
              <hr className="h-1.5 w-full bg-yellow-400 rounded-sm my-4" />

              {/* Subtitle */}
              <div className="flex items-center gap-3 text-base sm:text-lg md:text-xl text-stone-200 flex-wrap leading-tight">
                <span className="font-medium">{subtitle.split('|')[0]?.trim()}</span>
                {subtitle.includes('|') && (
                  <>
                    <span className="hidden sm:inline text-yellow-400">•</span>
                    <span className="font-medium">{subtitle.split('|')[1]?.trim()}</span>
                  </>
                )}
              </div>

              {/* CTA Button */}
              <Link href={anchor} className="button_primary w-fit mt-8 inline-block">
                View Event Details
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <Link
          href={anchor}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 hover:text-yellow-400 transition-colors z-50"
          aria-label="Scroll to event details"
        >
          <BsChevronDown className="text-2xl animate-bounce" />
        </Link>
      </div>
    </header>
  );
}
