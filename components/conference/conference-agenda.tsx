"use client";

import { AgendaRowType, AgendaType } from "@/lib/types";
import { GoDotFill } from "react-icons/go";
import { Fragment, useState } from "react";
import { BsChevronRight } from "react-icons/bs";
import clsx from "clsx";

type ConferenceAgendaProp = {
  agenda: AgendaType[];
};
export default function ConferenceAgenda({ agenda }: ConferenceAgendaProp) {
  if (!agenda.length) {
    return null;
  }

  return (
    <section className="section_margin">
      <div className="section_container">
        <h2 className="title text-center">Conference Agenda</h2>
        <div className="py-6 flex_col gap-4">
          {agenda.map((day, index) => {
            const lastDay = index === agenda.length - 1;

            return (
              <Fragment key={index}>
                <ConferenceAgendaDay
                  index={index}
                  lastDay={lastDay}
                  agendaRow={{ ...day }}
                />
              </Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
}

type ConferenceAgendaDayProp = {
  index: number;
  lastDay: boolean;
  agendaRow: AgendaType;
};

function ConferenceAgendaDay({
  index,
  lastDay,
  agendaRow,
}: ConferenceAgendaDayProp) {
  const [open, setOpen] = useState<boolean>(!index ? true : false);

  return (
    <div className="flex_col items-center mb-2 last:mb-0">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="relative h-[3.5rem] w-[15rem]"
      >
        <div className="bg-yellow-400 translate-x-2 translate-y-2 absolute inset-0 z-0" />
        <div className="absolute inset-0 flex_center gap-3 z-10 bg_accent shadow">
          <BsChevronRight
            className={clsx("text-white", { "rotate-90": open })}
          />
          {agendaRow.title}
        </div>
      </button>
      <div className={clsx("w-[min(95%,60rem)] mt-8", { hidden: !open })}>
        {agendaRow.row.map((row, index) => (
          <Fragment key={index}>
            <AgendaDaySchedule lastDay={lastDay} schedule={{ ...row }} />
          </Fragment>
        ))}
      </div>
    </div>
  );
}

type AgendaDayScheduleType = {
  lastDay: boolean;
  schedule: AgendaRowType;
};
function AgendaDaySchedule({ lastDay, schedule }: AgendaDayScheduleType) {
  const breakoutText = !lastDay && schedule.agenda.length > 1;

  return (
    <div className="grid grid-cols-12 group">
      <h5 className="col-span-3 text-sm md:text-base font-medium italic">
        {schedule.time}
      </h5>
      <div className="w-fit flex_col col-span-1">
        <GoDotFill className="text-2xl md:text-3xl" />
        <div className="w-[24px] md:w-[30px] flex-grow flex_center group-last:hidden">
          <div className="h-full w-[2px] bg-white/10" />
        </div>
      </div>
      <div className="col-span-8">
        {breakoutText && <small className="italic">(Breakout session)</small>}
        <ul className="flex_col gap-1 justify-center">
          {schedule.agenda.map((text, index) => (
            <li
              key={index}
              className="leading-tight text-sm xl:text-base last:mb-5 first:mt-1"
            >
              {schedule.agenda.length > 1 && "- "}
              {text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
