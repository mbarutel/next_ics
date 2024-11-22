import dayjs from "dayjs";
import Link from "next/link";
import React, { Fragment } from "react";
import { ConferenceType, EventType } from "@/lib/types";

type HomeConferencesProp = {
  conferences: ConferenceType[];
};
export default function HomeConferences({ conferences }: HomeConferencesProp) {
  return (
    <section id="conferences">
      <div className="container">
        <h2 className="section_title">Upcoming Conferences</h2>
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
        <h3 className="space_mono uppercase text-xl">
          {dayjs(conference.date.startDate).format("DD MMMM YYYY")}
        </h3>
        <hr className="grow border-t-2" />
      </div>
      {conference.events.map((event) => (
        <Fragment key={event.slug}>
          <EventRow
            event={event}
            slug={conference.slug}
            paperLink={conference.submitPaperLink}
            speakerSet={conference.speakers.length === 0 ? false : true}
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
  speakerSet: boolean;
};
function EventRow({ event, slug, paperLink, speakerSet }: EventRowProp) {
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
          <Link
            href={`/conference/${slug}#conference`}
            className="button_secondary"
          >
            {speakerSet ? "View Speakers" : "Learn More"}
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
