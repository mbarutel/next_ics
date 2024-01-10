import { configs } from "@/lib/data";
import Link from "next/link";
import React from "react";

export default function HeaderFormLinks(
  { registration, submitAPaper }: {
    registration: string;
    submitAPaper: string | undefined;
  },
) {
  return (
    <div className="flex gap-2 text-white z-40">
      <Link
        href={registration}
        target="_blank"
        rel="noopener noreferrer"
        className="relative inline-flex group button_padding bg-zinc-900 text-base font-medium transition-all active:scale-95 rounded-sm overflow-hidden text-white hover:text-black"
      >
        <span className="z-10">
          Register
        </span>
        <span className="absolute h-full w-0 left-0 bottom-0 group-hover:w-full bg-gradient-to-r gradient transition_config z-0" />
      </Link>
      {submitAPaper &&
        (
          <Link
            href={configs.forms.submitPaper}
            target="_blank"
            rel="noreferrer"
            className="relative inline-flex group button_padding bg-gradient-to-r gradient text-sm sm:text-base transition_config active:scale-95 rounded-sm overflow-hidden text-black hover:text-white"
          >
            <span className="z-10">
              Submit a paper
            </span>
            <span className="absolute h-full w-0 left-0 bottom-0 group-hover:w-full bg-zinc-900 transition_config z-0" />
          </Link>
        )}
    </div>
  );
}
