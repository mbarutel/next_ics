"use client";

import React, { useEffect, useState } from "react";
import { ConferenceType } from "@/lib/types";
import Image from "next/image";
import dayjs from "dayjs";
import Link from "next/link";

export default function NextConference(
  { conferences }: { conferences: ConferenceType[] },
) {
  const dateNow = new Date();
  const conference = conferences.find((conference) =>
    conference.date && conference.date.endDate > dateNow
  );

  if (!conference || !conference.date) {
    return null;
  }

  return (
    <section>
      <div className="section_container xl:!px-36">
        <div className="uppercase">
          <h2 className="text-center mb-2">
            Next Conference
          </h2>
          <div className="flex flex-wrap gap-x-2 justify-center">
            {conference.date.startDate < dateNow
              ? <ConferenceIsHappening />
              : <Timer date={conference.date.startDate} />}
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2">
          <div className="relative rounded-md overflow-hidden h-36 xl:order-1 xl:h-80 xl:mb-24">
            <Image
              src={conference.coverImage.src}
              alt={conference.coverImage.alt}
              fill
              className="object-cover"
            />
          </div>
          <ConferenceDetails {...conference} />
        </div>
      </div>
    </section>
  );
}

function ConferenceIsHappening() {
  return (
    <>
      <span>Conference is happening now</span>
    </>
  );
}

function Timer({ date }: { date: Date }) {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const target = new Date(date);
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
    }, 1000);
    return () => clearInterval(interval);
  }, [date]);

  return (
    <>
      <span className="text-xl lg:text-4xl font-bold">
        {days} Days
      </span>
      <span className="text-xl lg:text-4xl font-bold">
        {hours} Hours
      </span>
      <span className="text-xl lg:text-4xl font-bold">
        {minutes} Minutes
      </span>
      <span className="text-xl lg:text-4xl font-bold">
        {seconds} Seconds
      </span>
    </>
  );
}

function ConferenceDetails(conference: ConferenceType) {
  if (!conference.date) {
    throw new Error("Date cannot be undefined at this point");
  }

  return (
    <div className="bg-gradient-to-br gradient_secondary uppercase flex flex-col rounded-lg p-2 z-10 w-[95%] mx-auto -translate-y-5 xl:translate-y-0 xl:mt-24 xl:w-[120%]">
      <h3 className="conference_card_title text-gray-800 mt-3">{conference.title}</h3>
      <h4 className="conference_card_info flex flex-col text-gray-600 mt-3">
        <span>
          {dayjs(conference.date.startDate).format("DD-")}
          {dayjs(conference.date.endDate).format("DD MMM YY")}
        </span>
        <span className="leading-none">
          {conference.venue}
        </span>
      </h4>
      <div className="w-full flex gap-1 p-1 mt-3 xl:mt-auto">
        <Link
          href={`/conference/${conference.slug}`}
          className="grow py-2 text-center text-lg font-bold bg-black/90  hover:bg-gradient-to-b from-gray-400 to-gray-600 hover:text-black transition_config rounded-sm active:scale-95"
        >
          View Events
        </Link>
        {conference.formLink &&
          (
            <Link
              target="_blank"
              rel="noreferer"
              href={`/registration/${conference.slug}`}
              className="grow py-2 text-center text-lg font-bold bg-black/90 hover:bg-gradient-to-b from-gray-400 to-gray-600 hover:text-black transition_config rounded-sm active:scale-95"
            >
              Registration
            </Link>
          )}
      </div>
    </div>
  );
}
