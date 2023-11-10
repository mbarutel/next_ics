"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";
import { EventType } from "@/contentful/types/types";
import { configs } from "@/lib/data";
import { useSectionInView } from "@/lib/hooks";

export default function EventHeader(
  { event }: { event: EventType },
) {
  const localizedFormat = require("dayjs/plugin/localizedFormat");
  const { ref } = useSectionInView("Banner");
  dayjs.extend(localizedFormat);

  return (
    <section ref={ref} id="banner" className="pt-16 pl-2 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 rounded-b-md overflow-hidden shadow-md">
        <div className="relative h-full bg-gradient-radial flex justify-center items-center">
          <div className="relative h-56 w-full sm:h-3/4 sm:w-1/2 hidden sm:block">
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
                style={{ fontFamily: "Abril Fatface" }}
                className="text-slate-700/90 text-xl lg:text-3xl text-center uppercase font-bold drop-shadow-md"
              >
                {event.title}
              </h1>
            </span>
            <span className="bg-orange-500 h-24 lg:h-32 flex items-center text-center text-lg lg:text-xl font-semibold">
              <span className="text-white w-fit mx-auto flex flex-col text-center drop-shadow-md">
                {dayjs(event.conference.startDate).format("DD ")}-{" "}
                {dayjs(event.conference.endDate).format("DD MMM, YYYY")}
              </span>
              <span className="text-slate-200 w-fit mx-auto drop-shadow-md">
                {event.conference.venue}
              </span>
            </span>
            <div className="mt-5 flex justify-center gap-4">
              <Link
                href={event.conference.registrationLink}
                target="_blank"
                rel="noreferrer"
                className="relative inline-flex w-fit group button_padding bg-orange-600 text-sm sm:text-base text-slate-200 transition-all active:scale-95 overflow-hidden rounded-md"
              >
                <span className="z-10 drop-shadow-md">
                  Register
                </span>
                <span className="absolute h-full w-0 left-0 bottom-0 group-hover:w-full bg-slate-800 transition-all ease-in-out z-0" />
              </Link>
              <Link
                href={configs.forms.submitPaper}
                target="_blank"
                rel="noreferrer"
                className="relative inline-flex w-fit group button_padding bg-slate-800 text-sm sm:text-base text-slate-200 transition-all active:scale-95 overflow-hidden rounded-md"
              >
                <span className="z-10 drop-shadow-md">
                  Submit a paper
                </span>
                <span className="absolute h-full w-0 left-0 bottom-0 group-hover:w-full bg-orange-600 transition-all ease-in-out z-0" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
