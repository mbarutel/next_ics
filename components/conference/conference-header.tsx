"use client";

import { ConferenceType } from "@/lib/types";
import HeaderFormLinks from "../shared/header-form-links";
import React, { useEffect, useState } from "react";
import SpinningBackground from "../shared/spinning-header";
import HeaderDate from "../shared/header-date";

export default function ConferenceHeader(conference: ConferenceType) {
  return (
    <header>
      <div className="section_container">
        <div className="header_wrapper">
          <ConferenceInfo {...conference} />
          {conference.date && (
            <Countdown startDate={conference.date.startDate} />
          )}
          <SpinningBackground />
        </div>
      </div>
    </header>
  );
}

function ConferenceInfo(conference: ConferenceType) {
  return (
    <div className="z-40 absolute top-1/2 -translate-y-1/2 left-4">
      <h1 className="uppercase font-extrabold header_sizes mb-2">
        {conference.title}
      </h1>
      <HeaderDate date={conference.date} />
      <h2 className="header_subtext -mt-3">{conference.venue}</h2>
      <HeaderFormLinks
        registration={conference.formLink}
        submitAPaper={conference.submitPaperLink}
      />
    </div>
  );
}

function Countdown({ startDate }: { startDate: Date }) {
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
      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      setMinutes(m);
      const s = Math.floor((difference % (1000 * 60)) / 1000);
      setSeconds(s);

      if (d <= 0 && h <= 0 && m <= 0 && s <= 0) {
        setConferenceTime(true);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [startDate]);

  return (
    <div className="z-40 absolute bottom-0 left-0 flex text-white cursor-default rounded-bl-md rounded-tr-md overflow-hidden">
      {conferenceTime ? null : (
        <>
          <span className="flex flex-col countdown_padding bg-zinc-900 border-solid border-r-[1px] border-stone-200/50 text-center">
            <span className="font-normal sm:font-semibold text-lg sm:text-xl">
              {days}
            </span>
            <span className="text-xs uppercase -mt-1 sm:mt-0">days</span>
          </span>
          <span className="flex flex-col countdown_padding bg-zinc-900 border-solid border-r-[1px] border-stone-200/50 text-center">
            <span className="font-normal sm:font-semibold text-lg sm:text-xl">
              {hours}
            </span>
            <span className="text-xs uppercase -mt-1 sm:mt-0">hours</span>
          </span>
          <span className="flex flex-col countdown_padding bg-zinc-900 border-solid border-r-[1px] border-stone-200/50 text-center">
            <span className="font-normal sm:font-semibold text-lg sm:text-xl">
              {minutes}
            </span>
            <span className="text-xs uppercase -mt-1 sm:mt-0">minutes</span>
          </span>
          <span className="flex flex-col countdown_padding bg-zinc-900 text-center">
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
