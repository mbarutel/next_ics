import React, { Fragment } from "react";
import { draftMode } from "next/headers";
import { fetchConferencePages } from "@/contentful/services/conferences";
import ConferenceCard from "./ConferenceCard";

export default async function ConferenceCards() {
  const conferencePages = await fetchConferencePages({
    preview: draftMode().isEnabled,
  });

  return (
    <div className="flex flex-col items-center mb-6">
      <h3 className="text-[1.2rem] sm:text-2xl text-yellow-400 font-semibold mb-2 sm:mb-5">
        2023
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
        {conferencePages.map((conferencePage) => (
          <Fragment key={conferencePage.slug}>
            <ConferenceCard conferencePage={conferencePage} />
          </Fragment>
        ))}
      </div>
    </div>
  );
}
