import { ConferencesType, EventType } from "@/contentful/types/types";
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
          </div>
        ))}
      </div>
    </section>
  );
}

function Events({events}: {events: EventType[]}) {
  return (
    <div>
      Events
    </div>
  );
}
