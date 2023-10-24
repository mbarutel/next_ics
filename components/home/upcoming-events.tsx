import React, { Fragment } from "react";
import { ConferencesType } from "@/contentful/types/types";
import Link from "next/link";

export default function UpcomingEvents(
  { conferences }: { conferences: ConferencesType[] },
) {
  return (
    <section className="pt-8 lg:pt-12">
      <div className="container flex flex-col">
        <h2 className="w-fit section_header text-orange-500 mb-6 sm:mb-10">
          Upcoming Events
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
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

function Events({ conference }: { conference: ConferencesType }) {
  return (
    <>
      {conference.events.map((event) => {
        if (!event) {
          return null;
        } else {
          return (
            <div key={event.slug} className="flex flex-col">
              <h4 className="mb-2">{conference.title}</h4>
              <h3
                style={{ fontFamily: "Gabarito" }}
                className="text-2xl text-slate-800 mb-4"
              >
                {event.title}
              </h3>
              <p className="flex-grow text-justify">{event.description}</p>
              <div className="w-full h-[2px] bg-black/80 my-3" />
              <Link
                href={`/events/${event.slug}`}
                className="relative w-fit inline-flex group mt-3 button_padding bg-slate-700  text-white transition-all active:scale-95"
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
