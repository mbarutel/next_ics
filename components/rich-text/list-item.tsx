import React, { ReactNode } from "react";
import { GoDotFill } from "react-icons/go";

export default function ListItem({ children }: { children: ReactNode }) {
  return (
    <li className="flex items-start text-sm sm:text-base">
      <GoDotFill className="text-slate-800/80 text-xs min-w-fit mr-1 mb-2 mt-1 sm:mt-[6px] lg:mt-[7px]" />
      {children}
    </li>
  );
}
