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
    <div className="bg-stone-900/40 rounded-lg overflow-hidden shadow-lg border border-yellow-400/10 transition-all duration-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-stone-900/60 transition-colors duration-200"
        aria-expanded={isOpen}
      >
        <h2 className="text-lg md:text-xl font-bold text-left uppercase tracking-wide text-yellow-400">
          {title}
        </h2>
        <div className="text-yellow-400">
          {isOpen ? (
            <IoChevronUp className="text-2xl" />
          ) : (
            <IoChevronDown className="text-2xl" />
          )}
        </div>
      </button>
      {isOpen && (
        <div className="px-6 pb-6 pt-2 border-t border-yellow-400/10 animate-fadeIn">{children}</div>
      )}
    </div>
  );
}
