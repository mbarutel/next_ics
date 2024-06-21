"use client";

import React, { useState } from "react";
import EventAgenda from "./event-agenda";
import EventContent from "./event-content";
import EventMasterclass from "./event-masterclass";
import { EventType } from "@/lib/types";
import EventTabs from "./event-tabs";

export default function EventInformation(event: EventType) {
  const [tab, setTab] = useState<"Conference" | "Agenda" | "Masterclass">(
    "Conference",
  );

  let agenda = null;
  if (event.conference && event.conference.agenda.length) {
    agenda = event.conference.agenda;
  }
  const masterclasses =
    event.conference && event.conference.masterclass.length > 0
      ? event.conference.masterclass
      : null;

  let content;

  switch (tab) {
    case "Agenda":
      content = agenda && <EventAgenda agenda={agenda} />;
      break;
    case "Masterclass":
      content = masterclasses && (
        <EventMasterclass masterclass={masterclasses} />
      );
      break;
    default:
      content = <EventContent event={event} />;
      break;
  }
  return (
    <section id="information" className="section_margin">
      <div className="section_container">
        <EventTabs
          tab={tab}
          setTab={setTab}
          agenda={agenda}
          masterclass={masterclasses}
        />
        <article className="bg-stone-800/80 py-5 px-3 sm:px-7 rounded-sm">
          {content}
        </article>
      </div>
    </section>
  );
}
