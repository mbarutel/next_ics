import React from "react";

export default function SectionHeaderText(
  { text, subText }: { text: string; subText: string | undefined },
) {
  return (
    <div className="py-5">
      <h2
        style={{ fontFamily: "Abril Fatface" }}
        className="section_header tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-rose-100 to-teal-100"
      >
        {text}
      </h2>
      {subText && <p className="section_sub_header">{subText}</p>}
    </div>
  );
}
