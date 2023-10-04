import { ConferencePage } from "@/contentful/types/types";
import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";

type ConferenceCardProps = {
  conferencePage: ConferencePage;
};
export default function ConferencesPageCard(
  { conferencePage }: ConferenceCardProps,
) {
  const localizedFormat = require("dayjs/plugin/localizedFormat");
  dayjs.extend(localizedFormat);

  return (
    <div>
      <div className="bg-red-800/80 pt-1 sm:pt-2 px-1 sm:px-2 pb-2 sm:pb-4 rounded-t-lg mb-1">
        <div className="relative mb-3 flex flex-col items-center">
          <Image
            src={conferencePage.coverImage.src}
            alt={conferencePage.coverImage.alt}
            width={conferencePage.coverImage.width}
            height={conferencePage.coverImage.height}
            className="h-36 sm:h-[500px] w-full rounded-lg object-cover shadow-lg contrast-75"
          />
          <h4 className="absolute bottom-1/2 translate-y-1/2 sm:translate-y-0 sm:bottom-2 left-1/2 -translate-x-1/2 text-center w-[90%] text-white font-black leading-none text-lg sm:text-3xl uppercase">
            {conferencePage.title}
          </h4>
        </div>
        <p className="text-base sm:text-2xl text-center sm:text-left font-normal text-white mt-2 sm:mt-6">
          🗓️&nbsp;
          {dayjs(conferencePage.startDate).format("DD")} -{" "}
          {dayjs(conferencePage.endDate).format("DD MMM, YYYY")}
        </p>
        <p className="capitalize text-base sm:text-2xl text-center sm:text-left font-normal text-white mb-2 sm:mb-4">
          📍&nbsp;
          {conferencePage.venueName}
        </p>
      </div>

      <Link
        className="group relative inline-flex focus:outline-none w-full mb-2 rounded-b-xl"
        href={`/conferences/${conferencePage.slug}`}
        target="_blank"
        rel="noreferrer"
      >
        <span className="w-full inline-flex items-center justify-center self-stretch px-4 py-2 text-sm text-white text-center font-bold uppercase ring-1 ring-red-800/80 transform transition-transform group-hover:translate-y-1 group-focus:translate-y-1 rounded-b-xl bg-red-800/80 active:scale-95 sm:text-xl">
          Read More
        </span>
      </Link>
    </div>
  );
}
