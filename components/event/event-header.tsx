"use client";

import React from "react";
import { EventType } from "@/lib/types";
import HeaderDate from "../shared/header-date";
import SpinningBackground from "../shared/spinning-header";
import HeaderFormLinks from "../shared/header-form-links";

export default function EventHeader(event: EventType) {
  return (
    <header>
      <div className="section_container">
        <div className="header_wrapper">
          <EventInfo {...event} />
          <SpinningBackground />
        </div>
      </div>
    </header>
  );
}

function EventInfo(event: EventType) {
  return (
    <div className="z-40 absolute top-1/2 -translate-y-1/2 left-4">
      <div className="md:max-w-[75%]">
        <h1 className="uppercase font-extrabold header_sizes">{event.title}</h1>
        {event.conference && (
          <>
            <HeaderDate date={event.conference.date} />
            <h2 className="header_subtext -mt-3">{event.conference.venue}</h2>
            <HeaderFormLinks
              registration={event.conference.formLink}
              submitAPaper={event.conference.submitPaperLink}
            />
          </>
        )}
      </div>
    </div>
  );
}
