"use client";

import React from "react";
import { RichText } from "..";
import { EventType } from "@/lib/types";
import { useSectionInView } from "@/lib/hooks";

export default function ConferenceText(
  { event }: { event: EventType },
) {
  const { ref } = useSectionInView("Event", 0.2);

  return (
    <section ref={ref} id="event" className="scroll-mt-[800px]">
      <div className="px-4 lg:px-6 py-6 bg-slate-100 border bg-paper_gradient bg-[length:5px_5px] rounded-md">
        <RichText document={event.content} />
      </div>
    </section>
  );
}
