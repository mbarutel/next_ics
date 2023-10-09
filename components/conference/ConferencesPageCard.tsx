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
    <Link
      href={`/conferences/${conferencePage.slug}`}
      target="_blank"
      rel="noreferrer"
      className="bg-red-800/80 grid grid-cols-2 group transition-all hover:scale-105 active:scale-95 rounded-lg shadow-xl"
    >
      <div className="relative group-even:order-1">
        <Image
          src={conferencePage.coverImage.src}
          alt={conferencePage.coverImage.alt}
          width={conferencePage.coverImage.width}
          height={conferencePage.coverImage.height}
          className="h-36 sm:h-[450px] object-cover shadow-lg contrast-75 group-odd:rounded-l-lg group-even:rounded-r-lg"
        />
      </div>
      <div className="flex flex-col justify-center items-center text-center py-6">
        <h4 className="text-white font-black leading-none text-lg sm:text-2xl uppercase">
          {conferencePage.title}
        </h4>
        <span className="flex gap-3">
          <span className="text-base sm:text-lg font-normal text-white">
            🗓️&nbsp;
            {dayjs(conferencePage.startDate).format("DD")} -{" "}
            {dayjs(conferencePage.endDate).format("DD MMM, YYYY")}
          </span>
          <span className="capitalize text-base sm:text-lg font-normal text-white">
            📍&nbsp;
            {conferencePage.venueName}
          </span>
        </span>
        <p className="px-8 mt-2 text-justify text-white">
          {conferencePage.description}
        </p>
      </div>
    </Link>
  );
}
