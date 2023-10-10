"use client";

import React from "react";
import ConferenceCard from "./ConferenceCard";
import useEmblaCarousel from "embla-carousel-react";
import { ConferencePage } from "@/contentful/types/types";
import { DotButton, useDotButton } from "./CarousalDotButton";
import Link from "next/link";

type ConferenceCardsProps = {
  conferences: ConferencePage[];
};

export default function ConferenceCards({ conferences }: ConferenceCardsProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    // slidesToScroll: "auto",
    containScroll: "trimSnaps",
  });

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(
    emblaApi,
  );

            // <h3 className="-mt-4 tracking-tight text-lg md:text-xl uppercase text-stone-500 text-center sm:text-left mb-4 lg:mb-6">

  return (
    <div>
      <h3 className="font-bold text-center uppercase sm:text-xl lg:text-2xl text-stone-500 -mt-4 mb-4 lg:mb-6">
        2023 Conferences
      </h3>
      <div className="relative">
        <div
          ref={emblaRef}
          className="overflow-hidden cursor-grab"
        >
          <div className="flex touch-pan-y -ml-[1rem]">
            {conferences.map((conference, index) => (
              <div
                key={conference.slug}
                className="flex-grow-0 flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 pl-[1rem]"
              >
                <ConferenceCard
                  conferencePage={conference}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center mt-2">
        {scrollSnaps.map((_, index) => (
          <DotButton
            key={index}
            onClick={() => onDotButtonClick(index)}
            className={`touch-manipulation inline-flex cursor-pointer border-none p-0 mx-1 w-6 h-2 rounded-full transition-all ${
              index === selectedIndex
                ? "bg-red-800"
                : "bg-stone-900/60 hover:bg-red-300"
            }`}
          />
        ))}
      </div>
      <div className="flex items-center mt-6">
        <Link
          href="/conferences"
          className="group relative inline-flex border border-red-800/80 focus:outline-none w-auto mx-auto rounded-md"
        >
          <span className="w-full inline-flex items-center justify-center self-stretch px-4 py-2 text-sm text-white text-center font-bold uppercase bg-red-800/90 ring-1 ring-red-800/80 ring-offset-1 ring-offset-red-800/80 transform transition-transform group-hover:translate-y-1 group-hover:translate-x-1 group-focus:translate-y-1 group-focus:translate-x-1 group-active:translate-y-0 group-active:translate-x-0 rounded-md">
            See Conferences
          </span>
        </Link>
      </div>
    </div>
  );
}
