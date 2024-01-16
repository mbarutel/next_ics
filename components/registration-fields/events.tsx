"use client";

import clsx from "clsx";
import Image from "next/image";
import { CiWarning } from "react-icons/ci";
import { EventType, FormValuesType } from "@/lib/types";
import { FormikErrors, FormikTouched } from "formik";
import EmptyWarning from "./empty-warning";

export function Events(
  { errors, touched, choices, events, setFieldValue }: {
    choices: string[];
    events: EventType[];
    setFieldValue: Function;
    errors: FormikErrors<FormValuesType>;
    touched: FormikTouched<FormValuesType>;
  },
) {
  const onHandleClick = (eventCard: EventType) => {
    if (choices.includes(eventCard.title)) {
      setFieldValue(
        "events",
        choices.filter((item) => item !== eventCard.title),
      );
    } else {
      setFieldValue(
        "events",
        [...choices, eventCard.title],
      );
    }
  };

  return (
    <div className="question_wrapper">
      <h2 className="question_title">
        Select Your Preferred Events
      </h2>
      <EmptyWarning
        text={errors.events as string}
        error={errors.events}
        touched={touched.events}
      />
      <div id="events-group">
        <div
          role="group"
          aria-labelledby="checkbox-group"
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2"
        >
          {events.map((event, index) => (
            <button
              key={index}
              type="button"
              onClick={() => onHandleClick(event)}
              className={clsx(
                "flex items-center rounded-md overflow-hidden h-24 border bg-stone-700 transition_config",
                {
                  "!bg-gradient-to-r gradient text-black":
                    choices.includes(event.title) === true,
                },
              )}
            >
              <div className="h-full min-w-[4rem] relative overflow-hidden">
                <Image
                  src={event.poster.src}
                  alt={event.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-110 transition-all ease-in-out"
                />
              </div>
              <h2 className="font-normal text-lg text-left pl-3">
                {event.title}
              </h2>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
