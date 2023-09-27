"use client";
import React, { useCallback, useEffect, useState } from "react";
import ConferenceCard from "./ConferenceCard";
import useEmblaCarousel from "embla-carousel-react";
import { ConferencePage } from "@/contentful/types/types";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import Link from "next/link";

type ConferenceCardsProps = {
  conferences: ConferencePage[];
};

export default function ConferenceCards({ conferences }: ConferenceCardsProps) {
  const [emblaRef] = useEmblaCarousel({
    slidesToScroll: "auto",
    containScroll: "trimSnaps",
  });
  // const [emblaRef, emblaApi] = useEmblaCarousel({
  //   slidesToScroll: "auto",
  //   containScroll: "trimSnaps",
  // });

  // const scrollPrev = useCallback(() => {
  //   if (emblaApi) emblaApi.scrollPrev();
  // }, [emblaApi]);
  //
  // const scrollNext = useCallback(() => {
  //   if (emblaApi) emblaApi.scrollNext();
  // }, [emblaApi]);

  return (
    <div>
      <h3 className="font-bold mb-2 sm:mb-3 text-center uppercase">
        2023 Conferences
      </h3>
      <div className="relative">
        <div
          ref={emblaRef}
          className="overflow-hidden cursor-grab"
        >
          <div className="flex touch-pan-y -ml-[1rem]">
            {conferences.map((conference) => (
              <div
                key={conference.slug}
                className="flex-grow-0 flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 pl-[1rem]"
              >
                <ConferenceCard conferencePage={conference} />
              </div>
            ))}
          </div>
        </div>
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

// <button
//   onClick={scrollPrev}
//   className="effects text-night text-lg sm:text-4xl hidden sm:block"
// >
//   <BsChevronLeft />
// </button>
//
// <button
//   onClick={scrollNext}
//   className="effects text-night text-lg sm:text-4xl hidden sm:block"
// >
//   <BsChevronRight />
// </button>
//
