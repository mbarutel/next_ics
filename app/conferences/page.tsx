import React from "react";
import { fetchConferencePages } from "@/contentful/services/conferences";
import { draftMode } from "next/headers";
import Header from "@/components/common/Header";
import ConferencesPageCard from "@/components/conference/ConferencesPageCard";
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
          <h2 className="section_header text-amber-800 text-center !mb-0">
            Upcoming ICS&nbsp;Conferences
          </h2>
          <h3 className="text-center text-sm sm:text-lg text-red-700/70 font-semibold mb-10 py-3 rounded-xl tracking-tighter">
            We begin by acknowledging the traditional custodians of the land on
            which we operate and pay our respects to Elders past, present, and
            emerging.<br />{" "}
            We encourage all to learn about the Indigenous history of their
            local area.
          </h3>
          <div className="grid grid-cols-1 gap-2 lg:gap-8">
            {conferencePages.map((conferencePage) => (
              <div key={conferencePage.slug} className="flex flex-col">
                <ConferencesPageCard conferencePage={conferencePage} />
              </div>
            ))}
          </div>
        </div>
      </section>
      <CallToAction />
    </>
  );
}
