"use client";

import { AgendaType, EventType, SpeakerType } from "@/lib/types";
import { Fragment, useState } from "react";
import ConferenceSpeakers from "./conference-speakers";
import ConferenceEvents from "./conference-events";
import ConferenceAgenda from "./conference-agenda";
import clsx from "clsx";

type ConferenceKeypointsProps = {
  events: EventType[];
  speakers: SpeakerType[];
  agenda: AgendaType[];
};

enum TabTypes {
  conferences = "Conferences",
  speakers = "Speakers",
  agenda = "Agenda",
}

export default function ConferenceKeypoints({
  events,
  speakers,
  agenda,
}: ConferenceKeypointsProps) {
  let content: React.JSX.Element;
  const buttons = [TabTypes.conferences];
  const [tab, setTab] = useState<TabTypes>(
    speakers.length === 0 ? TabTypes.conferences : TabTypes.speakers,
  );

  if (speakers.length) {
    buttons.push(TabTypes.speakers);
  }

  if (agenda.length) {
    buttons.push(TabTypes.agenda);
  }

  const onClickTab = (tabSelected: TabTypes) => {
    setTab(tabSelected);
  };

  switch (tab) {
    case TabTypes.conferences:
      content = <ConferenceEvents events={events} />;
      break;
    case TabTypes.speakers:
      content = <ConferenceSpeakers speakers={speakers} />;
      break;
    case TabTypes.agenda:
      content = <ConferenceAgenda agenda={agenda} />;
      break;
  }

  return (
    <section id="conference">
      <div className="section_container">
        <div className="flex py-3 gap-x-6">
          {buttons.map((button, index) => (
            <Fragment key={index}>
              <label className="cursor-pointer">
                <h2
                  className={clsx("title", {
                    "underline italic text-yellow-400": tab === button,
                  })}
                >
                  {button}
                </h2>
                <input
                  type="radio"
                  value={button}
                  className="peer hidden"
                  onClick={() => onClickTab(button)}
                />
              </label>
            </Fragment>
          ))}
        </div>
        <div>{content}</div>
      </div>
    </section>
  );
}
