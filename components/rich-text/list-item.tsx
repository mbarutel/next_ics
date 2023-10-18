import React, { ReactNode } from "react";
import { GoDotFill } from "react-icons/go";

export default function ListItem({ children }: { children: ReactNode }) {
  return (
    <li className="flex items-center text-sm sm:text-base py-1 !text-left">
      <GoDotFill className="text-slate-800/80 text-xs min-w-fit mr-1" />
      {children}
    </li>
  );
}
