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
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Poster */}
        <div className="lg:col-span-4">
          <div className="sticky top-8">
            <div className="border border-stone-800/50 rounded-sm overflow-hidden">
              <Poster src={poster.src} alt={poster.alt} />
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="lg:col-span-8">
          <div className="prose prose-invert prose-yellow max-w-none">
            <RichText document={event.content} />
          </div>
        </div>
      </div>
    </div>
  );
}
