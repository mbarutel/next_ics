import React from "react";
import { cta } from "@/lib/data";
import Link from "next/link";

export default function CallToAction() {
  return (
    <section>
      <div className="container text-center">
        <h3 className="text-center mb-8 section_header text-stone-600/70 !font-normal italic">
          Building better future together
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {cta.map((item, index) => (
            <div key={index}>
              <div className="flex flex-col items-center py-10 rounded-xl px-2 h-52 md:h-56 lg:h-52 shadow-md bg-yellow-400/30">
                <span className="text-4xl mb-3 text-stone-500/90">
                  {item.icon}
                </span>
                <strong className="text-2xl text-blue-400/80 drop-shadow-md">
                  {item.title}
                </strong>
                <p className="italic text-center">
                  {item.description}
                </p>
              </div>
              <Link
                href={item.form}
                target="_blank"
                rel="noreferrer"
                className="border-b-[2px] font-semibold inline-block mt-4 text-2xl effects text-stone-700/70"
              >
                {item.button}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
