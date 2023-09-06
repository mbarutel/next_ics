"use client";
import React, { useEffect, useState } from "react";

type CountdownProps = {
  startDate: string;
};
export default function Countdown({ startDate }: CountdownProps) {
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

      if (d <= 0 && h <= 0 && m <= 0 && s <= m) {
        setConferenceTime(true);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [startDate]);

  return (
    <div className="my-4">
      {conferenceTime
        ? (
          <div className="bg-stone-800 text-white/80 px-7 py-3 w-fit rounded-md font-bold sm:text-lg uppercase">
            Building a better future today
          </div>
        )
        : (
          <div className="flex gap-1">
            <div className="flex flex-col text-center">
              <span className="bg-stone-800 text-white/80 px-7 py-1 rounded-md font-bold text-lg">
                {days}
              </span>
              <span>days</span>
            </div>
            <div className="flex flex-col text-center">
              <span className="bg-stone-800 text-white/80 px-7 py-1 rounded-md font-bold text-lg">
                {hours}
              </span>
              <span>hours</span>
            </div>
            <div className="flex flex-col text-center">
              <span className="bg-stone-800 text-white/80 px-7 py-1 rounded-md font-bold text-lg">
                {minutes}
              </span>
              <span>minutes</span>
            </div>
            <div className="flex flex-col text-center">
              <span className="bg-stone-800 text-white/80 px-7 py-1 rounded-md font-bold text-lg">
                {seconds}
              </span>
              <span>seconds</span>
            </div>
          </div>
        )}
    </div>
  );
}
