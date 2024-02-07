"use client";
import Image from "next/image";
import RichText from "./rich-text";
import React, { useState } from "react";
import { SpeakerType } from "@/lib/types";
import { a, useSpring } from "@react-spring/web";
import { AiOutlineCloseCircle } from "react-icons/ai";
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
    <section className="section_margin">
      <div className="section_container flex flex-col">
        <SectionHeaderText>Speakers</SectionHeaderText>
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
                  className="relative flex items-center rounded-sm cursor-pointer border-2 border-zinc-600 bg-zinc-800"
                >
                  <Image
                    src="/assets/images/aboriginal_pattern.svg"
                    alt="pattern"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover z-0 grayscale opacity-5"
                  />

                  <div className="relative h-20 min-w-[5rem] ml-2">
                    <Image
                      src={speaker.photo.src}
                      alt={speaker.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-contain"
                    />
                  </div>
                  <div className="flex_col ml-2">
                    <h4 className="font-bold text-xl">
                      {speaker.name}
                    </h4>
                    <h3 className="-mt-0.5 font-medium">
                      {speaker.organization}
                    </h3>
                    <h3 className="-mt-1 font-medium">
                      {speaker.jobTitle}
                    </h3>
                  </div>
                </div>
              ))}
            </a.div>
          )}
          {/* Speaker Information */}
          {side === false ? null : (
            <a.div
              style={{
                opacity,
              }}
              className="rounded-sm relative max-w-[50rem] min-h-[40rem] px-10 py-4 mx-auto border-2 border-zinc-600 bg-zinc-800"
            >
              <Image
                src="/assets/images/aboriginal_pattern.svg"
                alt="pattern"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover z-0 grayscale opacity-5"
              />
              {speaker === null ? null : (
                <>
                  <button
                    onClick={() => {
                      setSide((side) => !side);
                      setSpeaker(null);
                    }}
                    className="absolute top-3 right-3 text-4xl hover:scale-105 active:scale-95 transition text-yellow-400"
                  >
                    <AiOutlineCloseCircle />
                  </button>
                  <div className="bg-black/80 shadow-lg shadow-black/50 p-5 rounded-md flex_col items-center w-fit mx-auto mb-5">
                    <div className="relative h-36 w-36">
                      <Image
                        src={speaker.photo.src}
                        alt={speaker.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-contain"
                      />
                    </div>
                    <h4 className="text-2xl font-bold mb-2">
                      {speaker.name}
                    </h4>
                    <h5 className="font-semibold">
                      {speaker.jobTitle}
                    </h5>
                    <h5 className="mb-3 -mt-1">
                      {speaker.organization}
                    </h5>
                  </div>
                  <div className="bg-black/80 shadow-lg shadow-black/50 p-5 rounded-md">
                    <RichText document={speaker.biography} />
                  </div>
                </>
              )}
            </a.div>
          )}
        </div>
      </div>
    </section>
  );
}
