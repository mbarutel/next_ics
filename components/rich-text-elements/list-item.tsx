import React, { ReactNode } from "react";

export default function ListItem({ children }: { children: ReactNode }) {
  return (
    <li className="flex gap-1">
      {children}
    </li>
  );
}
