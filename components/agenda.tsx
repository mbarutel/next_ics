"use client";

import { GoDotFill } from "react-icons/go";
import React, { useState } from "react";
import { AgendaType } from "@/lib/types";
import clsx from "clsx";

export default function Agenda({ agenda }: { agenda: AgendaType[] }) {
  const [day, setDay] = useState<AgendaType>(agenda[0]);

  return (
    <>
      <div className="flex flex-wrap gap-x-3 gap-y-3 mb-4 md:mb-8">
        {agenda.map((item, index) => (
          <button
            key={index}
            onClick={() => setDay(item)}
            className="event_button_text font-bold text-left"
          >
            <span
              className={clsx({
                "border-b-[7px] border-yellow-400": item.title === day.title,
              })}
            >
              {item.title}
            </span>
          </button>
        ))}
      </div>
      <h3 className="p-4 mb-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 rounded-md">
        Please be advised that this conference agenda may change without prior
        notice.
      </h3>
      <div>
        {day.row.map((row, index) => {
          const displayBreakout =
            row.agenda.length > 1 && day !== agenda[agenda.length - 1];

          return (
            <div key={index} className="grid grid-cols-12 group">
              <h5 className="uppercase col-span-2">{row.time}</h5>
              <div className="w-fit flex_col col-span-1">
                <GoDotFill className="text-3xl" />
                <div className="w-[30px] flex-grow flex_center group-last:hidden">
                  <div className="h-full w-[2px] bg-yellow-400/10" />
                </div>
              </div>
              <div className="col-span-9">
                {displayBreakout && (
                  <h5 className="text-sm italic">Breakout Sessions</h5>
                )}
                <ul className="flex_col gap-1 justify-center">
                  {row.agenda.map((item, index) => (
                    <li
                      key={index}
                      className="leading-tight text-sm xl:text-base last:mb-5 first:mt-1"
                    >
                      {row.agenda.length > 1 && "- "}
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
