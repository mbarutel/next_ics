"use client";

import React, { useState } from "react";
import { AgendaType } from "@/lib/types";
import { GoDotFill } from "react-icons/go";

type EventAgendaCardProps = {
  agenda: AgendaType[];
};

export default function EventAgendaCard({ agenda }: EventAgendaCardProps) {
  const [selectedDay, setSelectedDay] = useState<AgendaType>(agenda[0]);

  if (!agenda || agenda.length === 0) return null;

  return (
    <div className="bg-stone-900/20 rounded-sm p-8 border border-stone-800/50">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-lg md:text-xl font-semibold tracking-tight text-stone-100">
          Conference Agenda
        </h2>
      </div>

      {/* Day Selector - Only show if multiple days */}
      {agenda.length > 1 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {agenda.map((day, index) => (
            <button
              key={index}
              onClick={() => setSelectedDay(day)}
              className={`px-4 py-2 rounded-sm font-medium text-sm transition-colors ${
                selectedDay.title === day.title
                  ? "bg-yellow-400 text-stone-900"
                  : "border border-stone-700 text-stone-300 hover:border-stone-600"
              }`}
            >
              {day.title}
            </button>
          ))}
        </div>
      )}

      {/* Warning Banner */}
      <div className="p-4 mb-8 border-l-2 border-yellow-400/50 bg-stone-900/30 text-sm">
        <p className="font-medium text-stone-200 uppercase text-xs tracking-wider mb-1">Note</p>
        <p className="text-xs text-stone-400">This conference agenda may change without prior notice.</p>
      </div>

      {/* Timeline */}
      <div className="space-y-6">
        {selectedDay.row.map((row, index) => {
          const displayBreakout =
            row.agenda.length > 1 && selectedDay !== agenda[agenda.length - 1];

          return (
            <div key={index} className="flex gap-6 group">
              {/* Time */}
              <div className="flex-shrink-0 w-20 sm:w-24">
                <div className="text-yellow-400/90 font-medium text-sm">
                  {row.time}
                </div>
              </div>

              {/* Timeline Dot & Line */}
              <div className="flex flex-col items-center flex-shrink-0">
                <div className="w-2 h-2 rounded-full bg-yellow-400/80" />
                <div className={`w-px flex-grow bg-stone-800 ${index === selectedDay.row.length - 1 ? 'hidden' : ''}`} />
              </div>

              {/* Content */}
              <div className="flex-grow pb-6">
                {displayBreakout ? (
                  <>
                    <p className="text-xs text-yellow-400/70 italic mb-3 uppercase tracking-wider">Breakout Sessions</p>
                    <div className="space-y-3">
                      {row.agenda.map((item, idx) => {
                        return (
                          <div
                            key={idx}
                            className="border-l border-stone-700 pl-4 py-1"
                          >
                            <span className="text-sm text-stone-300 leading-relaxed">{item}</span>
                          </div>
                        );
                      })}
                    </div>
                  </>
                ) : (
                  <div className="space-y-1">
                    {row.agenda.map((item, idx) => {
                      return (
                        <div key={idx}>
                          <span className="text-sm text-stone-300 leading-relaxed">{item}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
