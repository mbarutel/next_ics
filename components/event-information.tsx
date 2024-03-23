"use client";

import clsx from "clsx";
import React, { useState } from "react";
import { Agenda, EventText, Masterclass } from ".";
import { AgendaType, EventType, MasterclassType } from "@/lib/types";

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
      content = <EventText event={event} />;
      break;
  }
  return (
    <article className="section_margin">
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
    React.SetStateAction<"Conference" | "Agenda" | "Masterclass">
  >;
  agenda: AgendaType[] | null;
  masterclass: MasterclassType[] | null;
};
function Tabs({ tab, setTab, agenda, masterclass }: TabsProps) {
  return (
    <div className="event_tabs_wrapper">
      <button
        onClick={() => setTab("Conference")}
        className={clsx(
          "event_tab_text px-3 bg-stone-800/80 font-extrabold py-3 rounded-md sm:rounded-b-none transition_config",
          {
            "bg-gradient-to-r gradient text-stone-800 rounded-md sm:rounded-b-none":
              tab === "Conference",
              "sm:border-b-2 sm:border-stone-900 hover:-translate-y-1" : tab !== "Conference",
          },
        )}
      >
        Conference
      </button>
      {agenda && (
        <button
          onClick={() => setTab("Agenda")}
          className={clsx(
            "event_tab_text px-3 bg-stone-800/80 font-extrabold py-3 rounded-md sm:rounded-b-none transition_config",
            {
              "bg-gradient-to-r gradient text-stone-800 rounded-md sm:rounded-b-none":
                tab === "Agenda",
              "sm:border-b-2 sm:border-stone-900 hover:-translate-y-1" : tab !== "Agenda",
            },
          )}
        >
          Agenda
        </button>
      )}
      {masterclass && (
        <button
          onClick={() => setTab("Masterclass")}
          className={clsx(
            "event_tab_text px-3 bg-stone-800/80 font-extrabold py-3 rounded-md sm:rounded-b-none transition_config",
            {
              "bg-gradient-to-r gradient text-stone-800 rounded-md sm:rounded-b-none":
                tab === "Masterclass",
              "sm:border-b-2 sm:border-stone-900 hover:-translate-y-1" : tab !== "Masterclass",
            },
          )}
        >
          Masterclass
        </button>
      )}
    </div>
  );
}
