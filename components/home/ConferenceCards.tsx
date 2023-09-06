"use client";
import React, { useCallback } from "react";
import ConferenceCard from "./ConferenceCard";
import useEmblaCarousel from "embla-carousel-react";
import { ConferencePage } from "@/contentful/types/types";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import Link from "next/link";

type ConferenceCardsProps = {
  conferences: ConferencePage[];
};

export default function ConferenceCards({ conferences }: ConferenceCardsProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-[1.2rem] sm:text-4xl text-chili font-bold mb-2 sm:mb-3">
        2023
      </h3>
      <div className="flex mb-12">
        <button
          onClick={scrollPrev}
          className="effects text-stone-500 text-lg sm:text-4xl hidden sm:block"
        >
          <BsChevronLeft />
        </button>
        <div ref={emblaRef} className="overflow-hidden px-4">
          <div className="flex">
            {conferences.map((conference) => (
              <div
                className="flex-grow flex-shrink-0 w-1/2 sm:w-1/3 mr-2"
                key={conference.slug}
              >
                <ConferenceCard conferencePage={conference} />
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={scrollNext}
          className="effects text-stone-500 text-lg sm:text-4xl hidden sm:block"
        >
          <BsChevronRight />
        </button>
      </div>
      <Link
        href="/conferences"
        className="px-4 py-2 bg-night text-lg rounded-md shadow-xl transition-all hover:-translate-y-[2px] focus:-translate-y-1 active:translate-y-1 text-indian uppercase font-mono border-solid border-2 border-regal"
      >
        More Conferences
      </Link>
    </div>
  );
}
