import { ConferencePage } from "@/contentful/types/types";
import { CiLocationOn } from "react-icons/ci";
import { CiCalendar } from "react-icons/ci";
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
    <div>
      <div className="bg-red-800/90 pb-2 sm:pb-4 rounded-t-md mb-1">
        <div className="relative mb-3 flex flex-col items-center">
          <Image
            src={conferencePage.coverImage.src}
            alt={conferencePage.coverImage.alt}
            width={conferencePage.coverImage.width}
            height={conferencePage.coverImage.height}
            className="h-36 sm:h-56 w-full rounded-t-md object-cover shadow-lg contrast-75"
          />
          <h4 className="absolute bottom-1/2 translate-y-1/2 sm:translate-y-0 sm:bottom-2 left-1/2 -translate-x-1/2 text-center w-[95%] text-white capitalize font-bold leading-none text-base">
            {conferencePage.title}
          </h4>
        </div>
        <span className="flex justify-between px-4 uppercase">
          <span className="flex items-center text-[0.8rem] text-center sm:text-left text-white">
            <CiCalendar className="text-lg"/>
            &nbsp;
            {dayjs(conferencePage.startDate).format("DD")} -{" "}
            {dayjs(conferencePage.endDate).format("DD MMM, YYYY")}
          </span>
          <span className="flex items-center text-[0.8rem] text-center sm:text-left text-white">
            <CiLocationOn className="text-lg"/>
            &nbsp;
            {conferencePage.venueName}
          </span>
        </span>
      </div>

      <Link
        className="group relative inline-flex focus:outline-none w-full mb-2 rounded-b-md"
        href={`/conferences/${conferencePage.slug}`}
        target="_blank"
        rel="noreferrer"
      >
        <span className="w-full inline-flex items-center justify-center self-stretch px-4 py-2 text-sm text-white text-center uppercase transform transition-transform group-hover:translate-y-1 group-focus:translate-y-1 rounded-b-md bg-stone-500/80 active:scale-95">
          Read More
        </span>
      </Link>
    </div>
  );
}
