import React, { Fragment } from "react";
import { ConferencesType } from "@/contentful/types/types";
import Link from "next/link";

export default function UpcomingEvents(
  { conferences }: { conferences: ConferencesType[] },
) {
  return (
    <section>
      <div className="container">
        <h2 className="section_header mb-3">Upcoming Events</h2>
        <div className="grid sm:grid-cols-3 gap-8">
          {conferences.map((conference) => (
            <Fragment key={conference.slug}>
              <Events conference={conference} />
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

// function Events({ events }: { events: (EventType | null)[] }) {
//   return (
//     <div>
//       {events.map((event) => {
//         if (!event) {
//           return null;
//         } else {
//           return (
//             <span key={event.slug}>
//             </span>
//           );
//         }
//       })}
//     </div>
//   );
// }

function Events({ conference }: { conference: ConferencesType }) {
  return (
    <>
      {conference.events.map((event) => {
        if (!event) {
          return null;
        } else {
          return (
            <span key={event.slug}>
              <h4 className="mb-4">{conference.title}</h4>
              <h3 className="text-2xl">{event.title}</h3>
              <div className="w-full h-[2px] bg-black/80 my-3" />
              <p>{event.description}</p>
              <Link
                href={event.slug}
                className="relative inline-flex group mt-3 px-4 py-3 bg-slate-700  text-white transition-all active:scale-95"
              >
                <span className="z-10">
                  Learn More
                </span>
                <span className="absolute h-full w-0 left-0 bottom-0 group-hover:w-full bg-slate-950 transition-all ease-in-out z-0" />
              </Link>
            </span>
          );
        }
      })}
    </>
  );
}
