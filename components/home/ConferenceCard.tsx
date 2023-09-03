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
    <Link
      href={`/conferences/${conferencePage.slug}`}
      target="_blank"
      rel="noreferrer"
    >
      <div className="bg-off_yellow flex flex-col pt-3 px-3 pb-5 rounded-lg">
        <div className="relative mb-3">
          <Image
            src={conferencePage.coverImage.src}
            alt={conferencePage.coverImage.alt}
            width={conferencePage.coverImage.width}
            height={conferencePage.coverImage.height}
            className="h-56 w-80 rounded-lg"
          />
          <h4 className="absolute bottom-2 left-1/2 -translate-x-1/2 text-center w-[90%]">
            {conferencePage.title}
          </h4>
        </div>
        <span>
          🗓️&nbsp;
          {dayjs(conferencePage.startDate).format("DD")} -{" "}
          {dayjs(conferencePage.endDate).format("DD MMMM , YYYY")}
        </span>
        <span>
          📍&nbsp;
          {conferencePage.venueName}
        </span>
      </div>
      <p className="text-center">Read More</p>
    </Link>
  );
}
