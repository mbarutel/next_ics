import React, { Fragment } from "react";
import { ConferencesType } from "@/contentful/types/types";
import Link from "next/link";

export default function UpcomingEvents(
  { conferences }: { conferences: ConferencesType[] },
) {
  return (
    <section className="pt-8 lg:pt-12">
      <div className="container flex flex-col">
        <span className="w-fit mb-6 sm:mb-10 flex flex-col gap-2">
          <h2 className="w-fit section_header text-orange-500">
            Upcoming Events
          </h2>
          <span className="inline-flex h-1 bg-orange-500 w-3/4" />
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
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
            <div key={event.slug} className="flex flex-col">
              <h4 className="mb-2">{conference.title}</h4>
              <h3
                style={{ fontFamily: "Gabarito" }}
                className="text-2xl text-slate-800 mb-4"
              >
                {event.title}
              </h3>
              <p className="flex-grow">{event.description}</p>
              <div className="w-full h-[2px] bg-black/80 my-3" />
              <Link
                href={event.slug}
                className="relative w-fit inline-flex group mt-3 button_padding bg-slate-700  text-white transition-all active:scale-95"
              >
                <span className="z-10">
                  Learn More
                </span>
                <span className="absolute h-full w-0 left-0 bottom-0 group-hover:w-full bg-slate-950 transition-all ease-in-out z-0" />
              </Link>
            </div>
          );
        }
      })}
    </>
  );
}
