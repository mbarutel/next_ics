import React from "react";
import clsx from "clsx";

export default function SectionHeaderText(
  { text, subText = undefined, secondary = false }: {
    text: string;
    subText: string | undefined;
    secondary?: boolean;
  },
) {
  return (
    <div className="py-5">
      <h2
        className={clsx(
          "section_header tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-rose-100 to-teal-100",
          { "!text-right": secondary === true },
        )}
      >
        {text}
      </h2>
      {subText && (
        <p
          className={clsx("section_sub_header md:text-right", {
            "!text-left": secondary === true,
          })}
        >
          {subText}
        </p>
      )}
    </div>
  );
}
