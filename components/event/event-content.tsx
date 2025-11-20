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
    <div className="max-w-8xl mx-auto">
      {/* Floating Poster */}
      <div className="float-left mr-8 mb-6 w-full sm:w-80 lg:w-96">
        <div className="bg-stone-900/50 rounded-lg p-5 shadow-xl border border-yellow-400/20">
          <Poster src={poster.src} alt={poster.alt} />
        </div>
      </div>

      {/* Article Content with Text Wrapping */}
      <div className="prose prose-invert prose-yellow max-w-none">
        <RichText document={event.content} />
      </div>

      {/* Clear float */}
      <div className="clear-both" />
    </div>
  );
}
