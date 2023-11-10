import React from "react";
import { RichText } from "..";
import { EventType } from "@/contentful/types/types";

export default function ConferenceText(
  { event }: { event: EventType },
) {
  return (
    <section className="px-2">
      <div className="px-4 lg:px-6 pt-6 max-w-4xl mx-auto bg-slate-100 border bg-paper_gradient bg-[length:5px_5px] rounded-md mt-6">
        <RichText document={event.content} />
      </div>
    </section>
  );
}
