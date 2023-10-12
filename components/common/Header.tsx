"use client";

import React, { useEffect, useState } from "react";
import { ConferencesType } from "@/contentful/types/types";
import { configs } from "@/lib/data";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";

// export default function Header() {
//   return (
//     <header className="relative h-[25rem] sm:h-[30rem] lg:h-[60rem] flex items-center justify-center">
//       <Image
//         src="/assets/images/header-testing.jpg"
//         alt="Indigenous Health Conference Services"
//         fill
//         className="contrast-[0.9] object-cover"
//       />
//       <HeaderBox />
//     </header>
//   );
// }
//
// function HeaderBox() {
//   return (
//     <div className="flex flex-col bg-gradient-to-b from-stone-950/90 to-red-950/90 px-2 py-6 sm:py-8 z-[99] text-white rounded-tr-xl rounded-bl-xl w-[min(90%,40rem)]">
//       <div className="mb-4 sm:mb-6">
//         <h1 className="text-center text-white text-[1.6rem] sm:text-3xl font-black uppercase tracking-wider leading-tight mb-1 drop-shadow-xs">
//           Indigenous Conference Services
//         </h1>
//         <p className="text-center text-yellow-500 text-[0.8rem] sm:text-lg uppercase font-semibold">
//           The impossible is the next step for our journey
//         </p>
//       </div>
//       <div className="max-w-lg mx-auto flex justify-center items-center gap-4">
//         <Link
//           href={configs.forms.registration}
//           target="_blank"
//           rel="noreferrer"
//           className="group relative inline-flex border border-orange-500 focus:outline-none w-full sm:w-auto rounded-md"
//         >
//           <span className="w-full inline-flex items-center justify-center self-stretch px-4 py-2 text-sm text-white text-center font-bold uppercase bg-orange-500 ring-1 ring-orange-500 ring-offset-1 ring-offset-orange-500 transform transition-transform group-hover:-translate-y-1 group-hover:-translate-x-1 group-focus:-translate-y-1 group-focus:-translate-x-1 group-active:translate-y-0 group-active:translate-x-0 rounded-md">
//             Register
//           </span>
//         </Link>
//         <Link
//           className="group relative inline-flex border border-orange-500 focus:outline-none w-full sm:w-auto rounded-md"
//           href={configs.forms.submitPaper}
//           target="_blank"
//           rel="noreferrer"
//         >
//           <span className="w-full inline-flex items-center justify-center self-stretch px-4 py-2 text-sm text-white text-center font-bold uppercase bg-transparent ring-1 ring-orange-500 ring-offset-1 ring-offset-orange-500 transform transition-transform group-hover:-translate-y-1 group-hover:-translate-x-1 group-focus:-translate-y-1 group-focus:-translate-x-1 group-active:translate-y-0 group-active:translate-x-0 rounded-md">
//             Submit&nbsp;a&nbsp;paper
//           </span>
//         </Link>
//       </div>
//     </div>
//   );
// }
//

