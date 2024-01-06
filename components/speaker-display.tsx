"use client";
import Image from "next/image";
import React, { useState } from "react";
import { a, useSpring } from "@react-spring/web";
import { ConferenceType, SpeakerType } from "@/lib/types";
import { AiOutlineCloseCircle } from "react-icons/ai";
import RichText from "./rich-text";
import SectionHeaderText from "./section-header-text";

export default function SpeakersDisplay(
  { speakers }: { speakers: SpeakerType[] },
) {
  const [side, setSide] = useState(false);
  const [speaker, setSpeaker] = useState<SpeakerType | null>(null);

  const { opacity } = useSpring({
    opacity: side ? 1 : 0,
    config: { mass: 5, tension: 500, friction: 100 },
  });

  if (speakers.length === 0) {
    return null;
  }

  return (
    <section>
      <div className="section_container flex flex-col">
        <SectionHeaderText text="Speakers" />
        <div>
          {/* Grid */}
          {side === true ? null : (
            <a.div
              style={{ opacity: opacity.to((o) => 1 - o) }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-y-1 gap-x-2 max-h-[25rem] sm:max-h-[40rem] overflow-y-auto"
            >
              {speakers.map((speaker) => (
                <div
                  key={speaker.slug}
                  onClick={() => {
                    setSide((side) => !side);
                    setSpeaker(speaker);
                  }}
                  className="flex items-center rounded-sm cursor-pointer"
                >
                  <div className="relative h-20 min-w-[5rem] ml-2">
                    <Image
                      src={speaker.photo.src}
                      alt={speaker.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-contain"
                    />
                  </div>
                  <span className="grid grid-cols-1 ml-2">
                    <h4 className="font-bold">
                      {speaker.name}
                    </h4>
                    <small className="font-semibold">
                      {speaker.organization}
                    </small>
                    <small className="font-semibold">
                      {speaker.jobTitle}
                    </small>
                  </span>
                </div>
              ))}
            </a.div>
          )}
          {/* Speajer Information */}
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
                  <h4 className="text-xl text-slate-700 font-semibold tracking-wide">
                    {speaker.name}
                  </h4>
                  <h5 className="text-slate-600 font-semibold">
                    {speaker.jobTitle}
                  </h5>
                  <h5 className="text-slate-600 mb-3">
                    {speaker.organization}
                  </h5>
                  <RichText document={speaker.biography} />
                </>
              )}
            </a.div>
          )}
        </div>
      </div>
    </section>
  );
}
