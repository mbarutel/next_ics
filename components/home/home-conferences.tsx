import dayjs from "dayjs";
import Link from "next/link";
import Image from "next/image";
import React, { Fragment } from "react";
import { ConferenceType, EventType } from "@/lib/types";
import { configs } from "@/lib/data";

// export default function HomeConferences({
//   conferences,
// }: {
//   conferences: ConferenceType[];
// }) {
//   return (
//     <section id="conferences" className="section_padding">
//       <div className="section_container">
//         <h2 className="title">Upcoming Conferences</h2>
//         <div className="relative grid grid-cols-1 xl:grid-cols-2 gap-y-3 gap-x-4">
//           <div className="hidden xl:block absolute h-full top-0 left-1/2 -translate-x-1/2 w-1 bg-gray-400 rounded-full opacity-90" />
//           {conferences.map((conference) => (
//             <Fragment key={conference.slug}>
//               <ConferenceCard {...conference} />
//             </Fragment>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
//
// function ConferenceCard(conference: ConferenceType) {
//   return (
//     <div className="group relative grid grid-cols-2 bg-stone-700 overflow-hidden rounded-md">
//       <div className="my-4 pl-4 z-10">
//         <Link
//           href={`/conference/${conference.slug}`}
//           className="text-yellow-400 group"
//         >
//           <h3 className="text-white text-lg leading-tight font-medium group-active:scale-95 transition-all">
//             {conference.title}
//           </h3>
//           <Date date={conference.date} />
//           <h4 className="-mt-0.5 mb-1">{conference.venue}</h4>
//         </Link>
//         <CallToActionButtons
//           slug={conference.slug}
//           registration={conference.formLink}
//         />
//       </div>
//       <AboriginalIcon />
//       <div className="relative clip-path-polygon-[20%_0,_100%_0,_100%_100%,_10%_100%] z-10">
//         <Image
//           src={conference.coverImage.src}
//           alt={conference.coverImage.alt}
//           fill
//           sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//           className="hidden md:block object-cover grayscale-[75%] transition_config group-hover:grayscale-0 z-40 group-hover:scale-110"
//         />
//       </div>
//     </div>
//   );
// }
//
// function AboriginalIcon() {
//   return (
//     <div className="absolute left-1/2 -translate-x-1/2 translate-y-1/2 bottom-0 z-0">
//       <div className="relative h-96 w-96">
//         <Image
//           src="/assets/images/conference-card-icon.svg"
//           alt="Aboriginal Conferences"
//           fill
//           sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//           className="object-cover grayscale opacity-10"
//         />
//       </div>
//     </div>
//   );
// }
//
// function Date({
//   date,
// }: {
//   date: { startDate: Date; endDate: Date } | undefined;
// }) {
//   return (
//     <h4 className="mt-1">
//       {date ? (
//         <>
//           {dayjs(date.startDate).format("DD - ")}
//           {dayjs(date.endDate).format("DD MMMM YY")}
//         </>
//       ) : (
//         <>TBA</>
//       )}
//     </h4>
//   );
// }
//
// function CallToActionButtons({
//   slug,
//   registration,
// }: {
//   slug: string;
//   registration: string | undefined;
// }) {
//   return (
//     <div className="md:left-auto flex flex-wrap gap-1 text-sm">
//       <Link
//         href={`/conference/${slug}`}
//         className="bg-black text-white rounded-md hover:-translate-y-1 transition-all active:translate-y-1 duration-100 px-3 py-2"
//       >
//         Learn&nbsp;More
//       </Link>
//       <Link
//         href={configs.forms.submitPaper}
//         target="_blank"
//         rel="noopener noreferrer"
//         className="bg-yellow-300 text-black rounded-md hover:-translate-y-1 transition-all active:translate-y-1 duration-100 px-3 py-2"
//       >
//         Submit&nbsp;A&nbsp;Paper
//       </Link>
//       {registration && (
//         <Link
//           href={registration}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="bg-yellow-400 text-black rounded-md hover:-translate-y-1 transition-all active:translate-y-1 duration-100 px-3 py-2"
//         >
//           Registration
//         </Link>
//       )}
//     </div>
//   );
// }
type HomeConferencesProp = {
  conferences: ConferenceType[];
};
export default function HomeConferences({ conferences }: HomeConferencesProp) {
  return (
    <section id="conferences">
      <div className="container py-14">
        <h2 className="title">Upcoming Conferences</h2>
        {conferences.map((conference) => (
          <Fragment key={conference.slug}>
            <ConferenceRow conference={conference} />
          </Fragment>
        ))}
      </div>
    </section>
  );
}

type ConferenceRowProp = {
  conference: ConferenceType;
};
function ConferenceRow({ conference }: ConferenceRowProp) {
  if (!conference.date) {
    return null;
  }

  return (
    <div className="mb-12 last:mb-0">
      <div className="flex items-center gap-2">
        <h3 className="space_mono uppercase text-lg">
          {dayjs(conference.date.startDate).format("MMMM YYYY")}
        </h3>
        <hr className="grow" />
      </div>
      {conference.events.map((event) => (
        <Fragment key={event.slug}>
          <EventRow
            event={event}
            slug={conference.slug}
            paperLink={conference.submitPaperLink}
          />
        </Fragment>
      ))}
    </div>
  );
}

type EventRowProp = {
  event: EventType;
  slug: string;
  paperLink: string | undefined;
};
function EventRow({ event, slug, paperLink }: EventRowProp) {
  if (!event.conference || !event.conference.date) {
    return null;
  }
  return (
    <div className="flex pt-6">
      <div className="px-12">
        <h4 className="space_mono text-center">
          <span className="text-lg font-semibold">
            {dayjs(event.conference.date.startDate).format("ddd")}
          </span>
          <br />
          <span>{dayjs(event.conference.date.startDate).format("DD")}</span>
        </h4>
      </div>
      <div className="arvo">
        <h4 className="text-lg mb-2">
          {dayjs(event.conference.date.startDate).format("MMMM D, YYYY - ")}
          {dayjs(event.conference.date.endDate).format("MMMM D, YYYY")}
        </h4>
        <Link
          href={`/event/${event.slug}`}
          className="text-yellow-400 text-lg hover:underline hover:italic"
        >
          <h2>{event.title}</h2>
        </Link>
        <h5 className="mb-6">{event.conference.venue}</h5>
        <p className="text-justify">{event.description}</p>
        <div className="my-6 flex gap-4">
          <Link href={`/registration/${slug}`} className="button_primary">
            Register
          </Link>
          {paperLink && (
            <Link href={paperLink} className="button_secondary">
              Submit A Paper
            </Link>
          )}
        </div>
        <hr />
      </div>
    </div>
  );
}
