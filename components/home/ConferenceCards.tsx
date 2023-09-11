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
  const [emblaRef, emblaApi] = useEmblaCarousel({
    slidesToScroll: "auto",
    containScroll: "trimSnaps",
  });

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
      <div className="flex mb-6 lg:mb-12">
        <button
          onClick={scrollPrev}
          className="effects text-night text-lg sm:text-4xl hidden md:block"
        >
          <BsChevronLeft />
        </button>
        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex touch-pan-y">
            {conferences.map((conference) => (
              <div
                key={conference.slug}
                className="flex-grow-0 flex-shrink-0 w-1/2 lg:w-1/3 min-w-0 pl-2"
              >
                <ConferenceCard conferencePage={conference} />
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={scrollNext}
          className="effects text-night text-lg sm:text-4xl hidden md:block"
        >
          <BsChevronRight />
        </button>
      </div>
      <Link
        href="/conferences"
        className="btn"
      >
        Conferences
      </Link>
    </div>
  );
}
