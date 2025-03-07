import { EventType } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment } from "react";

type ConferenceEventsProps = {
  events: EventType[];
};
export default function ConferenceEvents({ events }: ConferenceEventsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 my-6">
      {events.map((event) => (
        <Fragment key={event.slug}>
          <ConferenceCard {...event} />
        </Fragment>
      ))}
    </div>
  );
}

function ConferenceCard(event: EventType) {
  return (
    <div className="flex_col relative border-2 border-zinc-600 bg-zinc-800 rounded-sm">
      <div className="grid grid-cols-2 min-h-[15rem] z-10">
        <h3 className="text-3xl font-bold pl-3 pt-3">{event.title}</h3>
        <div className="relative h-full w-full bg-gradient-to-bl gradient rounded-sm">
          <Image
            src={event.poster.src}
            alt={event.poster.alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain"
          />
        </div>
      </div>
      <p className="text-justify text-white/90 font-medium leading-tight max-h-[20rem] overflow-y-auto p-2 mt-2 mb-4 z-10">
        {event.description}
      </p>
      <div className="w-full mt-auto z-10 flex gap-1 p-1">
        <Link
          href={`/event/${event.slug}`}
          className="grow py-2 text-center text-lg font-bold bg-black/90  hover:bg-gradient-to-b gradient hover:text-black transition_config rounded-sm active:scale-95"
        >
          Learn More
        </Link>
        {event.conference && (
          <Link
            target="_blank"
            rel="noreferer"
            href={event.conference.formLink}
            className="grow py-2 text-center text-lg font-bold bg-black/90 hover:bg-gradient-to-b gradient hover:text-black transition_config rounded-sm active:scale-95"
          >
            Registration
          </Link>
        )}
      </div>
    </div>
  );
}
