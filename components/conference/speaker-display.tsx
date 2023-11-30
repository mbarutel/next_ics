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

  if (conference.speakers === undefined) {
    return null;
  }

  return (
    <div className="flex flex-col">
      <h3
        style={{ fontFamily: "Abril Fatface" }}
        className="text-2xl text-slate-800/90 mb-2 text-center"
      >
        Speakers
      </h3>
      <div>
        {side === false ? null : (
          <a.div
            style={{
              opacity,
            }}
            className="bg-slate-300 shadow-lg rounded-md flex flex-col items-center relative p-4 text-center lg:w-3/4 mx-auto"
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
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-contain"
                  />
                </div>
                <h4
                  style={{ fontFamily: "Abril Fatface" }}
                  className="text-xl text-slate-700 font-semibold tracking-wide"
                >
                  {speaker.name}
                </h4>
                <h5 className="text-slate-600 font-semibold">
                  {speaker.jobTitle}
                </h5>
                <h5 className="text-slate-600 mb-3">{speaker.organization}</h5>
                <SpeakerRichText document={speaker.biography} />
              </>
            )}
          </a.div>
        )}
        {side === true ? null : (
          <a.div
            style={{ opacity: opacity.to((o) => 1 - o) }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4"
          >
            {conference.speakers.map((speaker) => (
              <div
                key={speaker.slug}
                onClick={() => {
                  setSide((side) => !side);
                  setSpeaker(speaker);
                }}
                className="flex items-center bg-slate-300 shadow-md rounded-md cursor-pointer hover:bg-slate-400/70 transition-all py-2"
              >
                <div className="relative h-20 min-w-[5rem]">
                  <Image
                    src={speaker.photo.src}
                    alt={speaker.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-contain"
                  />
                </div>
                <span className="grid grid-cols-1 ml-2">
                  <h4
                    style={{ fontFamily: "Gabarito" }}
                    className="text-slate-700/90 font-bold"
                  >
                    {speaker.name}
                  </h4>
                  <small className="text-sm text-slate-700/80 font-semibold">
                    {speaker.organization}
                  </small>
                  <small className="text-sm text-slate-600">
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
