import { EventType } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment } from "react";
import SectionHeaderText from "./section-header-text";

export default function ConferenceEvents({ events }: { events: EventType[] }) {
  return (
    <section className="section_top_margin">
      <div className="section_container">
        <SectionHeaderText text="Upcoming Events" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
          {events.map((event) => (
            <Fragment key={event.slug}>
              <ConferenceCard {...event} />
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

function ConferenceCard(event: EventType) {
  return (
    <div className="flex_col relative border-2 border-zinc-600 bg-zinc-800 rounded-sm">
      <Image
        src="/assets/images/aboriginal_pattern.svg"
        alt="pattern"
        fill
        className="object-cover z-0 grayscale opacity-5"
      />
      <div className="grid grid-cols-2 min-h-[15rem] z-10">
        <h3 className="text-3xl font-bold pl-3 pt-3">{event.title}</h3>
        <div className="relative h-full w-full bg-gradient-to-bl gradient rounded-sm">
          <Image
            src={event.poster.src}
            alt={event.poster.alt}
            fill
            className="object-contain"
          />
        </div>
      </div>
      <p className="text-justify text-white/90 font-medium leading-tight max-h-[20rem] overflow-y-auto p-2 mt-2 mb-4 z-10">
        {event.description}
      </p>
      <Link
        target="_blank"
        rel="noreferer"
        href={`/event/${event.slug}`}
        className="w-full mt-auto z-10 text-center text-lg font-bold bg-black/90 hover:bg-gradient-to-b gradient hover:text-black transition_config rounded-sm py-4 active:scale-95"
      >
        Read More
      </Link>
    </div>
  );
}
