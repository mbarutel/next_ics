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
      <div className="section_container">
        <SectionHeaderText>Next Conference</SectionHeaderText>
        <div className="xl:px-24">
          <div className="grid grid-cols-1 xl:grid-cols-2">
            <div className="relative rounded-md overflow-hidden h-36 xl:order-1 xl:h-auto xl:mb-24">
              <Image
                src="/assets/images/about_vision.webp"
                alt="Upcoming Conference In Australia"
                fill
                className="object-cover hover:scale-125 transition_config"
              />
            </div>
            <ConferenceDetails {...conference} />
          </div>
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
    <div className="bg-yellow-400/90 uppercase flex flex-col justify-center rounded-lg z-10 w-[95%] mx-auto -translate-y-5 p-2 xl:p-4 xl:translate-y-0 xl:mt-24 xl:w-[110%] xl:min-h-[400px]">
      <h3 className="conference_card_title lg:text-3xl xl:text-4xl text-gray-800 mt-3">
        {conference.title}
      </h3>
      <h4 className="conference_card_info md:text-2xl flex flex-col text-gray-600 mt-3">
        <span>
          {dayjs(conference.date.startDate).format("DD - ")}
          {dayjs(conference.date.endDate).format("DD MMM YYYY")}
        </span>
        <span className="leading-none">
          {conference.venue}
        </span>
      </h4>
      <div className="flex gap-1 text-black text-sm sm:text-lg z-40 capitalize mt-12">
        <Link
          href={`/conference/${conference.slug}`}
          className="bg-black text-white rounded-md hover:-translate-y-1 transition_config active:translate-y-1 duration-100 py-2 px-2 sm:px-3"
        >
          View Events
        </Link>
        {conference.formLink && (
          <Link
            href={conference.formLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r gradient rounded-md hover:-translate-y-1 transition_config active:translate-y-1 duration-100 py-2 px-2 sm:px-3"
          >
            Registration
          </Link>
        )}
      </div>
    </div>
  );
}
