"use client";

import React, { useState } from "react";
import { AgendaType } from "@/contentful/types/types";

export default function Agenda({ agenda }: { agenda: AgendaType[] }) {
  const [day, setDay] = useState<AgendaType>(agenda[0]);

  return (
    <div className="max-w-4xl mx-auto bg-paper_gradient bg-[length:5px_5px] px-2 py-4 sm:px-4 sm:py-6 xl:px-8 xl:py-10 mt-6 shadow-lg rounded-md">
      <div>
        <h3
          style={{ fontFamily: "Abril Fatface" }}
          className="mb-3 text-3xl text-slate-700 uppercase ml-3"
        >
          Agenda
        </h3>
        <div className="flex gap-3 mb-8">
          {agenda.map((item, index) => (
            <button
              key={index}
              onClick={() => setDay(item)}
              className={`px-5 py-1 transition-all hover:bg-slate-900 hover:text-white active:scale-95 border-solid border-black/60 border-t-2 border-r-2 border-l-2 border-b-4 rounded-md ${
                item.title === day.title
                  ? "bg-slate-500 text-white"
                  : "text-slate-800"
              }`}
            >
              {item.title}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 gap-4 relative">
          <div className="w-[3px] h-full bg-orange-500/50 absolute top-1/2 -translate-y-1/2 left-[65px] sm:left-[87px]" />
          {day.row.map((row, index) => (
            <div key={index} className="flex gap-5">
              <span className="uppercase text-slate-500 min-w-[3.5rem] sm:min-w-[5rem] flex items-center text-sm sm:text-lg">
                {row.time}
              </span>
              <span className="flex flex-col w-full py-4 px-3 border-solid border-black/60 border-t-2 border-r-2 border-l-2 border-b-4 rounded-md">
                {row.agenda.map((item, index) => (
                  <span
                    key={index}
                  >
                    {item}
                  </span>
                ))}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
