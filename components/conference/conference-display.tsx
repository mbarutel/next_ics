import React, { Fragment } from "react";
import EventDisplay from "./event-display";
import SpeakersDisplay from "./speaker-display";
import { ConferencesType } from "@/contentful/types/types";

export default function ConferenceDisplay(
  { conference }: {
    conference: ConferencesType;
  },
) {
  return (
    <div>
      <h2
        style={{ fontFamily: "Abril Fatface" }}
        className="w-fit text-2xl font-semibold text-orange-500 uppercase mb-5"
      >
        {conference.title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 lg:mb-8">
        {conference.events.map((event) => (
          <Fragment key={event.slug}>
            <EventDisplay
              event={event}
              startDate={conference.startDate}
              endDate={conference.endDate}
              venue={conference.venue}
              registrationLink={conference.registrationLink}
            />
          </Fragment>
        ))}
      </div>
      <SpeakersDisplay conference={conference} />
    </div>
  );
}
