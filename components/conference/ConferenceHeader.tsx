"use client";
import React from "react";
import { ConferencePage } from "@/contentful/types/types";
import Countdown from "./Countdown";
import Image from "next/image";
import dayjs from "dayjs";
import Link from "next/link";
import { configs } from "@/lib/data";
// import Link from "next/link";

type ConferenceHeaderProps = {
  conferencePage: ConferencePage;
};
export default function ConferenceHeader(
  { conferencePage }: ConferenceHeaderProps,
) {
  const localizedFormat = require("dayjs/plugin/localizedFormat");
  dayjs.extend(localizedFormat);

  return (
    <header className="flex flex-col items-center">
      <Image
        src={conferencePage.coverImage.src}
        alt={conferencePage.coverImage.alt}
        width={conferencePage.coverImage.width}
        height={conferencePage.coverImage.height}
        quality="90"
        priority={true}
        className="w-screen h-[20rem] sm:h-[400px] md:h-[500px] object-cover"
      />
      <div className="container relative -translate-y-20 sm:-translate-y-28 sm:!items-start">
        <div className="bg-yellow-400 p-6 sm:p-10 rounded-xl shadow-lg">
          <h1 className="text-lg font-semibold uppercase text-stone-700">
            {conferencePage.title}
          </h1>
          <div className="text-stone-700/80 flex flex-col mt-2">
            <span>
              🗓️&nbsp;
              {dayjs(conferencePage.startDate).format("DD")} -{" "}
              {dayjs(conferencePage.endDate).format("DD MMMM, YYYY")}
            </span>
            <span>
              📍&nbsp;
              {conferencePage.venueName}
            </span>
            <Countdown startDate={conferencePage.startDate} />
          </div>
          <div className="flex gap-4 justify-center sm:justify-start font-semibold">
            <Link
              href={configs.forms.registration}
              target="_blank"
              rel="noreferrer"
              className="flex border-solid border-2 border-black/90 py-1 px-3 rounded-md transition-all hover:bg-stone-700/70 hover:text-white/80 hover:border-white/80 active:scale-105 outline-none"
            >
              Register Now
            </Link>
            <Link
              href={configs.forms.submitPaper}
              target="_blank"
              rel="noreferrer"
              className="flex border-solid border-2 border-black/90 py-1 px-3 rounded-md transition-all hover:bg-stone-700/70 hover:text-white/80 hover:border-white/80 active:scale-105 outline-none"
            >
              Submit a Paper
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
