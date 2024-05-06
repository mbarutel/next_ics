"use client";

import clsx from "clsx";
import React, { useState } from "react";
import { Agenda, EventContent, Masterclass } from ".";
import { AgendaType, EventType, MasterclassType } from "@/lib/types";
import Tabs from "./event/event-tabs";

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
      content = agenda && <Agenda agenda={agenda} />;
      break;
    case "Masterclass":
      content = masterclasses && <Masterclass masterclass={masterclasses} />;
      break;
    default:
      content = <EventContent event={event} />;
      break;
  }
  return (
    <section className="section_margin">
      <div className="section_container">
        <Tabs
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
