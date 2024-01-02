"use client";

import React, { useEffect, useState } from "react";
import { ConferenceType, EventType } from "@/lib/types";
import Link from "next/link";
import dayjs from "dayjs";
import { configs } from "@/lib/data";
import SpinningBackground from "./spinning-header";

export default function EventHeader(
  event: EventType,
) {
  return (
    <header>
      <div className="container">
        <div className="header_height relative">
          <EventInfo {...event} />
          <SpinningBackground />
        </div>
      </div>
    </header>
  );
}

function EventInfo(event: EventType) {
  return (
    <div className="z-40 absolute top-1/2 -translate-y-1/2 left-4">
      <div className="md:max-w-[75%]">
        <h1 className="uppercase font-extrabold header_sizes">
          {event.title}
        </h1>
        {event.conference &&
          (
            <span className="header_subtext">
              {event.conference.venue}
            </span>
          )}
      </div>
    </div>
  );
}
