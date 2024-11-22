"use client";
import "./shared.css";
import Image from "next/image";
import { AssetType } from "@/lib/types";
import AutoPlay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { usePrevNextButtons } from "@/lib/carousel-utils";
import { FaChevronCircleRight, FaChevronCircleLeft } from "react-icons/fa";

type CarouselProps = {
  images: AssetType[];
};

export default function SharedCarousel({ images }: CarouselProps) {
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
      <div className="flex">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative flex-grow-0 flex-shrink-0 w-full lg:w-1/4 h-[450px] cursor-grab mx-4"
          >
            <Image
              fill
              quality={100}
              src={image.src}
              alt={image.alt}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover rounded-md"
            />
          </div>
        ))}
      </div>
      <PrevButton
        onClick={() => onPrevButtonClick()}
        disabled={prevBtnDisabled}
      />
      <NextButton
        onClick={() => onNextButtonClick()}
        disabled={nextBtnDisabled}
      />
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
      className="carousel_nav_button left-5 sm:left-12 lg:left-32"
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
      className="carousel_nav_button right-5 md:right-12 lg:right-32"
    >
      <FaChevronCircleRight />
    </button>
  );
}
