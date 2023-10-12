import { ConferencesType, EventType } from "@/contentful/types/types";
import Image from "next/image";
import React from "react";

export default function UpcomingEvents(
  { conferences }: { conferences: ConferencesType[] },
) {
  return (
    <section>
      <div className="container">
        <h2>Upcoming Events</h2>
        {conferences.map((conference) => (
          <div key={conference.slug}>
            <h3>{conference.title}</h3>
            <Events events={conference.events} />
          </div>
        ))}
      </div>
    </section>
  );
}

function Events({ events }: { events: (EventType | null)[] }) {
  return (
    <div className="flex">
      {events.map((event) => {
        if (!event) {
          return null;
        } else {
          return (
            <div key={event.slug} className="relative h-60 flex-grow">
              <Image
                src={event.coverImage?.src}
                alt={event.coverImage?.alt}
                fill
                className="object-cover"
              />
            </div>
          );
        }
      })}
    </div>
  );
}
