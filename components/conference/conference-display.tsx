import React, { Fragment } from "react";
import EventDisplay from "./event-display";
import SpeakersDisplay from "./speaker-display";
import { ConferencesType } from "@/contentful/types/types";
import clsx from "clsx";

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
      <div
        className={clsx("grid grid-cols-1 gap-4 mb-4 lg:mb-8", {
          "lg:grid-cols-1": conference.events.length === 1,
        }, {
          "lg:grid-cols-2": (conference.events.length % 2) === 0,
        }, {
          "lg:grid-cols-3": conference.events.length >= 3,
        })}
      >
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
      {conference.speakers &&
        <SpeakersDisplay conference={conference} />}
    </div>
  );
}
