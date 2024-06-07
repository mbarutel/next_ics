"use client";

import React from "react";
import Image from "next/image";
import AutoPlay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { usePrevNextButtons } from "@/lib/carousel-utils";
import { FaChevronCircleRight, FaChevronCircleLeft } from "react-icons/fa";

export default function HomeCarousel() {
  return (
    <section className="section_margin">
      <div className="section_container">
        <Carousel />
      </div>
    </section>
  );
}

function Carousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    AutoPlay({ delay: 6000, stopOnMouseEnter: true, stopOnInteraction: false }),
  ]);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <div ref={emblaRef} className="overflow-hidden rounded-md relative">
      <div className="flex ml-[-1rem]">
        {[1, 2, 3].map((index) => (
          <div
            key={index}
            className="relative flex-grow-0 flex-shrink-0 w-2/3 h-[450px] cursor-grab mx-4"
          >
            <Image
              src="/assets/images/about_values.webp"
              fill
              alt="Indigenous Health Conference"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover rounded-md"
            />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2">
        <div className="embla__buttons">
          <PrevButton
            onClick={() => onPrevButtonClick()}
            disabled={prevBtnDisabled}
          />
          <NextButton
            onClick={() => onNextButtonClick()}
            disabled={nextBtnDisabled}
          />
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
      className="absolute text-6xl top-1/2 left-32 -translate-y-1/2 opacity-90 text-yellow-400"
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
      className="absolute text-6xl top-1/2 right-32 -translate-y-1/2 opacity-90 text-yellow-400"
    >
      <FaChevronCircleRight />
    </button>
  );
}
