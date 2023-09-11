import React from "react";
import { fetchConferencePages } from "@/contentful/services/conferences";
import { draftMode } from "next/headers";
import Header from "@/components/common/Header";
import ConferenceCard from "@/components/home/ConferenceCard";
import CallToAction from "@/components/common/CallToAction";

export default async function page() {
  const conferencePages = await fetchConferencePages({
    preview: draftMode().isEnabled,
  });

  return (
    <>
      <Header
        link="#conferences"
        text="To get started, check the information below"
      />
      <section id="conferences">
        <div className="container">
          <h2 className="section_header text-night text-center sm:text-left pb-6">
            Upcoming ICS Conferences
          </h2>
          <div className="grid grid-cols-2 gap-2 lg:gap-8">
            {conferencePages.map((conferencePage) => (
              <div key={conferencePage.slug} className="flex flex-col">
                <ConferenceCard conferencePage={conferencePage} />
              </div>
            ))}
          </div>
        </div>
      </section>
      <CallToAction />
    </>
  );
}
