import React, { Fragment } from "react";
import { ConferencesType } from "@/contentful/types/types";
import EventDisplay from "./event-display";

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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-none lg:grid-flow-col lg:auto-cols-auto gap-8">
        {conference.events.map((event) => (
          event === null ? null : (
            <Fragment key={event.slug}>
              <EventDisplay
                event={event}
                startDate={conference.startDate}
                endDate={conference.endDate}
                venue={conference.venue}
                registrationLink={conference.registrationLink}
              />
            </Fragment>
          )
        ))}
      </div>
    </div>
  );
}

