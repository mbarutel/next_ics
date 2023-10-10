import { ConferencePage } from "@/contentful/types/types";
import { CiLocationOn } from "react-icons/ci";
import { CiCalendar } from "react-icons/ci";
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
    <Link
      href={`/conferences/${conferencePage.slug}`}
      target="_blank"
      rel="noreferrer"
      className="bg-red-800/80 grid grid-cols-1 sm:grid-cols-2 group transition-all active:scale-95 sm:rounded-lg shadow-xl min-h-[25rem]"
    >
      <div className="relative sm:group-even:order-1">
        <Image
          src={conferencePage.coverImage.src}
          alt={conferencePage.coverImage.alt}
          width={conferencePage.coverImage.width}
          height={conferencePage.coverImage.height}
          className="h-full object-cover shadow-lg contrast-75 sm:group-odd:rounded-l-md sm:group-even:rounded-r-md"
        />
      </div>
      <div className="flex flex-col justify-center items-center text-center py-6 px-4 lg:px-8">
        <h4 className="text-white font-black leading-none text-lg sm:text-2xl uppercase mb-2 drop-shadow-lg">
          {conferencePage.title}
        </h4>
        <span className="flex justify-between w-full lg:w-[80%] mb-4">
          <span className="text-base lg:text-lg font-semibold text-white/90 flex items-center gap-1 lg:gap-2">
            <CiCalendar className="text-2xl"/>
            {dayjs(conferencePage.startDate).format("DD")} -{" "}
            {dayjs(conferencePage.endDate).format("DD MMM, YYYY")}
          </span>
          <span className="capitalize text-base lg:text-lg font-semibold text-white/90 flex items-center gap-1 lg:gap-2">
            <CiLocationOn className="text-2xl"/>
            {conferencePage.venueName}
          </span>
        </span>
        <p className="text-justify text-white mb-4">
          {conferencePage.description}
        </p>
        <span className="text-left sm:group-even:text-right w-full text-white text-lg font-mono uppercase">
          <small className="bg-orange-400/80 p-3 hover:text-gray-700 transition rounded-sm">
            View Conference
          </small>
        </span>
      </div>
    </Link>
  );
}
