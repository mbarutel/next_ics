import React from "react";
import ConferenceCards from "./ConferenceCards";
import Link from "next/link";

export default function UpcomingConferences() {
  return (
    <section id="conferences">
      <div className="container">
        <h2 className="section_header text-stone-600/80 text-center">
          Upcoming Conferences
        </h2>
        <ConferenceCards />
        <Link
          href="/conferences"
          className="btn effects bg-stone-600 text-white/90"
        >
          More Conferences
        </Link>
      </div>
    </section>
  );
}
