"use client";
import "./shared.css";
import Image from "next/image";
import { AssetType } from "@/lib/types";
import AutoPlay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { usePrevNextButtons } from "@/lib/carousel-utils";
import { FaChevronCircleRight, FaChevronCircleLeft, FaPause, FaPlay } from "react-icons/fa";
import { useCallback, useEffect, useState } from "react";

type CarouselProps = {
  images: AssetType[];
};

export default function SharedCarousel({ images }: CarouselProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [autoplayPlugin] = useState(() =>
    AutoPlay({ delay: 6000, stopOnMouseEnter: true, stopOnInteraction: false })
  );

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [autoplayPlugin]);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  // Track current slide for pagination
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  // Toggle autoplay
  const toggleAutoplay = useCallback(() => {
    if (!autoplayPlugin) return;
    const autoplay = autoplayPlugin;
    if (autoplay.isPlaying()) {
      autoplay.stop();
      setIsPlaying(false);
    } else {
      autoplay.play();
      setIsPlaying(true);
    }
  }, [autoplayPlugin]);

  // Scroll to specific slide
  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  // Keyboard navigation
  useEffect(() => {
    if (!emblaApi) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        onPrevButtonClick();
      } else if (event.key === "ArrowRight") {
        onNextButtonClick();
      } else if (event.key === " ") {
        event.preventDefault();
        toggleAutoplay();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [emblaApi, onPrevButtonClick, onNextButtonClick, toggleAutoplay]);

  return (
    <div className="relative">
      {/* Carousel Wrapper */}
      <div
        ref={emblaRef}
        className="overflow-hidden rounded-lg relative shadow-xl"
        role="region"
        aria-label="Image carousel"
        aria-live="polite"
      >
        <div className="flex">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative flex-grow-0 flex-shrink-0 w-full sm:w-[85%] md:w-[70%] lg:w-[45%] xl:w-[35%] aspect-[4/3] cursor-grab mx-2 sm:mx-3"
              role="group"
              aria-label={`Slide ${index + 1} of ${images.length}`}
            >
              <Image
                fill
                quality={100}
                src={image.src}
                alt={image.alt}
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 85vw, (max-width: 1024px) 70vw, (max-width: 1280px) 45vw, 35vw"
                className="object-cover rounded-lg"
                priority={index === 0}
              />
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <PrevButton
          onClick={() => onPrevButtonClick()}
          disabled={prevBtnDisabled}
        />
        <NextButton
          onClick={() => onNextButtonClick()}
          disabled={nextBtnDisabled}
        />
      </div>

      {/* Controls Container */}
      <div className="flex items-center justify-center gap-6 mt-6">
        {/* Play/Pause Button */}
        <button
          type="button"
          onClick={toggleAutoplay}
          className="flex items-center gap-2 px-4 py-2 bg-yellow-400 text-black rounded-md hover:bg-yellow-300 transition-colors font-medium"
          aria-label={isPlaying ? "Pause carousel" : "Play carousel"}
        >
          {isPlaying ? (
            <>
              <FaPause className="text-sm" />
              <span className="text-sm">Pause</span>
            </>
          ) : (
            <>
              <FaPlay className="text-sm" />
              <span className="text-sm">Play</span>
            </>
          )}
        </button>

        {/* Pagination Dots */}
        <div className="flex gap-2" role="tablist" aria-label="Carousel pagination">
          {images.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => scrollTo(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === selectedIndex
                  ? "bg-yellow-400 w-8"
                  : "bg-stone-400 hover:bg-stone-300"
              }`}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === selectedIndex ? "true" : "false"}
              role="tab"
            />
          ))}
        </div>

        {/* Slide Counter */}
        <div className="text-sm text-stone-300 font-medium" aria-live="polite">
          {selectedIndex + 1} / {images.length}
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
      className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10
                 bg-black/60 hover:bg-black/80 backdrop-blur-sm
                 text-white p-3 sm:p-4 rounded-full
                 transition-all duration-200
                 hover:scale-110 active:scale-95
                 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100
                 focus:outline-none focus:ring-4 focus:ring-yellow-400/50
                 shadow-lg hover:shadow-xl"
      aria-label="Previous slide"
    >
      <FaChevronCircleLeft className="text-2xl sm:text-3xl" />
    </button>
  );
}

function NextButton({ onClick, disabled }: PropType) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10
                 bg-black/60 hover:bg-black/80 backdrop-blur-sm
                 text-white p-3 sm:p-4 rounded-full
                 transition-all duration-200
                 hover:scale-110 active:scale-95
                 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100
                 focus:outline-none focus:ring-4 focus:ring-yellow-400/50
                 shadow-lg hover:shadow-xl"
      aria-label="Next slide"
    >
      <FaChevronCircleRight className="text-2xl sm:text-3xl" />
    </button>
  );
}
