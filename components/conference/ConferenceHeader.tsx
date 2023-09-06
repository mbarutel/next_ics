import React from "react";
import { ConferencePage } from "@/contentful/types/types";
import Image from "next/image";
import dayjs from "dayjs";
import Link from "next/link";

type ConferenceHeaderProps = {
  conferencePage: ConferencePage;
};
export default function ConferenceHeader(
  { conferencePage }: ConferenceHeaderProps,
) {
  const localizedFormat = require("dayjs/plugin/localizedFormat");
  dayjs.extend(localizedFormat);

  return (
    <header className="flex flex-col relative mb-14">
      <Image
        src={conferencePage.coverImage.src}
        alt={conferencePage.coverImage.alt}
        width={conferencePage.coverImage.width}
        height={conferencePage.coverImage.height}
        quality="90"
        priority={true}
        className="w-screen h-64 sm:h-[400px] md:h-[500px] object-cover"
      />
      <div className="bg-yellow-400 p-10 mx-4 w-fit rounded-xl absolute left-0 bottom-0 translate-y-14">
        <h1 className="text-lg font-semibold uppercase text-stone-700">{conferencePage.title}</h1>
        <div className="text-[0.8rem] sm:text-[1rem] text-stone-700/80  flex flex-col">
          <span>
            🗓️&nbsp;
            {dayjs(conferencePage.startDate).format("DD")} -{" "}
            {dayjs(conferencePage.endDate).format("DD MMMM, YYYY")}
          </span>
          <span>
            📍&nbsp;
            {conferencePage.venueName}
          </span>
        </div>
      </div>
    </header>
  );
}
