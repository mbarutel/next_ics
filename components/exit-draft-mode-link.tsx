"use client";
import { usePathname } from "next/navigation";
import React from "react";

export default function ExitDraftModeLink(
  props: React.HTMLProps<HTMLAnchorElement>,
) {
  const pathname = usePathname();

  return (
    <a href={`/api/disable-draft?redirect=${pathname}`} {...props}>
      Exit
    </a>
  );
}
