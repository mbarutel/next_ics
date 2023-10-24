"use client";
import { AgendaType } from "@/contentful/types/types";
import useEmblaCarousel from "embla-carousel-react";

export default function Agenda({ agenda }: { agenda: AgendaType[] }) {
  const [emblaRef] = useEmblaCarousel();

  return (
    <div className="max-w-4xl mx-auto bg-paper_gradient bg-[length:5px_5px] px-2 py-4 sm:px-4 sm:py-6 xl:px-8 xl:py-10 mt-6 shadow-lg">
      <div
        ref={emblaRef}
        className="overflow-hidden cursor-grab active:cursor-grabbing"
      >
        <div className="flex">
          {agenda.map((item, index) => (
            <div
              key={index}
              className="relative flex-grow flex-shrink-0 w-full"
            >
              <h3
                style={{ fontFamily: "Gabarito" }}
                className="mb-3 text-3xl text-slate-700 uppercase"
              >
                Agenda
              </h3>
              <h4
                style={{ fontFamily: "Gabarito" }}
                className="mb-3 text-2xl text-slate-700 uppercase"
              >
                {item.title}
              </h4>
              <div className="flex flex-col gap-4">
                {item.row.map((row, index) => (
                  <span key={index} className="flex flex-col">
                    <span
                      style={{ fontFamily: "Gabarito" }}
                      className="uppercase text-slate-600"
                    >
                      {row.time}
                    </span>
                    <span className="flex flex-col grow">
                      {row.agenda.map((item, index) => (
                        <span
                          key={index}
                          className="pl-5 italic"
                        >
                          {item}
                        </span>
                      ))}
                    </span>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
