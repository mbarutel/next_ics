import React, { Fragment } from "react";
import EventDisplay from "./event-display";
import SpeakersDisplay from "./speaker-display";
import { ConferencesType } from "@/contentful/types/types";


export default function ConferenceDisplay(
  { conference, grid }: { conference: ConferencesType, grid: string },
) {

  return (
    <div>
      <span className="w-fit mb-5 flex flex-col gap-0">
        <h2 className="w-fit text-2xl font-semibold text-orange-500">
          {conference.title}
        </h2>
        <span className="inline-flex h-1 bg-orange-500/80 w-3/4" />
      </span>
      <div className={`grid grid-cols-1 md:${grid} gap-4 lg:gap-8 mb-4 lg:mb-8`}>
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
