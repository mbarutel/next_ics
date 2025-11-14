import React from "react";
import RichText from "../rich-text-elements/rich-text";
import { EventType, AssetType } from "@/lib/types";
import Poster from "./event-poster";

type EventContentProps = {
  event: EventType;
  poster: AssetType;
};

export default function EventContent({ event, poster }: EventContentProps) {
  return (
    <div className="max-w-5xl mx-auto">
      {/* Floating Poster */}
      <div className="float-left mr-6 mb-4 w-full sm:w-80 lg:w-96">
        <div className="bg-stone-900/40 rounded-lg p-4 shadow-lg">
          <Poster src={poster.src} alt={poster.alt} />
        </div>
      </div>

      {/* Article Content with Text Wrapping */}
      <RichText document={event.content} />

      {/* Clear float */}
      <div className="clear-both" />
    </div>
  );
}
