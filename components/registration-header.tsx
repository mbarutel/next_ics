import Image from "next/image";
import React from "react";

export default function RegistrationHeader() {
  return (
    <header>
      <div className="section_container flex flex-row justify-between relative overflow-hidden rounded-md">
        <div className="absolute bg-gradient-to-l gradient top-0 right-0 -z-10 h-[12.25rem] w-[31.25rem] rounded-full blur-[10rem] sm:w-[68.75rem]" />
        <div className="flex_col justify-center py-5">
          <h1 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-l gradient pb-1">
            Indigenous Conference Services
          </h1>
          <h2 className="text-2xl md:text-4xl font-bold">Registration Form</h2>
        </div>
        <div className="relative h-64 w-64 xl:mr-24 hidden md:block">
          <Image
            src="/assets/images/header-logo.webp"
            alt="Registration Logo"
            fill
            className="object-contain"
          />
        </div>
      </div>
    </header>
  );
}
