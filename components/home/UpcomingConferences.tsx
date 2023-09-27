import React from "react";
import ConferenceCards from "./ConferenceCards";
import { draftMode } from "next/headers";
import { fetchConferencePages } from "@/contentful/services/conferences";

export default async function UpcomingConferences() {
  const conferencePages = await fetchConferencePages({
    preview: draftMode().isEnabled,
  });
  return (
    <section id="conferences">
      <div className="container">
        <h2 className="section_header text-night text-center">
          Upcoming Events
        </h2>
        <ConferenceCards conferences={conferencePages} />
      </div>
    </section>
  );
}
