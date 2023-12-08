import React from "react";
import dayjs from "dayjs";
import Link from "next/link";
import Image from "next/image";
import { EventType } from "@/lib/types";

type EventDisplayProps = {
  event: EventType;
  startDate: string;
  endDate: string;
  venue: string;
  registrationLink: string;
};
export default function EventDisplay(props: EventDisplayProps) {
  const localizedFormat = require("dayjs/plugin/localizedFormat");
  dayjs.extend(localizedFormat);

  return (
    <div className="grow flex flex-col bg-slate-300 shadow-lg rounded-md">
      <div className="grow">
        <div className="h-80 w-52 float-left mr-2 relative overflow-hidden rounded-tl-md border-r-slate-900/80 border-b-slate-900/80 border-[2px]">
          <Image
            fill
            priority={true}
            alt={props.event.poster.alt}
            src={props.event.poster.src}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover hover:scale-110 duration-200 object-top"
          />
        </div>
        <h3
          style={{ fontFamily: "Abril Fatface" }}
          className="text-xl text-slate-800 text-center mt-3 px-2"
        >
          {props.event.title}
        </h3>
        <p className="text-justify text-slate-800/80 p-5">
          {props.event.description}
        </p>
      </div>

      <div
        style={{ fontFamily: "Gabarito" }}
        className="flex justify-between uppercase text-slate-800/70 mt-4 text-sm lg:text-lg px-5"
      >
        <span className="flex">
          {dayjs(props.startDate).format("DD ")}-{" "}
          {dayjs(props.endDate).format("DD MMMM")}
        </span>
        <span>
          {props.venue}
        </span>
      </div>
      <div className="w-full h-[2px] bg-black/80 my-3" />
      <div className="flex gap-3 px-1 pb-1">
        <Link
          href={`/event/${props.event.slug}`}
          className="relative w-fit inline-flex group mt-3 button_padding bg-orange-500  text-white transition-all active:scale-95 items-center rounded-md overflow-hidden"
        >
          <span className="z-10">
            Learn&nbsp;More
          </span>
          <span className="absolute h-full w-0 left-0 bottom-0 group-hover:w-full bg-slate-950 transition-all ease-in-out z-0" />
        </Link>
        <Link
          href={props.registrationLink}
          target="_blank"
          rel="noreferrer"
          className="relative w-fit inline-flex group mt-3 button_padding bg-slate-700  text-white transition-all active:scale-95 items-center rounded-md overflow-hidden"
        >
          <span className="z-10">
            Register
          </span>
          <span className="absolute h-full w-0 left-0 bottom-0 group-hover:w-full bg-slate-950 transition-all ease-in-out z-0" />
        </Link>
      </div>
    </div>
  );
}
