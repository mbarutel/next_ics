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
    <div className="bg-stone-900/40 rounded-md overflow-hidden mb-4 shadow-md">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 flex items-center justify-between hover:bg-stone-900/60 transition-colors duration-200"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3">
          {icon && <span className="text-2xl">{icon}</span>}
          <h2 className="text-lg font-bold text-left uppercase tracking-wide text-yellow-400">
            {title}
          </h2>
        </div>
        <div className="text-yellow-400">
          {isOpen ? (
            <IoChevronUp className="text-2xl" />
          ) : (
            <IoChevronDown className="text-2xl" />
          )}
        </div>
      </button>
      {isOpen && (
        <div className="px-4 pb-4 pt-2 animate-fadeIn">{children}</div>
      )}
    </div>
  );
}
