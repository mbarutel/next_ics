import React, { Fragment } from "react";
import { draftMode } from "next/headers";
import { fetchConferencePages } from "@/contentful/services/conferences";
import { Media } from "@/contentful/types/types";
import { ConferencePage } from "@/contentful/types/types";
import Link from "next/link";

export default function UpcomingConferences() {
  return (
    <section>
      <div className="container">
        <h2>Upcoming Conferences</h2>
        <ConferenceCards />
      </div>
    </section>
  );
}

async function ConferenceCards() {
  const conferencePages = await fetchConferencePages({
    preview: draftMode().isEnabled,
  });

  return (
    <div>
      <h3 className="text-center">2023</h3>
      <div className="flex gap-5">
        {conferencePages.map((conferencePage) => {
          console.log(conferencePage);
          return (
            <Fragment key={conferencePage.slug}>
              <ConferenceCard conferencePage={conferencePage} />
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}

// type ConferenceCardProps = {
//   title: string;
// };

function ConferenceCard({ conferencePage }) {
  return (
    <Link
      href={`/conferences/slug`}
      target="_blank"
      rel="noreferrer"
      className="h-28 w-28 bg-off_yellow"
    >
      {conferencePage.title}
    </Link>
  );
}
