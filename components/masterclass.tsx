"use client";

import RichText from "./rich-text-elements/rich-text";
import React, { useState } from "react";
import VideoPlayer from "./video-player";
import { MasterclassType } from "@/lib/types";
import clsx from "clsx";

export default function Masterclass({
  masterclass,
}: {
  masterclass: MasterclassType[];
}) {
  const [option, setOption] = useState<MasterclassType>(masterclass[0]);

  return (
    <>
      <div className="flex flex-wrap gap-x-3 gap-y-3 mb-4 md:mb-8">
        {masterclass.map((item, index) => (
          <button
            key={index}
            onClick={() => setOption(item)}
            className="event_button_text font-bold text-left"
          >
            <span
              className={clsx({
                "border-b-[7px] border-yellow-400": item.title === option.title,
              })}
            >
              {item.title}
            </span>
          </button>
        ))}
      </div>
      <div
        className={clsx("grid grid-cols-1", {
          "2xl:!grid-cols-2": option.asset,
        })}
      >
        {option.asset && (
          <div className="hidden md:block my-auto">
            <VideoPlayer url={option.asset.src} />
          </div>
        )}
        <div>
          <p className="text-justify mb-4">
            We offer new and exciting innovation for our conferences. The third
            day is devoted to a professional development workshop or
            masterclass. As such, we have introduced several exciting networking
            and professional development innovations which is an extra cost for
            your chosen masterclass.{" "}
            <span className="italic underline">
              Day 3 is optional so please make sure you complete your
              registration form with the masterclass included if you intend to
              attend.
            </span>
          </p>
          <RichText document={option.description} />
        </div>
      </div>
    </>
  );
}
