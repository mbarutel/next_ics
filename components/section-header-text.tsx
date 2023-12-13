import React from "react";

export default function SectionHeaderText({ text }: { text: string }) {
  return (
    <h2
      style={{ fontFamily: "Abril Fatface" }}
      className="w-fit font-extrabold text-5xl uppercase tracking-wide mb-6 sm:mb-10 text-transparent bg-clip-text bg-gradient-to-r from-rose-100 to-teal-100"
    >
      {text}
    </h2>
  );
}
