import React, {Fragment} from "react";
import { fetchConferencePages } from "@/contentful/services/conferences";
import { draftMode } from "next/headers";
import Header from "@/components/common/Header";
import ConferencesPageCard from "@/components/conference/ConferencesPageCard";
import CallToAction from "@/components/common/CallToAction";
import { ConferencePage } from "@/contentful/types/types";

// function groupConferencesByMonth(
//   { conferences }: ConferencePage[],
// ) {
//   const groupedEvents: any = {};
//
//   for (let i = 1; i < conferences.length; i++) {
//     const startDate = new Date(conferences[i].startDate);
//     const month = startDate.getMonth();
//     const year = startDate.getFullYear();
//     const key = `${year}-${month + 1}`;
//
//     if (!groupedEvents[key]) {
//       groupedEvents[key] = [];
//     }
//
//     groupedEvents[key].push(conferences[i]);
//   }
//
//   return groupedEvents;
// }

export default async function page() {
  const conferencePages = await fetchConferencePages({
    preview: draftMode().isEnabled,
  });

  // console.log(groupConferencesByMonth(conferencePages));

  return (
    <>
      <Header
        link="#conferences"
        text="To get started, check the information below"
      />
      <section id="conferences">
        <div className="container">
          <h2 className="section_header text-amber-800 text-center">
            Upcoming ICS&nbsp;Conferences
          </h2>
          <div className="grid grid-cols-1 gap-2 lg:gap-8">
            {conferencePages.map((conferencePage) => (
              <Fragment key={conferencePage.slug}>
                <ConferencesPageCard conferencePage={conferencePage} />
              </Fragment>
            ))}
          </div>
        </div>
      </section>
      <CallToAction />
    </>
  );
}
