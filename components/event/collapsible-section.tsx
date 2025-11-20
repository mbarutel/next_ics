"use client";

import React, { useState } from "react";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";

type CollapsibleSectionProps = {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  icon?: React.ReactNode;
};

export default function CollapsibleSection({
  title,
  children,
  defaultOpen = false,
  icon,
}: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="bg-stone-900/20 rounded-sm overflow-hidden border border-stone-800/50 transition-all duration-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-8 py-5 flex items-center justify-between hover:bg-stone-900/30 transition-colors duration-200"
        aria-expanded={isOpen}
      >
        <h2 className="text-lg md:text-xl font-semibold text-left tracking-tight text-stone-100">
          {title}
        </h2>
        <div className="text-stone-400">
          {isOpen ? (
            <IoChevronUp className="text-xl" />
          ) : (
            <IoChevronDown className="text-xl" />
          )}
        </div>
      </button>
      {isOpen && (
        <div className="px-8 pb-8 pt-4 animate-fadeIn prose prose-invert prose-stone max-w-none text-stone-300 text-sm leading-relaxed">{children}</div>
      )}
    </div>
  );
}
