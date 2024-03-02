import { ConferenceType } from "@/lib/types";
import Image from "next/image";
import dayjs from "dayjs";
import Link from "next/link";
import SectionHeaderText from "./section-header-text";

export default function NextConference(
  { conferences }: { conferences: ConferenceType[] },
) {
  const dateNow = new Date();
  const conference = conferences.find((conference) =>
    conference.date && conference.date.endDate > dateNow
  );

  if (!conference || !conference.date) {
    return null;
  }

  return (
    <section className="section_margin">
      <div className="section_container xl:!px-24">
        <SectionHeaderText>Next Conference</SectionHeaderText>
        <div className="grid grid-cols-1 xl:grid-cols-2">
          <div className="relative rounded-md overflow-hidden h-36 xl:order-1 xl:h-[400px] xl:mb-24">
            <Image
              src={conference.coverImage.src}
              alt={conference.coverImage.alt}
              fill
              className="object-cover hover:scale-125 transition_config"
            />
          </div>
          <ConferenceDetails {...conference} />
        </div>
      </div>
    </section>
  );
}

function ConferenceDetails(conference: ConferenceType) {
  if (!conference.date) {
    throw new Error("Date cannot be undefined at this point");
  }

  return (
    <div className="bg-gradient-to-br gradient_secondary uppercase flex flex-col rounded-lg p-2 z-10 w-[95%] mx-auto -translate-y-5 xl:translate-y-0 xl:mt-24 xl:w-[110%]">
      <h3 className="conference_card_title lg:text-3xl xl:text-4xl text-gray-800 mt-3">
        {conference.title}
      </h3>
      <h4 className="conference_card_info md:text-2xl flex flex-col text-gray-600 mt-3">
        <span>
          {dayjs(conference.date.startDate).format("DD - ")}
          {dayjs(conference.date.endDate).format("DD MMM YY")}
        </span>
        <span className="leading-none">
          {conference.venue}
        </span>
      </h4>
      <div className="w-full flex gap-1 p-1 mt-3 xl:mt-auto">
        <Link
          href={`/conference/${conference.slug}`}
          className="grow py-2 text-center text-lg font-bold bg-black/90  hover:bg-gradient-to-b from-gray-400 to-gray-600 hover:text-black transition_config rounded-sm active:scale-95"
        >
          View Events
        </Link>
        {conference.formLink &&
          (
            <Link
              target="_blank"
              rel="noreferer"
              href={`/registration/${conference.slug}`}
              className="grow py-2 text-center text-lg font-bold bg-black/90 hover:bg-gradient-to-b from-gray-400 to-gray-600 hover:text-black transition_config rounded-sm active:scale-95"
            >
              Registration
            </Link>
          )}
      </div>
    </div>
  );
}
