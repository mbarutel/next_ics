import { QuestionBaseProps } from "@/lib/form-paper";
import conferenceDate from "@/lib/conference-dates";
import { EventType } from "@/lib/types";
import { Field } from "formik";
import clsx from "clsx";

import "./form-paper.css";
import QuestionTitle from "./question-title";
import { Fragment } from "react";

type QuestionConference = QuestionBaseProps & {
  events: EventType[];
};

export default function QuestionConference({
  values,
  touched,
  events,
}: QuestionConference) {
  return (
    <div className="form_section_wrapper flex flex-col gap-1">
      <div className="flex flex-wrap">
        <QuestionTitle
          title="Conferences"
          subtitle="Please select which conference you wish to submit your entry | AU$850 Per Registration"
          asterisk={
            !values.events &&
            touched.events && (
              <span className="untouched_field asterisk"> *</span>
            )
          }
        />
      </div>
      <ul className="flex flex-col gap-3">
        {events.map((event) => {
          if (!event.conference) {
            return null;
          }

          return (
            <Fragment key={event.slug}>
              <li
                className={clsx(
                  "group flex flex-col border-x-4 border-yellow-400 border-opacity-0 hover:border-opacity-100 py-2 px-4",
                  {
                    "border-opacity-100": values.events.includes(event.title),
                  },
                )}
              >
                <label
                  className={clsx(
                    "font-medium leading-snug group-hover:italic group-hover:text-yellow-400",
                    {
                      "underline text-yellow-400": values.events.includes(
                        event.title,
                      ),
                    },
                  )}
                >
                  <Field name="events" type="radio" value={event.title} />
                  <span className="text-lg font-semibold grow ml-2">
                    {event.title}
                  </span>
                  <br />
                  <span className="space_mono">
                    {event.conference.venue} |{" "}
                    {conferenceDate({ ...event.conference.date })}
                  </span>
                </label>
              </li>
              <hr className="last:hidden w-[90%] ml-5" />
            </Fragment>
          );
        })}
      </ul>
    </div>
  );
}
