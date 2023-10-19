import React, { Fragment } from "react";
import { ConferencesType } from "@/contentful/types/types";
import EventDisplay from "./event-display";
import SpeakersDisplay from "./speaker-display";

export default function ConferenceDisplay(
  { conference }: { conference: ConferencesType },
) {
  return (
    <div>
      <span className="w-fit mb-5 flex flex-col gap-0">
        <h2 className="w-fit text-2xl font-semibold text-orange-500">
          {conference.title}
        </h2>
        <span className="inline-flex h-1 bg-orange-500/80 w-3/4" />
      </span>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-8 mb-4 lg:mb-8">
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
