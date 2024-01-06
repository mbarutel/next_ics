import React, { ReactNode } from "react";

export default function Quote({ children }: { children: ReactNode }) {
  return (
    <blockquote className="flex bg-slate-300 rounded-md px-6 py-4 relative">
      <span className="absolute h-3/4 left-4 bottom-1/2 translate-y-1/2 w-2 bg-slate-800/60 rounded-sm inline-block" />
      <span className="text-2xl flex items-center gap-2 ml-3">
        {children}
      </span>
    </blockquote>
  );
}
