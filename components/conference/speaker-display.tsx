"use client";
import Image from "next/image";
import React, { useState } from "react";
import { a, useSpring } from "@react-spring/web";
import { ConferencesType } from "@/contentful/types/types";
import { SpeakerType } from "@/contentful/types/types";
import SpeakerRichText from "./speaker-rich-text";
import { AiOutlineCloseCircle } from "react-icons/ai";

export default function SpeakersDisplay(
  { conference }: { conference: ConferencesType },
) {
  const [side, setSide] = useState(false);
  const [speaker, setSpeaker] = useState<SpeakerType | null>(null);

  const { opacity } = useSpring({
    opacity: side ? 1 : 0,
    config: { mass: 5, tension: 500, friction: 100 },
  });

  return (
    <div className="flex flex-col">
      <h3
        style={{ fontFamily: "Gabarito" }}
        className="text-2xl text-slate-800 mb-2 text-center"
      >
        Speakers
      </h3>
      <div>
        {side === false ? null : (
          <a.div
            style={{
              opacity,
            }}
            className="bg-slate-300 rounded-sm flex flex-col items-center relative p-4 text-center lg:w-3/4 mx-auto"
          >
            {speaker === null ? null : (
              <>
                <button
                  onClick={() => {
                    setSide((side) => !side);
                    setSpeaker(null);
                  }}
                  className="absolute top-3 right-3 text-slate-600 text-4xl hover:scale-105 active:scale-95 transition-all"
                >
                  <AiOutlineCloseCircle />
                </button>
                <div className="relative h-36 w-36">
                  <Image
                    src={speaker.photo.src}
                    alt={speaker.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <h4
                  style={{ fontFamily: "Gabarito" }}
                  className="text-xl text-slate-700"
                >
                  {speaker.name}
                </h4>
                <h5 className="text-slate-600">{speaker.jobTitle}</h5>
                <h5 className="text-slate-600 mb-3">{speaker.organization}</h5>
                <SpeakerRichText document={speaker.biography} />
              </>
            )}
          </a.div>
        )}
        {side === true ? null : (
          <a.div
            style={{ opacity: opacity.to((o) => 1 - o) }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-1 overflow-x-auto"
          >
            {conference.speakers.map((speaker) => (
              <div
                key={speaker.slug}
                onClick={() => {
                  setSide((side) => !side);
                  setSpeaker(speaker);
                }}
                className="flex items-center bg-slate-300 rounded-sm cursor-pointer hover:bg-slate-400/70 transition-all"
              >
                <div className="relative h-20 w-20">
                  <Image
                    src={speaker.photo.src}
                    alt={speaker.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <span>
                  <h4
                    style={{ fontFamily: "Gabarito" }}
                    className="text-slate-700"
                  >
                    {speaker.name}
                  </h4>
                  <small className="flex -mt-1 text-sm text-slate-600">
                    {speaker.jobTitle}
                  </small>
                </span>
              </div>
            ))}
          </a.div>
        )}
      </div>
    </div>
  );
}
