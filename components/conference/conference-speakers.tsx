import RichText from "../rich-text-elements/rich-text";
import { SpeakerType } from "@/lib/types";
import React, { Fragment } from "react";
import Image from "next/image";

export default function ConferenceSpeakers({
  speakers,
}: {
  speakers: SpeakerType[];
}) {
  const speakersLengthIndex = speakers.length - 1;

  return (
    <div className="w-fit mx-auto h-[800px] overflow-y-auto my-6">
      {speakers.map((speaker, index) => (
        <Fragment key={index}>
          <SpeakerCard speaker={speaker} />
          {index !== speakersLengthIndex && (
            <hr className="border-t-4 border-yellow-600 my-5 w-4/5 mx-auto" />
          )}
        </Fragment>
      ))}
    </div>
  );
}

function SpeakerCard({ speaker }: { speaker: SpeakerType }) {
  return (
    <div className="flex flex-col xl:flex-row py-8 justify-center">
      <div className="bg-yellow-400 h-72 w-48 mx-auto xl:mx-0 mb-5 xl:mb-0 xl:h-96 xl:w-64 xl:mr-8">
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
      <div className="px-5 xl:w-[80ch]">
        <div className="mb-5 border-yellow-400 border-l-[5px] pl-5">
          <h4 className="text-3xl font-semibold mb-2">{speaker.name}</h4>
          <h5 className="text-lg">{speaker.jobTitle}</h5>
          <h5 className="text-lg -mt-1">{speaker.organization}</h5>
        </div>
        <div>
          <RichText document={speaker.biography} />
        </div>
      </div>
    </div>
  );
}
