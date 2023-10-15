import React, { ReactNode } from "react";
import { GoDotFill } from "react-icons/go";

export default function ListItem({ children }: { children: ReactNode }) {
  return (
    <li className="flex items-center">
      <GoDotFill className="mr-1 text-slate-800/80 text-xs" />
      {children}
    </li>
  );
}
