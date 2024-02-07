import React from "react";

export default function SectionHeaderText(
  { children }: { children: React.ReactNode },
) {
  return (
    <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold uppercase tracking-normal leading-7 mb-4">
      {children}
    </h2>
  );
}
