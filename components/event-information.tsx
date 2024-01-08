"use client";

import React, { useState } from "react";
import { AgendaType, EventType, MasterclassType } from "@/lib/types";
import { Agenda, EventText, Masterclass } from ".";
import clsx from "clsx";

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
    <article>
      <div className="section_container">
        <Tabs
          tab={tab}
          setTab={setTab}
          agenda={agenda}
          masterclass={masterclasses}
        />
        <section className="bg-stone-800/80 py-5 px-7 rounded-sm">
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
    <div className="flex gap-2 mb-4">
      <button onClick={() => setTab("Information")} className="tab_button">
        <span
          className={clsx({
            "border-b-[7px] border-yellow-400": tab === "Information",
          })}
        >
          Information
        </span>
      </button>
      {agenda && (
        <button onClick={() => setTab("Agenda")} className="tab_button">
          <span
            className={clsx({
              "border-b-[7px] border-yellow-400": tab === "Agenda",
            })}
          >
            Agenda
          </span>
        </button>
      )}
      {masterclass && (
        <button onClick={() => setTab("Masterclass")} className="tab_button">
          <span
            className={clsx({
              "border-b-[7px] border-yellow-400": tab === "Masterclass",
            })}
          >
            Masterclass
          </span>
        </button>
      )}
    </div>
  );
}
