import React from "react";
import clsx from "clsx";

export default function SectionHeaderText(
  { text, secondary = false }: {
    text: string;
    secondary?: boolean;
  },
) {
  return (
    <div className="xl:mt-10 py-2 md:py-5">
      <h2
        className={clsx(
          "section_header leading-none text-transparent bg-clip-text bg-gradient-to-r from-rose-100 to-teal-100",
          { "!text-right": secondary === true },
        )}
      >
        {text}
      </h2>
    </div>
  );
}
