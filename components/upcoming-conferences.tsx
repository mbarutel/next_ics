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
    <section id="conferences" className="scroll-mt-24 section_top_margin">
      <div className="section_container">
        <SectionHeaderText text={"Upcoming Conferences"} />
        <div className="relative grid grid-cols-1 xl:grid-cols-2 gap-y-2 gap-x-4">
          <div className="hidden xl:block absolute h-full top-0 left-1/2 -translate-x-1/2 w-1 bg-gradient-to-t gradient rounded-full opacity-90" />
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
    <div className="group relative h-48 md:h-56 group transition-all duration-200 rounded-sm overflow-hidden">
      <Image
        src={conference.coverImage.src}
        alt={conference.coverImage.alt}
        fill
        className="object-cover grayscale-[75%] transition_config group-hover:grayscale-0"
      />
      <div className="conference_card_info_wrap conference_card_orientation">
        <Link
          href={`/conference/${conference.slug}`}
          className="group-odd:pr-4 group-odd:ml-auto group-odd:text-right group-even:pl-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-200 max-w-[28rem] pt-2 z-20 w-[15rem] md:w-fit active:scale-95 transition_config"
        >
          <h3 className="text-xl sm:text-3xl font-semibold group-even:ml-auto uppercase !tracking-tight !leading-none transition text-white mb-1">
            {conference.title}
          </h3>
          <Date date={conference.date} />
          <h4 className="-mt-2 text-base md:text-xl whitespace-nowrap group-hover:whitespace-normal transition font-semibold">
            {conference.venue}
          </h4>
        </Link>
        <AboriginalIcon />
      </div>
      <CallToActionButtons
        slug={conference.slug}
        registration={conference.registrationLink}
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
          className="object-cover grayscale opacity-20"
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
      <h4 className="text-base md:text-xl whitespace-nowrap font-semibold">
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
}: { slug: string; registration: string }) {
  return (
    <div className="absolute bottom-1 group-odd:right-1 group-even:left-1 flex gap-1 text-black text-sm sm:text-lg z-40">
      <Link
        href={`/conference/${slug}`}
        className="text-center bg-gradient-to-r rounded-sm gradient hover:-translate-y-1 py-2 transition_config active:translate-y-1 duration-100 px-2 sm:px-3"
      >
        View Events
      </Link>
      <Link
        href={registration}
        target="_blank"
        rel="noopener noreferrer"
        className="text-center bg-gradient-to-r rounded-sm gradient hover:-translate-y-1 py-2 transition_config active:translate-y-1 duration-100 px-1 sm:px-3"
      >
        Registration
      </Link>
    </div>
  );
}
