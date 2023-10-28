"use client";

import React, { useState } from "react";
import { MasterclassType } from "@/contentful/types/types";
import { RichText } from "..";

export default function Masterclass(
  { masterclass }: { masterclass: MasterclassType[] },
) {
  const [option, setOption] = useState<MasterclassType>(
    masterclass[0],
  );

  return (
    <div className="max-w-4xl mx-auto bg-paper_gradient bg-[length:5px_5px] px-2 py-4 sm:px-4 sm:py-6 xl:px-8 xl:py-10 mt-6 border rounded-md">
      <div>
        <h3
          style={{ fontFamily: "Gabarito" }}
          className="mb-3 text-3xl text-slate-700 uppercase ml-3"
        >
          Masterclass
        </h3>
        <div className="flex flex-wrap gap-3 mb-8">
          {masterclass.map((item, index) => (
            <button
              key={index}
              onClick={() => setOption(item)}
              className={`px-5 py-1 transition-all hover:bg-slate-900 hover:text-white active:scale-95 border-solid border-black/60 border-t-2 border-r-2 border-l-2 border-b-4 rounded-md ${
                item.title === option.title
                  ? "bg-slate-500 text-white"
                  : "text-slate-800"
              }`}
            >
              {item.title}
            </button>
          ))}
        </div>
        <div className="text-slate-800">
          <h2
            style={{ fontFamily: "Gabarito" }}
            className="text-xl font-semibold"
          >
            {option.title}
          </h2>
          <p className="text-justify text-sm sm:text-base my-4">
            We offer new and exciting innovation for our conferences. The third
            day is devoted to a professional development workshop or
            masterclass. As such, we have introduced several exciting networking
            and professional development innovations which is an extra cost for
            your chosen masterclass.{" "}
            <span className="italic">
              Day 3 is optional so please make sure you complete your
              registration form with the masterclass included if you intend to
              attend.
            </span>
          </p>
          <RichText document={option.description} />
        </div>
      </div>
    </div>
  );
}
