import { QuestionBaseProps } from "@/lib/form-paper";
import conferenceDate from "@/lib/conference-dates";
import { EventType } from "@/lib/types";
import { Field } from "formik";
import clsx from "clsx";

import "./speaker-form.css";
import QuestionTitle from "./question-title";

type QuestionConferenceProps = QuestionBaseProps & {
  events: EventType[];
};

export default function QuestionConference(props: QuestionConferenceProps) {
  return (
    <div className="form_section_wrapper flex flex-col gap-1">
      <QuestionTitle
        title="Conferences"
        subtitle="Please select which conferences you wish to submit your entry:"
      />
      <ul className="flex flex-col gap-3">
        {props.events.map((event) => {
          if (!event.conference) {
            return null;
          }

          return (
            <li
              key={event.slug}
              className={clsx(
                "group flex flex-col border-x-4 border-yellow-400 border-opacity-0 hover:border-opacity-100 py-2 px-4",
                {
                  "border-opacity-100": props.values.events.includes(
                    event.title,
                  ),
                },
              )}
            >
              <label
                className={clsx(
                  "font-medium leading-snug group-hover:italic group-hover:text-yellow-400",
                  {
                    "underline text-yellow-400": props.values.events.includes(
                      event.title,
                    ),
                  },
                )}
              >
                <Field name="events" type="checkbox" value={event.title} />
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
          );
        })}
      </ul>
    </div>
  );
}
