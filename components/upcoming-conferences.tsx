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
      <div className="section_container">
        <SectionHeaderText
          text={"Upcoming Conferences"}
          subText={"INDIGENOUS CONFERENCE SERVICES stands as a fully Indigenous-owned enterprise, maintaining complete independence from government funding bodies."}
        />
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
        className="object-cover grayscale-[75%] transition group-hover:grayscale-0"
      />
      <div className="absolute group-odd:right-0 group-even:left-0 group-odd:clip-path-polygon-[100%_0,_10%_0,_20%_100%,_100%_100%] md:group-odd:clip-path-polygon-[100%_0,_30%_0,_40%_100%,_100%_100%] group-even:clip-path-polygon-[0_0,_90%_0,_80%_100%,_0_100%] md:group-even:clip-path-polygon-[0_0,_70%_0,_60%_100%,_0_100%] w-0 group-hover:w-full overflow-hidden transition_config bg-zinc-800 h-full text-transparent whitespace-nowrap flex_col justify-between">
        <div className="group-odd:pr-4 group-odd:ml-auto group-odd:text-right group-even:pl-4 text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-yellow-400 group-hover:via-yellow-300 group-hover:to-yellow-200 group-hover:max-w-[28rem] pt-2 z-20 w-[15rem] md:w-fit">
          <h3 className="text-xl sm:text-3xl font-semibold group-even:ml-auto uppercase !tracking-tight !leading-none group-hover:whitespace-normal transition group-hover:text-white">
            {conference.title}
          </h3>
          <Date date={conference.date} />
          <h4 className="-mt-1 md:mt-0 text-base md:text-xl whitespace-nowrap group-hover:whitespace-normal transition font-semibold">
            {conference.venue}
          </h4>
        </div>
        <CallToActionButtons
          slug={conference.slug}
          registration={conference.registrationLink}
        />
        <SpinningIcon />
      </div>
    </div>
  );
}

function SpinningIcon() {
  return (
    <div className="absolute left-1/2 -translate-x-1/2 translate-y-1/2 bottom-0 hidden group-hover:block z-0">
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
    <div className="flex text-sm sm:text-lg bg-black text-white/90 mt-auto z-40 w-fit group-odd:ml-auto">
      <Link
        href={`/conference/${slug}`}
        className="group text-center hover:bg-slate-800 hover:text-white py-2 transition active:scale-95 active:rounded-bl-md duration-75 px-2 sm:px-3"
      >
        <span className="group-active:scale-95 transition">
          View Events
        </span>
      </Link>
      <Link
        href={registration}
        className="group text-center hover:bg-slate-800 hover:text-white py-2 transition active:scale-95 duration-75 px-1 sm:px-3"
      >
        <span className="group-active:scale-95 transition">
          Registration
        </span>
      </Link>
    </div>
  );
}
