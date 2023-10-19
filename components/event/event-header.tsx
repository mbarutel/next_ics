import React from "react";
import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";
import { EventType } from "@/contentful/types/types";

export default function EventHeader(
  { event }: { event: EventType },
) {
  const localizedFormat = require("dayjs/plugin/localizedFormat");
  dayjs.extend(localizedFormat);

  return (
    <section className="pt-20">
      <div className="container grid grid-cols-1 sm:grid-cols-2">
        <div className="relative h-full bg-gradient-radial flex justify-center items-center">
          <div className="relative h-56 w-full sm:h-3/4 sm:w-1/2">
            <Image
              src={event.coverImage.src}
              alt="Event Cover Image"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-contain"
            />
          </div>
        </div>
        <div className="bg-slate-600 flex justify-center items-center py-5 sm:py-16">
          <div className="flex flex-col">
            <span className="bg-slate-100 h-24 lg:h-32 flex justify-center items-center px-8 lg:px-8">
              <h1
                style={{ fontFamily: "Passion One" }}
                className="text-slate-700/90 text-xl lg:text-3xl text-center uppercase font-bold drop-shadow-md"
              >
                {event.title}
              </h1>
            </span>
            <span
              style={{ fontFamily: "Passion One" }}
              className="bg-orange-500 h-24 lg:h-32 flex items-center text-center text-lg lg:text-2xl"
            >
              <span className="text-white w-fit mx-auto flex flex-col text-center drop-shadow-md">
                {dayjs(event.conference.startDate).format("DD ")}-{" "}
                {dayjs(event.conference.endDate).format("DD MMM, YYYY")}
              </span>
              <span className="text-slate-200 w-fit mx-auto drop-shadow-md">
                {event.conference.venue}
              </span>
            </span>
            <Link
              href={event.conference.registrationLink}
              target="_blank"
              rel="noreferrer"
              className="relative ml-auto inline-flex w-fit group button_padding bg-orange-500 text-sm sm:text-base text-slate-200 transition-all active:scale-95"
            >
              <span className="z-10 drop-shadow-md">
                Register
              </span>
              <span className="absolute h-full w-0 left-0 bottom-0 group-hover:w-full bg-slate-800 transition-all ease-in-out z-0" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
