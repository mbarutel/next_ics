import React, { Fragment } from "react";
import { fetchConferences } from "@/contentful";
import { draftMode } from "next/headers";
import Header from "@/components/common/Header";
import ConferencesPageCard from "@/components/conference/ConferencesPageCard";
import CallToAction from "@/components/common/CallToAction";
// import { ConferencePage, Conferences } from "@/contentful/types/types";

// type ConferenceMonth = {
//   month: string;
//   conferences: ConferencePage[];
// };
//
// type ConferenceYear = {
//   year: string;
//   conferences: ConferenceMonth[];
// };
//
// function groupConferencesByMonth(
//   { conference, conferencesMonth }: {
//     conference: ConferencePage;
//     conferencesMonth: ConferenceMonth[];
//   },
// ) {
//   const startDate = new Date(conference.startDate);
//   const month = startDate.getMonth().toString();
//
//   const foundMonth = conferencesMonth.find((conferenceMonth) =>
//     conferenceMonth.month === month
//   );
//
//   if (!foundMonth) {
//     const newMonth = {
//       month: month,
//       conferences: [{ ...conference }],
//     };
//     return conferencesMonth.concat(newMonth);
//   } else {
//     const updatedMonth = {
//       ...foundMonth,
//       conferences: foundMonth.conferences.concat(conference),
//     };
//     return conferencesMonth.map((conferencesMonth) =>
//       conferencesMonth.month === month ? updatedMonth : conferencesMonth
//     );
//   }
// }
//
// function groupConferences(
//   { conferences }: { conferences: ConferencePage[] },
// ) {
//   let conferencesByYear: ConferenceYear[] = [];
//
//   conferences.forEach((conference) => {
//     const startDate = new Date(conference.startDate);
//     const year = startDate.getFullYear().toString();
//
//     const foundYear = conferencesByYear.find((conferenceYear) =>
//       conferenceYear.year === year
//     );
//
//     if (!foundYear) {
//       const newYear: ConferenceYear = {
//         year: year,
//         conferences: groupConferencesByMonth({
//           conference: conference,
//           conferencesMonth: [],
//         }),
//       };
//       conferencesByYear = conferencesByYear.concat(newYear);
//     } else {
//       const updatedYear = {
//         ...foundYear,
//         conferences: groupConferencesByMonth({
//           conference: conference,
//           conferencesMonth: foundYear.conferences,
//         }),
//       };
//       conferencesByYear = conferencesByYear.map((conferenceYear) =>
//         conferenceYear.year === year ? updatedYear : conferenceYear
//       );
//     }
//   });
//
//   return conferencesByYear;
// }

export default async function page() {
  // const conferences = await fetchConferencePages({
  //   preview: draftMode().isEnabled,
  // });
  const conferences = await fetchConferences({
    preview: draftMode().isEnabled,
  });

  return (
    <>
      <Header conferences={conferences} />
      <section className="pt-8 lg:pt-12">
        <div className="container">
          <h2 className="section_header text-orange-500 text-center">
            Upcoming Conferences
          </h2>
        </div>
      </section>
    </>
  );
}
