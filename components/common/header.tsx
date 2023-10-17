"use client";

import React, { useEffect, useState } from "react";
import { ConferencesType } from "@/contentful/types/types";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";
import { configs } from "@/lib/data";

export default function Header(
  { conferences }: { conferences: ConferencesType[] },
) {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 8000, stopOnMouseEnter: true, stopOnInteraction: false }),
  ]);

  return (
    <header className="cursor-grab mx-auto max-w-[90rem]">
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex h-[25rem] sm:h-[35rem] lg:h-[60rem]">
          {conferences.map((conference) => (
            <div
              key={conference.slug}
              className="relative flex-grow flex-shrink-0 w-full"
            >
              <Image
                src={conference.coverImage.src}
                alt="Indigenous Health Conference Services"
                quality={100}
                fill
                className="object-cover z-0"
              />
              <div className="relative container h-full">
                <ConferenceInfo conference={conference} />
                <Countdown startDate={conference.startDate} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}

function ConferenceInfo({ conference }: { conference: ConferencesType }) {
  const localizedFormat = require("dayjs/plugin/localizedFormat");
  dayjs.extend(localizedFormat);

  return (
    <div className="z-10 text-white absolute top-1/2 -translate-y-1/2 lg:translate-y-0 left-4">
      <h1
        style={{ fontFamily: "Gabarito" }}
        className="uppercase text-xl sm:text-4xl sm:mb-4"
      >
        {conference.title}
      </h1>
      <span className="text-sm sm:text-base flex flex-col">
        <span>{conference.venue}</span>
        <span>
          {dayjs(conference.startDate).format("DD")} -{" "}
          {dayjs(conference.endDate).format("DD MMM, YYYY")}
        </span>
      </span>
      <span className="flex gap-1 sm:gap-3 mt-3 text-white">
        <Link
          href={conference.registrationLink}
          target="_blank"
          rel="noreferrer"
          className="relative inline-flex group button_padding bg-orange-500 text-sm sm:text-base transition-all active:scale-95"
        >
          <span className="z-10">
            Register
          </span>
          <span className="absolute h-full w-0 left-0 bottom-0 group-hover:w-full bg-slate-950 transition-all ease-in-out z-0" />
        </Link>
        <Link
          href={configs.forms.submitPaper}
          target="_blank"
          rel="noreferrer"
          className="relative inline-flex group button_padding bg-slate-800 text-sm sm:text-base transition-all active:scale-95"
        >
          <span className="z-10">
            Submit a paper
          </span>
          <span className="absolute h-full w-0 left-0 bottom-0 group-hover:w-full bg-orange-500 transition-all ease-in-out z-0" />
        </Link>
      </span>
    </div>
  );
}

function Countdown({ startDate }: { startDate: string }) {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [conferenceTime, setConferenceTime] = useState(false);

  useEffect(() => {
    const target = new Date(startDate);
    const interval = setInterval(() => {
      const now = new Date();
      const difference = target.getTime() - now.getTime();

      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      setDays(d);
      const h = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      setHours(h);
      const m = Math.floor(
        (difference % (1000 * 60 * 60)) / (1000 * 60),
      );
      setMinutes(m);
      const s = Math.floor(
        (difference % (1000 * 60)) / 1000,
      );
      setSeconds(s);

      if (d <= 0 && h <= 0 && m <= 0 && s <= 0) {
        setConferenceTime(true);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [startDate]);

  return (
    <div className="z-10 absolute bottom-0 right-0 flex text-white cursor-default">
      {conferenceTime
        ? (
          <span className="sm:px-8 sm:py-6 bg-slate-600 sm:text-2xl italic uppercase">
            Building a better future today
          </span>
        )
        : (
          <>
            <span className="flex flex-col button_padding bg-slate-600 border-solid border-r-[1px] border-stone-200/50 text-center">
              <span className="font-normal sm:font-semibold text-lg sm:text-xl">
                {days}
              </span>
              <span className="text-xs uppercase -mt-1 sm:mt-0">days</span>
            </span>
            <span className="flex flex-col button_padding bg-slate-600 border-solid border-r-[1px] border-stone-200/50 text-center">
              <span className="font-normal sm:font-semibold text-lg sm:text-xl">
                {hours}
              </span>
              <span className="text-xs uppercase -mt-1 sm:mt-0">hours</span>
            </span>
            <span className="flex flex-col button_padding bg-slate-600 border-solid border-r-[1px] border-stone-200/50 text-center">
              <span className="font-normal sm:font-semibold text-lg sm:text-xl">
                {minutes}
              </span>
              <span className="text-xs uppercase -mt-1 sm:mt-0">minutes</span>
            </span>
            <span className="flex flex-col button_padding bg-slate-600 text-center">
              <span className="font-normal sm:font-semibold text-lg sm:text-xl">
                {seconds}
              </span>
              <span className="text-xs uppercase -mt-1 sm:mt-0">seconds</span>
            </span>
          </>
        )}
    </div>
  );
}
