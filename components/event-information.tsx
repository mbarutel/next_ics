"use client";

import clsx from "clsx";
import React, { useState } from "react";
import { Agenda, EventText, Masterclass } from ".";
import { AgendaType, EventType, MasterclassType } from "@/lib/types";

export default function EventInformation(event: EventType) {
  const [tab, setTab] = useState<"Information" | "Agenda" | "Masterclass">(
    "Information",
  );

  const agenda = event.agenda.length > 0 ? event.agenda : null;
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
      content = <EventText event={event} />;
      break;
  }
  return (
    <article className="section_top_margin">
      <div className="section_container">
        <Tabs
          tab={tab}
          setTab={setTab}
          agenda={agenda}
          masterclass={masterclasses}
        />
        <section className="bg-stone-800/80 py-5 px-3 sm:px-7 rounded-sm">
          {content}
        </section>
      </div>
    </article>
  );
}

type TabsProps = {
  tab: string;
  setTab: React.Dispatch<
    React.SetStateAction<"Information" | "Agenda" | "Masterclass">
  >;
  agenda: AgendaType[] | null;
  masterclass: MasterclassType[] | null;
};
function Tabs({ tab, setTab, agenda, masterclass }: TabsProps) {
  return (
    <div className="event_button_wrapper">
      <button
        onClick={() => setTab("Information")}
        className={clsx(
          "event_tab_text px-3 bg-stone-800/80 font-extrabold py-3",
          { "bg-gradient-to-r gradient text-stone-800 rounded-md sm:rounded-b-none": tab === "Information" },
        )}
      >
        Information
      </button>
      {agenda && (
        <button
          onClick={() => setTab("Agenda")}
          className="event_tab_text font-extrabold py-3"
        >
          Agenda
        </button>
      )}
      {masterclass && (
        <button
          onClick={() => setTab("Masterclass")}
          className="event_tab_text font-extrabold py-3"
        >
          Masterclass
        </button>
      )}
    </div>
  );
}
