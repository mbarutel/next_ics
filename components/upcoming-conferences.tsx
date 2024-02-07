import dayjs from "dayjs";
import Link from "next/link";
import Image from "next/image";
import React, { Fragment } from "react";
import { ConferenceType } from "@/lib/types";
import SectionHeaderText from "./section-header-text";

export default function UpcomingConferences(
  { conferences }: { conferences: ConferenceType[] },
) {
  return (
    <section id="conferences" className="scroll-mt-28 section_margin">
      <div className="section_container">
        <SectionHeaderText>Upcoming Conferences</SectionHeaderText>
        <div className="relative grid grid-cols-1 xl:grid-cols-2 gap-y-3 gap-x-4">
          <div className="hidden xl:block absolute h-full top-0 left-1/2 -translate-x-1/2 w-1 bg-gray-400 rounded-full opacity-90" />
          {conferences.map((conference) => (
            <Fragment
              key={conference.slug}
            >
              <ConferenceCard {...conference} />
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

function ConferenceCard(conference: ConferenceType) {
  return (
    <div className="group relative h-48 md:h-56 rounded-md overflow-hidden">
      <Image
        src={conference.coverImage.src}
        alt={conference.coverImage.alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="hidden md:block object-cover grayscale-[75%] transition_config group-hover:grayscale-0 md:group-odd:clip-path-polygon-[0_0,_30%_0,_40%_100%,_0_100%] z-40 group-even:clip-path-polygon-[70%_0,_100%_0,_100%_100%,_60%_100%]"
      />
      <div className="conference_card_info_wrap conference_card_orientation">
        <Link
          href={`/conference/${conference.slug}`}
          className="text-transparent bg-clip-text bg-gradient-to-r gradient md:max-w-[30rem] lg:max-w-[25rem] 2xl:max-w-[30rem] pt-2 z-20 active:scale-95 transition_config"
        >
          <h3 className="text-xl md:text-2xl font-semibold md:group-even:ml-auto uppercase !tracking-tight !leading-none transition_config text-white mb-1">
            {conference.title}
          </h3>
          <Date date={conference.date} />
          <h4 className="-mt-2 text-xl whitespace-nowrap group-hover:whitespace-normal transition font-semibold">
            {conference.venue}
          </h4>
        </Link>
        <AboriginalIcon />
      </div>
      <CallToActionButtons
        slug={conference.slug}
        registration={conference.formLink}
      />
    </div>
  );
}

function AboriginalIcon() {
  return (
    <div className="absolute left-1/2 -translate-x-1/2 translate-y-1/2 bottom-0 block z-0">
      <div className="relative h-96 w-96">
        <Image
          src="/assets/images/conference-card-icon.svg"
          alt="Aboriginal Conferences"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover grayscale opacity-10"
        />
      </div>
    </div>
  );
}

function Date(
  { date }: { date: { startDate: Date; endDate: Date } | undefined },
) {
  return (
    <span className="z-20">
      <h4 className="text-xl whitespace-nowrap font-semibold">
        {date
          ? (
            <>
              {dayjs(date.startDate).format("DD-")}
              {dayjs(date.endDate).format("DD MMM YY")}
            </>
          )
          : (
            <>
              TBA
            </>
          )}
      </h4>
    </span>
  );
}

function CallToActionButtons({
  slug,
  registration,
}: { slug: string; registration: string | undefined }) {
  return (
    <div className="absolute bottom-1 left-1 md:left-auto md:group-odd:right-1 md:group-even:left-1 flex gap-1 text-black text-sm sm:text-lg z-40">
      <Link
        href={`/conference/${slug}`}
        className="md:group-odd:order-1 bg-black text-white rounded-md hover:-translate-y-1 transition_config active:translate-y-1 duration-100 py-2 px-2 sm:px-3"
      >
        View Events
      </Link>
      {registration && (
        <Link
          href={registration}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gradient-to-r gradient rounded-md hover:-translate-y-1 transition_config active:translate-y-1 duration-100 py-2 px-2 sm:px-3"
        >
          Registration
        </Link>
      )}
    </div>
  );
}
