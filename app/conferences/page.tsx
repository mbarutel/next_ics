import React, { Fragment } from "react";
import { fetchConferencePages } from "@/contentful/services/conferences";
import { draftMode } from "next/headers";
import Header from "@/components/common/Header";
import ConferencesPageCard from "@/components/conference/ConferencesPageCard";
import CallToAction from "@/components/common/CallToAction";
import { ConferencePage, Conferences } from "@/contentful/types/types";

type ConferenceMonth = {
  month: string;
  conferences: ConferencePage[];
};

type ConferenceYear = {
  year: string;
  conferences: ConferenceMonth[];
};

function groupFunctionByMonth(
  { conference, conferences }: {
    conference: ConferencePage;
    conferences: ConferencePage[];
  },
) {
  const startDate = new Date(conference.startDate);
  const month = startDate.getMonth().toString();
  const foundMonth = conferences.find((conferenceMonth) =>
    conferenceMonth.month === month
  );
}

function groupConferences(
  { conferences }: { conferences: ConferencePage[] },
) {
  let conferencesByYear: ConferenceYear[] = [];

  conferences.forEach((conference) => {
    const startDate = new Date(conference.startDate);
    const year = startDate.getFullYear().toString();

    const foundYear = conferencesByYear.find((conferenceYear) =>
      conferenceYear.year === year
    );

    if (!foundYear) {
      const newYear: ConferenceYear = {
        year: year,
        conferences: groupConferencesByMonth(conference, []),
      };
    }
  });

  // const month = startDate.getMonth();
  // const year = startDate.getFullYear();
}

export default async function page() {
  const conferences = await fetchConferencePages({
    preview: draftMode().isEnabled,
  });

  groupConferences({ conferences });

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
            {conferences.map((conferencePage) => (
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
