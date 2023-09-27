import React from "react";
import { cta } from "@/lib/data";
import Link from "next/link";

export default function CallToAction() {
  return (
    <section>
      <div className="container text-center pb-10">
        <h3 className="text-center mb-8 section_header text-amber-900 !font-thin italic">
          Building better future together
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full">
          {cta.map((item, index) => (
            <div key={index}>
              <div className="flex flex-col items-center py-10 rounded-xl px-4 h-52 md:h-56 lg:h-52 shadow-md bg-red-800/80 mb-3">
                <span className="text-4xl mb-3 text-orange-400/90 outline-night drop-shadow-lg">
                  {item.icon}
                </span>
                <strong className="text-2xl drop-shadow-lg text-cyan-500 uppercase">
                  {item.title}
                </strong>
                <p className="italic text-center text-gray-300">
                  {item.description}
                </p>
              </div>

              <div>
                <Link
                  href={item.form}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative inline-flex border border-orange-700 focus:outline-none w-[80%] sm:w-auto"
                >
                  <span className="w-full inline-flex items-center justify-center self-stretch px-4 py-2 text-sm text-white text-center font-bold uppercase bg-orange-700 ring-1 ring-orange-700 ring-offset-1 ring-offset-orange-700 transform transition-transform group-hover:translate-y-1 group-hover:translate-x-1 group-focus:translate-y-1 group-focus:translate-x-1 group-active:translate-y-0 group-active:translate-x-0">
                    {item.button}
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
