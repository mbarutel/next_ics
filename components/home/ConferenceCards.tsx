import React, { Fragment } from "react";
import { draftMode } from "next/headers";
import { fetchConferencePages } from "@/contentful/services/conferences";
import ConferenceCard from "./ConferenceCard";
import Link from "next/link";

export default async function ConferenceCards() {
  const conferencePages = await fetchConferencePages({
    preview: draftMode().isEnabled,
  });

  return (
    <div className="flex flex-col items-center">
      <h3>2023</h3>
      <div className="flex gap-5">
        {conferencePages.map((conferencePage) => (
          <Fragment key={conferencePage.slug}>
            <ConferenceCard conferencePage={conferencePage} />
          </Fragment>
        ))}
      </div>
      <Link href="/conferences" className="btn bg-light_gray text-white font-medium mt-10">
        More Conferences
      </Link>
    </div>
  );
}
