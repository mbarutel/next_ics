"use client";
import React from "react";
import { advantages } from "@/lib/data";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

export default function Advantages() {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay()]);

  return (
    <section className="px-2">
      <div className="container bg-advantages_background bg-cover bg-center bg-fixed rounded-md py-7 lg:py-32 sm:px-12">
        <div className="bg-white/40 rounded-xl p-2 sm:p-5 flex flex-col">
          <h2 className="section_header text-orange-500 text-center pb-1 md:pb-3">
            Become part of&nbsp;ICS
          </h2>
          <div ref={emblaRef} className="overflow-hidden sm:-mt-1">
            <div className="flex mb-4">
              {advantages.map((advantage, index) => (
                <div key={index} className="flex-grow flex-shrink-0 w-full">
                  <div className="flex flex-col gap-5 sm:gap-7 lg:gap-12">
                    {advantage.map((item, index) => (
                      <div key={index}>
                        <h3 className="text-stone-700 text-center text-[1rem] sm:text-2xl">
                          {item.header}
                        </h3>
                        <p className="text-center text-stone-700/90 w-[min(100%,60rem)] mx-auto italic">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
