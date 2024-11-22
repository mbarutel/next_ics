"use client";

import React from "react";
import Image from "next/image";
import { testimonials } from "@/lib/data";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";

export default function HomeTestimonial() {
  return (
    <section>
      <div className="container relative rounded-md overflow-hidden flex items-center min-h-[16rem] p-4">
        <Image
          src="/assets/images/testimonial-bg.webp"
          alt="Conferences Testimonials"
          fill
          className="object-cover z-0"
        />
        <div className="absolute inset-0 bg-gradient-to-b gradient_secondary opacity-40" />
        <Carousel />
      </div>
    </section>
  );
}

function Carousel() {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 6000, stopOnMouseEnter: true, stopOnInteraction: false }),
  ]);

  return (
    <div className="overflow-hidden z-20" ref={emblaRef}>
      <div className="flex">
        {testimonials.map((testimonal, index) => (
          <div
            key={index}
            className="min-w-0 flex-grow-0 flex-shrink-0 w-full cursor-grab flex justify-center items-center"
          >
            <h2 className="text-center arvo text-xl font-bold text-stone-900">
              "{testimonal}"
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}
