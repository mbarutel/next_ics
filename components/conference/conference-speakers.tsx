"use client";
import Image from "next/image";
import RichText from "../rich-text-elements/rich-text";
import React, { Fragment, useState } from "react";
import { SpeakerType } from "@/lib/types";
import { a, useSpring } from "@react-spring/web";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { carouselImages } from "@/lib/data";
import AutoPlay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { usePrevNextButtons } from "@/lib/carousel-utils";
import { FaChevronCircleRight, FaChevronCircleLeft } from "react-icons/fa";

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
      <div className="relative h-56 w-56 col-span-1">
        <Image
          src={speaker.photo.src}
          alt={speaker.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-contain rounded-full bg-yellow-400"
        />
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
