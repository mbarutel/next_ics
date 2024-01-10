import React from "react";
import clsx from "clsx";

export default function SectionHeaderText(
  { text }: {
    text: string;
  },
) {
  return (
    <div className="pb-2 md:pb-5">
      <h2 className="section_header leading-none text-transparent bg-clip-text bg-gradient-to-r from-rose-100 to-teal-100">
        {text}
      </h2>
    </div>
  );
}
