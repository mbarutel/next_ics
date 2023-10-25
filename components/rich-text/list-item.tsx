import React, { ReactNode } from "react";

export default function ListItem({ children }: { children: ReactNode }) {
  return (
    <li className="text-sm sm:text-base flex gap-2">
      •
      {children}
    </li>
  );
}
