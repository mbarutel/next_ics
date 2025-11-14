"use client";

import React, { useState } from "react";
import { AgendaType } from "@/lib/types";
import { GoDotFill } from "react-icons/go";

// Helper function to determine session type and return appropriate icon
function getSessionIcon(sessionText: string): string {
  const lowerText = sessionText.toLowerCase();

  if (lowerText.includes("break") || lowerText.includes("tea") || lowerText.includes("coffee")) {
    return "☕";
  } else if (lowerText.includes("lunch") || lowerText.includes("dinner") || lowerText.includes("breakfast")) {
    return "🍽️";
  } else if (lowerText.includes("keynote") || lowerText.includes("opening") || lowerText.includes("closing")) {
    return "🎤";
  } else if (lowerText.includes("network") || lowerText.includes("social")) {
    return "🤝";
  } else if (lowerText.includes("registration") || lowerText.includes("check-in")) {
    return "📋";
  } else if (lowerText.includes("welcome") || lowerText.includes("acknowledgement")) {
    return "👋";
  } else {
    return "💬"; // Default for regular sessions
  }
}

type EventAgendaCardProps = {
  agenda: AgendaType[];
};

export default function EventAgendaCard({ agenda }: EventAgendaCardProps) {
  const [selectedDay, setSelectedDay] = useState<AgendaType>(agenda[0]);

  if (!agenda || agenda.length === 0) return null;

  return (
    <div className="bg-stone-900/40 rounded-lg p-6 shadow-md">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <span className="text-3xl">📅</span>
        <h2 className="text-xl md:text-2xl font-bold uppercase tracking-wide text-yellow-400">
          Conference Agenda
        </h2>
      </div>

      {/* Day Selector - Only show if multiple days */}
      {agenda.length > 1 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {agenda.map((day, index) => (
            <button
              key={index}
              onClick={() => setSelectedDay(day)}
              className={`px-4 py-2 rounded-md font-semibold text-sm transition-all ${
                selectedDay.title === day.title
                  ? "bg-yellow-400 text-stone-900"
                  : "bg-stone-800/50 text-stone-300 hover:bg-stone-800"
              }`}
            >
              {day.title}
            </button>
          ))}
        </div>
      )}

      {/* Warning Banner */}
      <div className="p-3 mb-6 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 rounded-md text-sm">
        <p className="font-semibold">⚠️ Note</p>
        <p className="text-xs mt-1">This conference agenda may change without prior notice.</p>
      </div>

      {/* Timeline */}
      <div className="space-y-4">
        {selectedDay.row.map((row, index) => {
          const displayBreakout =
            row.agenda.length > 1 && selectedDay !== agenda[agenda.length - 1];

          return (
            <div key={index} className="flex gap-4 group">
              {/* Time */}
              <div className="flex-shrink-0 w-20 sm:w-24">
                <div className="text-yellow-400 font-bold text-sm sm:text-base">
                  {row.time}
                </div>
              </div>

              {/* Timeline Dot & Line */}
              <div className="flex flex-col items-center flex-shrink-0">
                <GoDotFill className="text-yellow-400 text-2xl" />
                <div className={`w-0.5 flex-grow bg-yellow-400/20 ${index === selectedDay.row.length - 1 ? 'hidden' : ''}`} />
              </div>

              {/* Content */}
              <div className="flex-grow pb-6">
                {displayBreakout ? (
                  <>
                    <p className="text-xs text-yellow-400 italic mb-3">Breakout Sessions</p>
                    <div className="grid grid-cols-1 gap-3">
                      {row.agenda.map((item, idx) => {
                        const icon = getSessionIcon(item);
                        return (
                          <div
                            key={idx}
                            className="bg-stone-800/30 rounded-md p-3 border-l-2 border-yellow-400/30 hover:border-yellow-400/60 transition-colors"
                          >
                            <div className="flex items-start gap-2">
                              <span className="text-lg flex-shrink-0">{icon}</span>
                              <span className="text-sm text-stone-300 leading-relaxed">{item}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </>
                ) : (
                  <div className="space-y-2">
                    {row.agenda.map((item, idx) => {
                      const icon = getSessionIcon(item);
                      return (
                        <div key={idx} className="flex items-start gap-2">
                          <span className="text-lg flex-shrink-0">{icon}</span>
                          <span className="text-sm sm:text-base text-stone-300 leading-relaxed">{item}</span>
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
