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
        <div className="xl:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <ConferenceDetails {...conference} />
            <div className="relative rounded-md overflow-hidden md:mb-24">
              <Image
                src="/assets/images/next-conference-poster.webp"
                alt="Upcoming Conference In Australia"
                fill
                className="object-cover hover:scale-110 transition_transform duration-500"
              />
            </div>
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
    <div className="bg-yellow-400 flex_col justify-center rounded-lg z-10 px-4 py-6 md:mt-24 md:w-[110%] box_shadow">
      <h3 className="text-2xl italic font-semibold text-gray-800 mt-3 uppercase ">
        {conference.title}
      </h3>
      <h4 className="flex_col text-lg text-gray-800 mt-3 capitalize">
        <span>
          {dayjs(conference.date.startDate).format("DD - ")}
          {dayjs(conference.date.endDate).format("DD MMMM YYYY")}
        </span>
        <span className="leading-none">{conference.venue}</span>
      </h4>
      <div className="flex gap-1 text-black z-40 capitalize mt-12">
        <Link
          href={`/conference/${conference.slug}`}
          className="bg-black text-white rounded-md hover:-translate-y-1 transition_config active:translate-y-1 duration-100 py-2 px-2 sm:px-3 shadow-black/40 shadow-md"
        >
          Learn More
        </Link>
        <Link
          href={`/forms/speakers?conference=${conference.slug}`}
          className="bg-yellow-300 rounded-md hover:-translate-y-1 transition_config active:translate-y-1 duration-100 py-2 px-2 sm:px-3 shadow-black/40 shadow-md"
        >
          Submit A Paper
        </Link>
        <Link
          href={`/forms/delegates?conference=${conference.slug}`}
          className="bg-yellow-300 rounded-md hover:-translate-y-1 transition_config active:translate-y-1 duration-100 py-2 px-2 sm:px-3 shadow-black/40 shadow-md"
        >
          Registration
        </Link>
      </div>
    </div>
  );
}
