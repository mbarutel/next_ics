import React from "react";
import dayjs from "dayjs";
import { ConferenceType } from "@/lib/types";
import Link from "next/link";
import { configs } from "@/lib/data";
import Image from "next/image";
import SectionHeaderText from "./section-header-text";

export default function UpcomingConferences(
  { conferences }: { conferences: ConferenceType[] },
) {
  return (
    <section className="bg-neutral-950">
      <div className="container">
        <SectionHeaderText text={"Upcoming Conferences"} />
        <div className="grid grid-cols-2 xl:gap-y-6 gap-x-16">
          {conferences.map((conference) => (
            <div
              style={{ fontFamily: "Anton" }}
              key={conference.slug}
              className="group flex flex-col bg-white xl:h-72 rounded-md overflow-hidden border border-gray-200"
            >
              <div className="grow grid grid-cols-3">
                <div className="relative group-even:order-1">
                  <Image
                    src={conference.coverImage.src}
                    alt={conference.coverImage.alt}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="group-even:text-right flex flex-col h-full pb-3 relative col-span-2 p-3">
                  <Image
                    src="/assets/images/conference-bg.webp"
                    alt="Conference Aboriginal Art"
                    fill
                    className="object-cover opacity-20 z-10 grayscale"
                  />
                  <span className="grow z-20">
                    <h2 className="xl:text-3xl font-semibold tracking-wide text-slate-800/90">
                      {conference.title}
                    </h2>
                  </span>
                  <Date date={conference.date} />
                  <span className="z-20">
                    <h4 className="xl:text-2xl text-orange-500">
                      {conference.venue}
                    </h4>
                  </span>
                </div>
              </div>
              <Links
                slug={conference.slug}
                registration={conference.registrationLink}
                submitAPaper={configs.forms.submitPaper}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Date(
  { date }: { date: { startDate: Date; endDate: Date } | undefined },
) {
  return (
    <span className="z-20">
      <h4 className="xl:text-2xl tracking-wider text-orange-500">
        {date
          ? (
            <>
              {dayjs(date.startDate).format("DD - ")}
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
}: { slug: string; registration: string; submitAPaper: string }) {
  return (
    <div className="grid grid-cols-3 text-xl bg-slate-600 text-white/90">
      <Link
        href={`/conferences/${slug}`}
        className="text-center hover:bg-slate-800 hover:text-white xl:py-5 transition active:scale-95 active:rounded-bl-md duration-75"
      >
        View Events
      </Link>
      <Link
        href={registration}
        className="text-center hover:bg-slate-800 hover:text-white xl:py-5 transition active:scale-95 duration-75"
      >
        Registration
      </Link>
      <Link
        href={submitAPaper}
        className="text-center hover:bg-slate-800 hover:text-white xl:py-5 transition active:scale-95 active:rounded-br-md duration-75"
      >
        Submit A Paper
      </Link>
    </div>
  );
}
