import Link from "next/link";
import React, { Fragment } from "react";
import { ConferenceType } from "@/lib/types";

export default function UpcomingEvents(
  { conferences }: { conferences: ConferenceType[] },
) {
  return (
    <section className="pt-8 lg:pt-12">
      <div className="container flex flex-col">
        <h2
          style={{ fontFamily: "Abril Fatface" }}
          className="w-fit section_header text-orange-500 mb-6 sm:mb-10"
        >
          Upcoming Events
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3">
          {conferences.map((conference) => (
            <Fragment key={conference.slug}>
              <Events conference={conference} />
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

function Events({ conference }: { conference: ConferenceType }) {
  return (
    <>
      {conference.events.map((event) => {
        if (!event) {
          return null;
        } else {
          return (
            <div
              key={event.slug}
              className="flex flex-col rounded-lg shadow-lg p-4 bg-stone-100"
            >
              <h4
                style={{ fontFamily: "Abril Fatface" }}
                className="mb-2 text-slate-800/70"
              >
                {conference.title}
              </h4>
              <h3
                style={{ fontFamily: "Abril Fatface" }}
                className="text-2xl text-slate-800 mb-4"
              >
                {event.title}
              </h3>
              <p className="flex-grow text-justify text-slate-800/80">
                {event.description}
              </p>
              <div className="w-full h-[2px] bg-black/80 my-3" />
              <Link
                href={`/event/${event.slug}`}
                className="relative w-fit inline-flex group mt-3 button_padding bg-slate-700  text-white transition-all active:scale-95 rounded-md overflow-hidden"
              >
                <span className="z-10">
                  Learn More
                </span>
                <span className="absolute h-full w-0 left-0 bottom-0 group-hover:w-full bg-slate-950 transition-all ease-in-out z-0" />
              </Link>
            </div>
          );
        }
      })}
    </>
  );
}
