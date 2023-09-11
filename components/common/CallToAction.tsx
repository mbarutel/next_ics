import React from "react";
import { cta } from "@/lib/data";
import Link from "next/link";

export default function CallToAction() {
  return (
    <section>
      <div className="container text-center pb-10">
        <h3 className="text-center mb-8 sm:mb-12 section_header !no-underline !font-thin italic">
          Building better future together
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full">
          {cta.map((item, index) => (
            <div key={index}>
              <div className="flex flex-col items-center py-10 rounded-xl px-4 h-52 md:h-56 lg:h-52 shadow-md bg-chili">
                <span className="text-4xl mb-3 text-regal outline-night">
                  {item.icon}
                </span>
                <strong className="text-2xl drop-shadow-sm text-night uppercase">
                  {item.title}
                </strong>
                <p className="italic text-center text-regal">
                  {item.description}
                </p>
              </div>
              <Link
                href={item.form}
                target="_blank"
                rel="noreferrer"
                className="border-b-[2px] font-semibold inline-block mt-4 text-2xl text-night cursor-pointer transition hover:scale-[1.05] focus:scale-[1.05] active:scale-[1.02]"
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
