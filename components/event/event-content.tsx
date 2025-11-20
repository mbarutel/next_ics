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
    <div className="max-w-6xl mx-auto border border-stone-800/50 rounded-sm p-8">
      {/* Article Content */}
      <div className="prose prose-invert prose-yellow max-w-none">
        <Poster src={poster.src} alt={poster.alt} />
        <RichText document={event.content} />
      </div>
    </div>
  );
}
