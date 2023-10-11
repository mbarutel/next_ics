import React from "react";
import ConferenceCards from "./ConferenceCards";
import { draftMode } from "next/headers";
import { fetchConferencePages } from "@/contentful/services/conference";

export default async function UpcomingConferences() {
  const conferencePages = await fetchConferencePages({
    preview: draftMode().isEnabled,
  });
  return (
    <section id="conferences">
      <div className="container">
        <h2 className="section_header text-orange-500 text-center">
          Upcoming Events
        </h2>
        <ConferenceCards conferences={conferencePages} />
      </div>
    </section>
  );
}
