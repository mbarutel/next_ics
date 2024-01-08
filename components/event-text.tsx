import React from "react";
import RichText from "./rich-text";
import { EventType } from "@/lib/types";

export default function EventText(
  { event }: { event: EventType },
) {

  return (
    <>
      <RichText document={event.content} />
    </>
  );
}
