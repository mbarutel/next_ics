import { EventType } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import SectionHeaderText from "./section-header-text";

export default function ConferenceEvents({ events }: { events: EventType[] }) {
  return (
    <section>
      <div className="section_container">
        <SectionHeaderText
          text="Upcoming Events"
          subText="100% Proudly presented, formulated, designed and organised
By First Nations Peoples"
        />
        <div className="grid grid-cols-3 gap-5">
          {events.map((event) => (
            <div
              key={event.slug}
              className="flex_col border-2 border-zinc-600 bg-zinc-800 rounded-sm"
            >
              <div className="grid grid-cols-2 min-h-[15rem]">
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
              <p className="text-justify text-white/90 leading-tight max-h-[20rem] overflow-y-auto p-2 mt-2 mb-4">
                {event.description}
              </p>
              <div className="grid grid-cols-3 gap-1 px-1 mb-1 mt-auto">
                <Link
                  href={`/event/${event.slug}`}
                  className="text-center text-lg font-bold bg-black/90 hover:bg-gradient-to-b gradient hover:text-black transition_config rounded-sm py-4 active:scale-95"
                >
                  Read More
                </Link>
                <Link
                  href={`/event/${event.slug}/#agenda`}
                  className="text-center text-lg font-bold bg-black/90 hover:bg-gradient-to-b gradient hover:text-black transition_config rounded-sm py-4 active:scale-95"
                >
                  View Agenda
                </Link>
                <Link
                  href={`/event/${event.slug}/#masterclass`}
                  className="text-center text-lg font-bold bg-black/90 hover:bg-gradient-to-b gradient hover:text-black transition_config rounded-sm py-4 active:scale-95"
                >
                  Masterclass
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
