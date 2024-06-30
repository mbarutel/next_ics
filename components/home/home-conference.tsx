import { ConferenceType } from "@/lib/types";
import Image from "next/image";
import dayjs from "dayjs";
import Link from "next/link";
import { configs } from "@/lib/data";

export default function HomeConference({
  conferences,
}: {
  conferences: ConferenceType[];
}) {
  const dateNow = new Date();
  const conference = conferences.find(
    (conference) => conference.date && conference.date.endDate > dateNow,
  );

  if (!conference || !conference.date) {
    return null;
  }

  let sectionTitle;

  if (
    dateNow >= conference.date.startDate &&
    dateNow <= conference.date.endDate
  ) {
    sectionTitle = "Current Conference";
  } else {
    sectionTitle = "Next Conference";
  }

  return (
    <section className="section_padding">
      <div className="section_container">
        <h2 className="title">{sectionTitle}</h2>
        <div className="xl:px-24">
          <div className="grid grid-cols-1 xl:grid-cols-2">
            <div className="relative rounded-md overflow-hidden h-36 xl:order-1 xl:h-auto xl:mb-24">
              <Image
                src="/assets/images/next-conference-poster.webp"
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
    <div className="bg-yellow-400 uppercase flex flex-col justify-center rounded-lg z-10 w-[95%] mx-auto -translate-y-5 p-2 xl:p-4 xl:translate-y-0 xl:mt-24 xl:w-[110%] xl:min-h-[400px] shadow-black/80 shadow-lg">
      <h3 className="conference_card_title lg:text-3xl xl:text-4xl text-gray-800 mt-3">
        {conference.title}
      </h3>
      <h4 className="conference_card_info md:text-2xl flex flex-col text-gray-600 mt-3">
        <span>
          {dayjs(conference.date.startDate).format("DD - ")}
          {dayjs(conference.date.endDate).format("DD MMM YYYY")}
        </span>
        <span className="leading-none">{conference.venue}</span>
      </h4>
      <div className="flex gap-1 text-black text-sm sm:text-lg z-40 capitalize mt-12">
        <Link
          href={`/conference/${conference.slug}`}
          className="bg-black text-white rounded-md hover:-translate-y-1 transition_config active:translate-y-1 duration-100 py-2 px-2 sm:px-3 shadow-black/40 shadow-md"
        >
          View Events
        </Link>
        <Link
          href={configs.forms.submitPaper}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-yellow-300 rounded-md hover:-translate-y-1 transition_config active:translate-y-1 duration-100 py-2 px-2 sm:px-3 shadow-black/40 shadow-md"
        >
          Submit A Paper
        </Link>
        {conference.formLink && (
          <Link
            href={conference.formLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-yellow-300 rounded-md hover:-translate-y-1 transition_config active:translate-y-1 duration-100 py-2 px-2 sm:px-3 shadow-black/40 shadow-md"
          >
            Registration
          </Link>
        )}
      </div>
    </div>
  );
}
