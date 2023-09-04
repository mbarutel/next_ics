"use client";
import React, { useCallback } from "react";
import ConferenceCard from "./ConferenceCard";
import useEmblaCarousel from "embla-carousel-react";
import { ConferencePage } from "@/contentful/types/types";
import { BsChevronDoubleLeft, BsChevronDoubleRight } from "react-icons/bs";
import Link from "next/link";

type ConferenceCardsProps = {
  conferences: ConferencePage[];
};

export default function ConferenceCards({ conferences }: ConferenceCardsProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel();

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
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex gap-1 sm:gap-2">
          {conferences.map((conference) => (
            <div
              className="flex-grow flex-shrink-0 w-[49.5%] sm:w-[32.7%]"
              key={conference.slug}
            >
              <ConferenceCard conferencePage={conference} />
            </div>
          ))}
        </div>
        <div className="flex gap-4 sm:gap-8 justify-center my-4 sm:my-7">
          <button
            onClick={scrollPrev}
            className="effects text-stone-500 text-lg sm:text-3xl"
          >
            <BsChevronDoubleLeft />
          </button>
          <Link
            href="/conferences"
            className="btn effects bg-stone-600 text-white/90"
          >
            More Conferences
          </Link>
          <button
            onClick={scrollNext}
            className="effects text-stone-500 text-lg sm:text-3xl"
          >
            <BsChevronDoubleRight />
          </button>
        </div>
      </div>
    </div>
  );
}
