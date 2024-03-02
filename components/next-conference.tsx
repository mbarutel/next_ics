"use client";

import React, { useEffect, useState } from "react";
import { ConferenceType } from "@/lib/types";
import Image from "next/image";
import dayjs from "dayjs";

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
      <div className="section_container">
        <div className="uppercase">
          <span>{conference.title}</span>
          <h2 className="text-center mb-2">
            Next Conference
          </h2>
          <div className="flex flex-wrap gap-x-2 justify-center">
            {conference.date.startDate < dateNow
              ? <ConferenceIsHappening />
              : <Timer date={conference.date.startDate} />}
          </div>
        </div>

        <div className="grid grid-cols-1">
          <div className="relative rounded-md overflow-hidden h-36">
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
    <div className="bg-yellow-400 uppercase rounded-lg w-[95%] mx-auto -translate-y-5">
      <h2>{conference.title}</h2>
      <h3>
        {
          <>
            {dayjs(conference.date.startDate).format("DD-")}
            {dayjs(conference.date.endDate).format("DD MMM YY")}
          </>
        }
      </h3>
    </div>
  );
}
