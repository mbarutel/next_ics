"use client";

import React, { useState } from "react";
import { AgendaType } from "@/lib/types";
import clsx from "clsx";

export default function Agenda({ agenda }: { agenda: AgendaType[] }) {
  const [day, setDay] = useState<AgendaType>(agenda[0]);

  return (
    <>
      <div className="flex gap-5 mb-8">
        {agenda.map((item, index) => (
          <button
            key={index}
            onClick={() => setDay(item)}
            className="text-2xl uppercase font-bold tracking-tight"
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
      <div className="relative flex_col gap-2">
        <div className="w-[5px] h-full bg-gradient-to-b gradient absolute top-1/2 -translate-y-1/2 left-[65px] sm:left-[87px]" />
        {day.row.map((row, index) => (
          <div key={index} className="flex gap-5">
            <span className="uppercase min-w-[3.5rem] sm:min-w-[5rem] flex items-center text-lg font-semibold">
              {row.time}
            </span>
            <span className="flex flex-col w-full py-4 px-3 border-solid border-black/60 border-t-2 border-r-2 border-l-2 border-b-4 rounded-md">
              {row.agenda.map((item, index) => (
                <span
                  key={index}
                  className="text-sm md:text-base"
                >
                  {item}
                </span>
              ))}
            </span>
          </div>
        ))}
      </div>
    </>
  );
}
