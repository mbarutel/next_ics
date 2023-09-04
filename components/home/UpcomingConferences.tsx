import React from "react";
import ConferenceCards from "./ConferenceCards";

export default function UpcomingConferences() {
  return (
    <section>
      <div className="container">
        <h2 className="section_header">Upcoming Conferences</h2>
        <ConferenceCards />
      </div>
    </section>
  );
}