export default function Header(
  { conferences }: { conferences: ConferencesType[] },
) {
  // console.log(conferences);
  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 8000, stopOnMouseEnter: true, stopOnInteraction: false }),
  ]);

  return (
    <header className="cursor-grab mx-auto max-w-[90rem]">
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex h-[25rem] sm:h-[30rem] lg:h-[60rem]">
          {conferences.map((conference) => (
            <div
              key={conference.slug}
              className="relative flex-grow flex-shrink-0 w-full"
            >
              <Image
                src={conference.coverImage.src}
                alt="Indigenous Health Conference Services"
                quality={100}
                fill
                className="object-cover z-0"
              />
              <div className="relative container h-full">
                <ConferenceInfo conference={conference} />
                <Countdown startDate={conference.startDate} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}

function ConferenceInfo({ conference }: { conference: ConferencesType }) {
  const localizedFormat = require("dayjs/plugin/localizedFormat");
  dayjs.extend(localizedFormat);

  return (
    <div className="z-10 text-white absolute top-1/2 left-4">
      <h1
        style={{ fontFamily: "Gabarito" }}
        className="uppercase sm:text-4xl sm:mb-4"
      >
        {conference.title}
      </h1>
      <span>
        {dayjs(conference.startDate).format("MMMM DD")}-
        {dayjs(conference.endDate).format("DD, YYYY")} -{" "}
        {dayjs(conference.startDate).format("HH:mma")} -{" "}
        {dayjs(conference.endDate).format("HH:mma")}
      </span>
      <span className="flex gap-3 mt-3">
        <Link
          href="/"
          className="px-4 py-3 bg-yellow-400  text-slate-700"
        >
          Register
        </Link>
        <Link
          href="/"
          className="px-4 py-3 bg-yellow-200  text-slate-700"
        >
          Sumbit a paper
        </Link>
        <Link
          href="/"
          className="px-4 py-3 bg-yellow-200  text-slate-700"
        >
          View Events
        </Link>
      </span>
    </div>
  );
}

function Countdown({ startDate }: { startDate: string }) {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [conferenceTime, setConferenceTime] = useState(false);

  useEffect(() => {
    const target = new Date(startDate);
    const interval = setInterval(() => {
      const now = new Date();
      const difference = target.getTime() - now.getTime();

      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      setDays(d);
      const h = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      setHours(h);
      const m = Math.floor(
        (difference % (1000 * 60 * 60)) / (1000 * 60),
      );
      setMinutes(m);
      const s = Math.floor(
        (difference % (1000 * 60)) / 1000,
      );
      setSeconds(s);

      if (d <= 0 && h <= 0 && m <= 0 && s <= 0) {
        setConferenceTime(true);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [startDate]);

  return (
    <div className="z-10 absolute bottom-0 right-0 flex text-white cursor-default">
      {conferenceTime
        ? (
          <span className="sm:px-8 sm:py-6 bg-yellow-500 sm:text-2xl italic uppercase">
            Building a better future today
          </span>
        )
        : (
          <>
            <span className="flex flex-col sm:px-8 sm:py-6 bg-yellow-500 border-solid border-r-[1px] border-stone-200/50 text-center">
              <span className="font-semibold text-xl">{days}</span>
              <span className="text-xs uppercase">days</span>
            </span>
            <span className="flex flex-col sm:px-8 sm:py-6 bg-yellow-500 border-solid border-r-[1px] border-stone-200/50 text-center">
              <span className="font-semibold text-xl">{hours}</span>
              <span className="text-xs uppercase">hours</span>
            </span>
            <span className="flex flex-col sm:px-8 sm:py-6 bg-yellow-500 border-solid border-r-[1px] border-stone-200/50 text-center">
              <span className="font-semibold text-xl">{minutes}</span>
              <span className="text-xs uppercase">minutes</span>
            </span>
            <span className="flex flex-col sm:px-8 sm:py-6 bg-stone-200 text-center text-slate-900">
              <span className="font-semibold text-xl">{seconds}</span>
              <span className="text-xs uppercase">seconds</span>
            </span>
          </>
        )}
    </div>
  );
}

// <div className="flex flex-col text-center">
//   <span className="bg-amber-800/80 text-rain/80 px-7 py-1 rounded-md font-bold text-lg">
//     {hours}
//   </span>
//   <span>hours</span>
// </div>
// <div className="flex flex-col text-center">
//   <span className="bg-amber-800/80 text-rain/80 px-7 py-1 rounded-md font-bold text-lg">
//     {minutes}
//   </span>
//   <span>minutes</span>
// </div>
// <div className="flex flex-col text-center">
//   <span className="bg-amber-800/80 text-rain/80 px-7 py-1 rounded-md font-bold text-lg">
//     {seconds}
//   </span>
//   <span>seconds</span>
// </div>
