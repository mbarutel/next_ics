"use client";

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
      <div className="relative flex_col gap-4">
        {day.row.map((row, index) => (
          <div key={index} className="flex gap-2 text-lg">
            <div className="uppercase min-w-[5.5rem] flex items-center">
              {row.time}
            </div>
            <div className="flex_col grow border-[1px] px-4 py-1 border-white/80 rounded-md">
              {row.agenda.length > 1 && (
                <h5 className="text-sm italic">Breakout Sessions</h5>
              )}
              <ul>
                {row.agenda.map((item, index) => (
                  <li
                    key={index}
                    className={clsx(
                      "text-sm sm:text-base lg:text-lg list-inside border-white/90",
                      { "list-disc": row.agenda.length > 1 },
                    )}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
