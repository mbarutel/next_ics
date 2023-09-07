import { ConferencePage } from "@/contentful/types/types";
import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";

type ConferenceCardProps = {
  conferencePage: ConferencePage;
};
export default function ConferenceCard(
  { conferencePage }: ConferenceCardProps,
) {
  const localizedFormat = require("dayjs/plugin/localizedFormat");
  dayjs.extend(localizedFormat);

  return (
    <>
      <div className="bg-elden/60 pt-1 sm:pt-2 px-1 sm:px-2 pb-2 sm:pb-4 rounded-lg mb-1 sm:mb-2">
        <div className="relative mb-3 flex flex-col items-center">
          <Image
            src={conferencePage.coverImage.src}
            alt={conferencePage.coverImage.alt}
            width={conferencePage.coverImage.width}
            height={conferencePage.coverImage.height}
            className="h-36 sm:h-56 w-ful rounded-lg object-cover shadow-lg contrast-50"
          />
          <h4 className="absolute bottom-1/2 translate-y-1/2 sm:translate-y-0 sm:bottom-2 left-1/2 -translate-x-1/2 text-center w-[90%] text-rain capitalize font-bold leading-none text-lg">
            {conferencePage.title}
          </h4>
        </div>
        <p className="text-[0.8rem] sm:text-[1rem] text-night text-center sm:text-left">
          🗓️&nbsp;
          {dayjs(conferencePage.startDate).format("DD")} -{" "}
          {dayjs(conferencePage.endDate).format("DD MMM, YYYY")}
        </p>
        <p className="capitalize text-[0.8rem] sm:text-[1rem] text-night text-center sm:text-left">
          📍&nbsp;
          {conferencePage.venueName}
        </p>
      </div>
      <Link
        href={`/conferences/${conferencePage.slug}`}
        target="_blank"
        rel="noreferrer"
        className="flex justify-center text-chili text-[0.8rem] sm:text-xl uppercase cursor-pointer transition-all hover:scale-[1.05] focus:scale-[1.05] active:scale-[1.02]"
      >
        Read More
      </Link>
    </>
  );
}
