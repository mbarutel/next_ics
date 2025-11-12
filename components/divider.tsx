import React from "react";

interface DividerProps {
  className?: string;
}

export default function Divider({ className = "" }: DividerProps) {
  return (
    <div
      className={`h-px bg-gradient-to-r from-transparent via-stone-600 to-transparent ${className}`.trim()}
    />
  );
}
