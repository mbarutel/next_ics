"use client";
import React from "react";
import { ConferencePage } from "@/contentful/types/types";
import Countdown from "./Countdown";
import Image from "next/image";
import dayjs from "dayjs";
import Link from "next/link";
import { configs } from "@/lib/data";

type ConferenceHeaderProps = {
  conferencePage: ConferencePage;
};
export default function ConferenceHeader(
  { conferencePage }: ConferenceHeaderProps,
) {
  const localizedFormat = require("dayjs/plugin/localizedFormat");
  dayjs.extend(localizedFormat);

  return (
    <header>
      <Image
        src={conferencePage.coverImage.src}
        alt={conferencePage.coverImage.alt}
        width={conferencePage.coverImage.width}
        height={conferencePage.coverImage.height}
        quality="90"
        priority={true}
        className="w-screen h-[25rem] sm:h-[30rem] lg:h-[40rem] object-cover object-top"
      />
      <div className="container relative -translate-y-20 sm:-translate-y-28">
        <div className="text-center sm:text-left bg-gradient-to-b from-stone-950 to-red-950 p-6 sm:p-10 rounded-xl shadow-lg text-white sm:w-fit">
          <h1 className="text-[0.9rem] sm:text-lg font-semibold uppercase text-rain">
            {conferencePage.title}
          </h1>
          <div className="text-[0.8rem] sm:text-lg text-rain flex flex-col mt-2">
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
          <div className="max-w-lg flex gap-4">
            <Link
              href={configs.forms.registration}
              target="_blank"
              rel="noreferrer"
              className="group relative inline-flex border border-orange-700 focus:outline-none w-full sm:w-auto"
            >
              <span className="w-full inline-flex items-center justify-center self-stretch px-4 py-2 text-sm text-white text-center font-bold uppercase bg-orange-700 ring-1 ring-orange-700 ring-offset-1 ring-offset-orange-700 transform transition-transform group-hover:translate-y-1 group-hover:translate-x-1 group-focus:translate-y-1 group-focus:translate-x-1 group-active:translate-y-0 group-active:translate-x-0">
                Register
              </span>
            </Link>
            <Link
              className="group relative inline-flex border border-orange-700 focus:outline-none w-full sm:w-auto"
              href={configs.forms.submitPaper}
              target="_blank"
              rel="noreferrer"
            >
              <span className="w-full inline-flex items-center justify-center self-stretch px-4 py-2 text-sm text-white text-center font-bold uppercase bg-transparent ring-1 ring-orange-700 ring-offset-1 ring-offset-orange-700 transform transition-transform group-hover:translate-y-1 group-hover:translate-x-1 group-focus:translate-y-1 group-focus:translate-x-1 group-active:translate-y-0 group-active:translate-x-0">
                Submit&nbsp;a&nbsp;paper
              </span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
