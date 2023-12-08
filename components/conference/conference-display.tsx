import React, { Fragment } from "react";
import EventDisplay from "./event-display";
import SpeakersDisplay from "./speaker-display";
import { ConferenceType } from "@/lib/types";
import clsx from "clsx";

export default function ConferenceDisplay(
  { conference }: {
    conference: ConferenceType;
  },
) {
  const length = conference.events.length;

  return (
    <div>
      <h2
        style={{ fontFamily: "Abril Fatface" }}
        className="w-fit text-3xl lg:text-4xl font-semibold text-orange-500 uppercase mb-5 lg:mb-7"
      >
        {conference.title}
      </h2>
      <div
        className={clsx("grid md:grid-cols-2 grid-cols-1 gap-4 mb-4 lg:mb-8", {
          "xl:grid-cols-3": length >= 3,
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
      {conference.speakers.length > 0 &&
        <SpeakersDisplay conference={conference} />}
    </div>
  );
}
