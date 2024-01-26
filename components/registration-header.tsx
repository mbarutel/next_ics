import React from "react";
import dayjs from "dayjs";
import Image from "next/image";
import { ConferenceType } from "@/lib/types";

export default function RegistrationHeader(conference: ConferenceType) {
  return (
    <header className="mt-2">
      <div className="section_container overflow-hidden rounded-md">
        <div className="absolute bg-gradient-to-l gradient top-0 right-0 -z-10 h-[12.25rem] w-[31.25rem] rounded-full blur-[10rem] sm:w-[68.75rem] opacity-80" />

        <div className="flex flex-row justify-between">
          <div className="flex_col justify-center text-center lg:text-left w-full uppercase">
            <h1 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-l gradient pb-1 leading-none">
              Indigenous Conference Services
            </h1>
            <h2 className="text-2xl md:text-4xl font-bold">
              Registration Form
            </h2>
          </div>
          <div className="relative h-44 w-44 hidden lg:block">
            <Image
              src="/assets/images/header-logo.webp"
              alt="Registration Logo"
              fill
              className="object-contain"
            />
          </div>
        </div>

        <div className="mb-6">
          <h1 className="text-2xl sm:text-4xl font-bold mb-2 leading-none">
            {conference.title}
          </h1>
          {conference.date &&
            (
              <div className="flex gap-2 text-xl font-semibold">
                <span>
                  {dayjs(conference.date.startDate).format("DD")} -{" "}
                  {dayjs(conference.date.endDate).format("DD MMM, YYYY")}
                </span>
                {" | "}
                <span>{conference.venue}</span>
              </div>
            )}
        </div>
      </div>
    </header>
  );
}
