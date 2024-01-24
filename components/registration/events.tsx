"use client";

import clsx from "clsx";
import Image from "next/image";
import { EventType, FormValuesType } from "@/lib/types";
import { FormikErrors, FormikTouched } from "formik";
import EmptyWarning from "./empty-warning";
import QuestionTitle from "./question-title";

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
      <QuestionTitle>Events</QuestionTitle>
      <div className="flex gap-1 -mt-2 mb-2">
        <EmptyWarning
          text={errors.events as string}
          error={errors.events}
          touched={touched.events}
        />
        <p>Select Your Preferred Event(s):</p>
      </div>
      <div
        role="group"
        aria-labelledby="checkbox-group"
        className="grid grid-cols-1 gap-1"
      >
        {events.map((event, index) => (
          <button
            key={index}
            type="button"
            onClick={() => onHandleClick(event)}
            className={clsx(
              "flex items-center rounded-md overflow-hidden border bg-stone-700 transition_config hover:scale-[101%] active:scale-[99%]",
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
                className="object-cover"
              />
            </div>
            <h2 className="text-left font-semibold text-xl pl-3 my-6">
              {event.title}
            </h2>
          </button>
        ))}
      </div>
    </div>
  );
}
