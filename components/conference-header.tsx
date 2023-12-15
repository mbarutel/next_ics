"use client";
import React, { useEffect, useState } from "react";
import { ConferenceType } from "@/lib/types";
import Link from "next/link";
import dayjs from "dayjs";
import { configs } from "@/lib/data";
import SpinningBackground from "./spinning-header";

export default function ConferenceHeader(
  conference: ConferenceType,
) {
  return (
    <header>
      <div className="container">
        <div className="header_height relative">
          <ConferenceInfo {...conference} />
          {conference.date &&
            <Countdown startDate={conference.date.startDate} />}
          <SpinningBackground />
          <FormLinks
            registration={conference.registrationLink}
            submitAPaper={conference.submitPaperLink}
          />
        </div>
      </div>
    </header>
  );
}

function FormLinks(
  { registration, submitAPaper }: {
    registration: string;
    submitAPaper: string | undefined;
  },
) {
  return (
    <div className="absolute bottom-0 right-2 flex gap-2 text-white z-40">
      <Link
        href={registration}
        target="_blank"
        rel="noreferrer"
        className="relative inline-flex group button_padding bg-zinc-900 text-base font-medium transition-all active:scale-95 rounded-sm overflow-hidden text-white hover:text-black"
      >
        <span className="z-10">
          Register
        </span>
        <span className="absolute h-full w-0 left-0 bottom-0 group-hover:w-full bg-gradient-to-r gradient transition_config z-0" />
      </Link>
      {submitAPaper &&
        (
          <Link
            href={configs.forms.submitPaper}
            target="_blank"
            rel="noreferrer"
            className="relative inline-flex group button_padding bg-gradient-to-r gradient text-sm sm:text-base transition_config active:scale-95 rounded-sm overflow-hidden text-black hover:text-white"
          >
            <span className="z-10">
              Submit a paper
            </span>
            <span className="absolute h-full w-0 left-0 bottom-0 group-hover:w-full bg-zinc-900 transition_config z-0" />
          </Link>
        )}
    </div>
  );
}

function ConferenceInfo(conference: ConferenceType) {
  return (
    <div className="z-40 absolute top-1/2 -translate-y-1/2 left-4">
      <div className="md:max-w-[75%]">
        <h1 className="uppercase font-extrabold header_sizes">
          {conference.title}
        </h1>
        <DateText date={conference.date} />
        <br />
        <span className="header_subtext">
          {conference.venue}
        </span>
      </div>
    </div>
  );
}

function DateText(
  { date }: { date: undefined | { startDate: Date; endDate: Date } },
) {
  const localizedFormat = require("dayjs/plugin/localizedFormat");
  dayjs.extend(localizedFormat);

  return (
    <span className="header_subtext">
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
    </span>
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
