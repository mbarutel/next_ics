import React from "react";

export default function SectionHeaderText(
  { text }: {
    text: string;
  },
) {
  return (
    <div className="pb-2 md:pb-5">
      <h2 className="section_header leading-none">
        {text}
      </h2>
    </div>
  );
}
