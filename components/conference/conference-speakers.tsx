import RichText from "../rich-text-elements/rich-text";
import React, { Fragment } from "react";
import { SpeakerType } from "@/lib/types";
import Image from "next/image";

export default function ConferenceSpeakers({
  speakers,
}: {
  speakers: SpeakerType[];
}) {
  if (speakers.length === 0) {
    return null;
  }

  return (
    <section className="section_margin hidden lg:block">
      <div className="section_container flex flex-col">
        <h2 className="title text-center">Speakers</h2>
        <div className="max-w-6xl mx-auto h-[1000px] overflow-y-auto">
          {speakers.map((speaker, index) => (
            <Fragment key={index}>
              <SpeakerCard speaker={speaker} />
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

function SpeakerCard({ speaker }: { speaker: SpeakerType }) {
  return (
    <div className="grid grid-cols-4 py-8">
      <div className="bg-yellow-400 h-96 w-64 col-span-1 ">
        <div className="relative w-full h-full translate-x-3 -translate-y-3 overflow-hidden">
          <Image
            fill
            alt={speaker.name}
            src={speaker.photo.src}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover bg-stone-800 hover:scale-105 transform transition-transform duration-300"
          />
        </div>
      </div>
      <div className="col-span-3 px-5">
        <div className="mb-5 border-yellow-400 border-l-[5px] pl-5">
          <h4 className="text-3xl font-semibold mb-2">{speaker.name}</h4>
          <h5 className="text-lg">{speaker.jobTitle}</h5>
          <h5 className="text-lg -mt-1">{speaker.organization}</h5>
        </div>
        <div className="">
          <RichText document={speaker.biography} />
        </div>
      </div>
    </div>
  );
}
