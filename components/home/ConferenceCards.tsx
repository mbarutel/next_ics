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
    <div className="flex flex-col items-center mb-6">
      <h3 className="text-[1.2rem] sm:text-2xl text-yellow-400 font-semibold mb-2 sm:mb-5">
        2023
      </h3>
      <div className="flex">
        <button
          onClick={scrollPrev}
          className="effects text-stone-500 text-lg sm:text-4xl"
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
          className="effects text-stone-500 text-lg sm:text-4xl"
        >
          <BsChevronRight />
        </button>
      </div>
      <Link
        href="/conferences"
        className="btn effects bg-stone-600 text-white/90 mt-2 sm:mt-6"
      >
        More Conferences
      </Link>
    </div>
  );
}
