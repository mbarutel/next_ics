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
    <section className="section_margin">
      <div className="section_container flex flex-col">
        <h2 className="title text-center">Speakers</h2>
        <Carousel speakers={speakers} />
      </div>
    </section>
  );
}

function Carousel({ speakers }: { speakers: SpeakerType[] }) {
  // const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
  //   AutoPlay({ delay: 6000, stopOnMouseEnter: true, stopOnInteraction: false }),
  // ]);
  //
  // const {
  //   prevBtnDisabled,
  //   nextBtnDisabled,
  //   onPrevButtonClick,
  //   onNextButtonClick,
  // } = usePrevNextButtons(emblaApi);
  //
  return (
    <div className="overflow-hidden rounded-md relative">
      <div className="w-2/3 mx-auto">
        {speakers.map((speaker, index) => (
          <Fragment key={index}>
            <SpeakerCard speaker={speaker} />
          </Fragment>
        ))}
      </div>
      {/* <PrevButton */}
      {/*   onClick={() => onPrevButtonClick()} */}
      {/*   disabled={prevBtnDisabled} */}
      {/* /> */}
      {/* <NextButton */}
      {/*   onClick={() => onNextButtonClick()} */}
      {/*   disabled={nextBtnDisabled} */}
      {/* /> */}
    </div>
  );
}

function SpeakerCard({ speaker }: { speaker: SpeakerType }) {
  return (
    <div className="relative flex-grow-0 flex-shrink-0 w-full cursor-grab pt-16">
      <div className="grid grid-cols-4">
        <div className="relative h-60 w-60 col-span-1">
          <Image
            src={speaker.photo.src}
            alt={speaker.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain rounded-full bg-yellow-400"
          />
        </div>
        <div className="col-span-3">
          <div className="bg-black/80 shadow-lg shadow-black/50 p-5 rounded-md flex_col items-center w-fit mx-auto mb-5">
            <h4 className="text-2xl font-bold mb-2">{speaker.name}</h4>
            <h5 className="font-semibold">{speaker.jobTitle}</h5>
            <h5 className="mb-3 -mt-1">{speaker.organization}</h5>
          </div>
          <div className="bg-black/80 shadow-lg shadow-black/50 p-5 rounded-md">
            <RichText document={speaker.biography} />
          </div>
        </div>
      </div>
    </div>
  );
}

type PropType = {
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  disabled: boolean;
};

function PrevButton({ onClick, disabled }: PropType) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="carousel_nav_button left-32"
    >
      <FaChevronCircleLeft />
    </button>
  );
}

function NextButton({ onClick, disabled }: PropType) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="carousel_nav_button right-32"
    >
      <FaChevronCircleRight />
    </button>
  );
}
