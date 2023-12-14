import React, { Fragment } from "react";
import dayjs from "dayjs";
import { ConferenceType } from "@/lib/types";
import Link from "next/link";
import Image from "next/image";
import SectionHeaderText from "./section-header-text";

export default function UpcomingConferences(
  { conferences }: { conferences: ConferenceType[] },
) {
  return (
    <section>
      <div className="container">
        <SectionHeaderText
          text={"Upcoming Conferences"}
          subText={"INDIGENOUS CONFERENCE SERVICES stands as a fully Indigenous-owned enterprise, maintaining complete independence from government funding bodies."}
        />
        <div className="grid grid-cols-2 xl:gap-6">
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
    <Link
      style={{ fontFamily: "Anton" }}
      href={`/conference/${conference.slug}`}
      className="group relative h-56 group transition-all duration-200 rounded-sm overflow-hidden"
    >
      <Image
        src={conference.coverImage.src}
        alt={conference.coverImage.alt}
        fill
        className="object-cover grayscale group-hover:grayscale-0"
      />
      <div className="upcoming_conference_info_wrap whitespace-nowrap">
        <span className="w-fit group-odd:pr-4 group-even:pl-4 text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-yellow-400 group-hover:via-yellow-300 group-hover:to-yellow-200 group-hover:max-w-[28rem] pt-2">
          <h3 className="xl:text-3xl group-hover:whitespace-normal transition group-hover:text-white divide-white divide-y">
            {conference.title}
          </h3>
          <Date date={conference.date} />
          <h4 className="xl:text-xl whitespace-nowrap transition">
            {conference.venue}
          </h4>
        </span>
        <Links
          slug={conference.slug}
          registration={conference.registrationLink}
          submitAPaper={conference.submitPaperLink}
        />
        <SpinningIcon />
      </div>
    </Link>
  );
}

function SpinningIcon() {
  return (
    <div className="absolute left-1/2 -translate-x-1/2 translate-y-1/2 bottom-0 hidden group-hover:block z-10">
      <div className="relative h-96 w-96">
        <Image
          src="/assets/images/conference-card-icon.svg"
          alt="Aboriginal Conferences"
          fill
          className="object-cover grayscale opacity-20 animate-[spin_10s_linear_infinite]"
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
      <h4 className="xl:text-xl whitespace-nowrap transition">
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

function Links({
  slug,
  registration,
  submitAPaper,
}: { slug: string; registration: string; submitAPaper: string | undefined }) {
  return (
    <div className="flex gap-3 text-lg bg-black text-white/90 mt-auto z-20">
      <Link
        href={`/conferences/${slug}`}
        className="text-center hover:bg-slate-800 hover:text-white xl:py-2 transition active:scale-95 active:rounded-bl-md duration-75 px-3"
      >
        View Events
      </Link>
      <Link
        href={registration}
        className="text-center hover:bg-slate-800 hover:text-white xl:py-2 transition active:scale-95 duration-75 px-3"
      >
        Registration
      </Link>
      {submitAPaper && (
        <Link
          href={submitAPaper}
          className="text-center hover:bg-slate-800 hover:text-white xl:py-2 transition active:scale-95 active:rounded-br-md duration-75 px-3"
        >
          Submit A Paper
        </Link>
      )}
    </div>
  );
}
