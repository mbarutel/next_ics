import React from "react";
import RichText from "./rich-text";
import { EventType } from "@/lib/types";

export default function EventText(
  { event }: { event: EventType },
) {

  return (
    <section className="bg-stone-600/80 py-10 px-7 rounded-sm">
      <RichText document={event.content} />
    </section>
  );
}
