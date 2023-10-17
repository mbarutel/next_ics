import React from "react";
import Image from "next/image";
import Link from "next/link";
import { EventType } from "@/contentful/types/types";
import dayjs from "dayjs";

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
    <div className="grow flex flex-col">
      <h3
        style={{ fontFamily: "Gabarito" }}
        className="text-2xl text-slate-800 mb-2"
      >
        {props.event.title}
      </h3>
      <div className="grow">
        <div className="h-72 w-52 float-left mr-3 relative">
          <Image
            src={props.event.coverImage}
            alt="Conferences Australia"
            fill
            className="object-contain"
          />
        </div>
        <p className="text-justify h-full">{props.event.description}</p>
      </div>

      <div
        style={{ fontFamily: "Gabarito" }}
        className="flex justify-between uppercase text-slate-800/70 mt-4 text-sm lg:text-lg"
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
      <div className="flex gap-3">
        <Link
          href={`/events/${props.event.slug}`}
          className="relative w-fit inline-flex group mt-3 button_padding bg-orange-500  text-white transition-all active:scale-95"
        >
          <span className="z-10">
            Learn More
          </span>
          <span className="absolute h-full w-0 left-0 bottom-0 group-hover:w-full bg-slate-950 transition-all ease-in-out z-0" />
        </Link>
        <Link
          href={props.registrationLink}
          className="relative w-fit inline-flex group mt-3 button_padding bg-slate-700  text-white transition-all active:scale-95"
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
