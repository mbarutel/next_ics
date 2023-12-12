import React from "react";

export default function SectionHeader({ text }: { text: string }) {
  return (
    <h2
      style={{ fontFamily: "Abril Fatface" }}
      className="w-fit section_header text-[#FF7F11] mb-6 sm:mb-10"
    >
      {text}
    </h2>
  );
}
