"use client";

import dayjs from "dayjs";
import Image from "next/image";
import { AssetType, ConferenceType } from "@/lib/types";
import HeaderFormLinks from "./header-form-links";
import React, { useEffect, useState } from "react";
import SpinningBackground from "./spinning-header";

export default function ConferenceHeader(
  conference: ConferenceType,
) {
  return (
    <header>
      <div className="section_container">
        <div className="header_wrapper">
          <ConferenceInfo {...conference} />
          {conference.date &&
            <Countdown startDate={conference.date.startDate} />}
          <SpinningBackground />
        </div>
      </div>
    </header>
  );
}

function ConferenceInfo(conference: ConferenceType) {
  return (
    <div className="z-40 absolute top-1/2 -translate-y-1/2 left-4">
      <h1 className="uppercase font-extrabold header_sizes">
        {conference.title}
      </h1>
      <DateText date={conference.date} />
      <h2 className="header_subtext">
        {conference.venue}
      </h2>
      <HeaderFormLinks
        registration={conference.registrationLink}
        submitAPaper={conference.submitPaperLink}
      />
    </div>
  );
}

function DateText(
  { date }: { date: undefined | { startDate: Date; endDate: Date } },
) {
  const localizedFormat = require("dayjs/plugin/localizedFormat");
  dayjs.extend(localizedFormat);

  return (
    <h2 className="header_subtext">
      {date
        ? (
          <>
            {dayjs(date.startDate).format("DD")} -{" "}
            {dayjs(date.endDate).format("DD MMMM, YYYY")}
          </>
        )
        : (
          <>
            Date to be announced
          </>
        )}
    </h2>
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
    <div className="z-40 absolute bottom-0 left-0 flex text-white cursor-default">
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
