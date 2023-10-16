import React from "react";
import { EventPageType } from "@/contentful/types/types";
import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";

export default function EventHeader(
  { event }: { event: EventPageType },
) {
  const localizedFormat = require("dayjs/plugin/localizedFormat");
  dayjs.extend(localizedFormat);

  return (
    <section className="pt-20">
      <div className="container grid grid-cols-2 h-[25rem] sm:h-[35rem] lg:h-[60rem]">
        <div className="relative h-full">
          <Image
            src={event.coverImage.src}
            alt="Event Cover Image"
            fill
            className="object-contain"
          />
        </div>
        <div className="bg-slate-600 flex justify-center items-center">
          <div className="flex flex-col">
            <span className="bg-slate-100 h-32 flex justify-center items-center px-8">
              <h1
                style={{ fontFamily: "Passion One" }}
                className="text-slate-700/90 text-3xl uppercase font-bold"
              >
                {event.title}
              </h1>
            </span>
            <span
              style={{ fontFamily: "Passion One" }}
              className="bg-orange-500 h-32 flex items-center text-2xl"
            >
              <span className="text-white w-fit mx-auto flex flex-col text-center">
                {dayjs(event.conference?.startDate).format("DD ")}-{" "}
                {dayjs(event.conference?.endDate).format("DD MMM, YYYY")}
              </span>
              <span className="text-slate-200 w-fit mx-auto">
                {event.conference?.venue}
              </span>
            </span>
            <Link
              href={event.conference?.registrationLink}
              target="_blank"
              rel="noreferrer"
              className="relative ml-auto inline-flex w-fit group button_padding bg-orange-500 text-sm sm:text-base text-slate-200 transition-all active:scale-95"
            >
              <span className="z-10">
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
