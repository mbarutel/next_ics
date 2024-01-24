"use client";

import { Fragment } from "react";
import { ParticipantType } from "@/lib/types";
import { ErrorMessage, Field, FieldArray } from "formik";
import QuestionTitle from "./question-title";

export default function ExtraParticipants(
  { extraParticipants }: {
    extraParticipants: ParticipantType[];
  },
) {
  return (
    <div className="question_wrapper">
      <QuestionTitle>Extra Participants</QuestionTitle>
      <FieldArray name="extraParticipants">
        {({ remove, push }) => (
          <div>
            {extraParticipants.length > 0 &&
              extraParticipants.map((_participant, index) => (
                <Fragment key={index}>
                  <ParticipantField
                    index={index}
                    remove={remove}
                    name={`extraParticipants.${index}.name`}
                    email={`extraParticipants.${index}.email`}
                    position={`extraParticipants.${index}.position`}
                  />
                </Fragment>
              ))}
            <button
              type="button"
              onClick={() => {
                push({ name: "", position: "", email: "" });
              }}
              className="w-full bg-gradient-to-r gradient field_input text-black transition_config hover:scale-[101%] active:scale-[99%]"
            >
              Add Delegate
            </button>
          </div>
        )}
      </FieldArray>
    </div>
  );
}

type ParticipantFieldProps = {
  name: string;
  email: string;
  position: string;
  remove: Function;
  index: number;
};
function ParticipantField(
  { name, email, position, remove, index }: ParticipantFieldProps,
) {
  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:items-end mb-1">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-1">
        <div className="flex_col justify-end">
          <div className="validation_text">
            <ErrorMessage
              name={name}
              component="div"
            />
          </div>
          <Field
            name={name}
            type="text"
            placeholder="Full Name"
            className="field_input text-black"
          />
        </div>

        <div className="flex_col justify-end">
          <div className="validation_text">
            <ErrorMessage
              name={position}
              component="div"
            />
          </div>
          <Field
            type="text"
            name={position}
            placeholder="Position"
            className="field_input text-black"
          />
        </div>

        <div className="flex_col justify-end">
          <div className="validation_text">
            <ErrorMessage
              name={email}
              component="div"
            />
          </div>
          <Field
            type="text"
            name={email}
            placeholder="Email"
            className="field_input text-black"
          />
        </div>
      </div>
      <button
        type="button"
        onClick={() => remove(index)}
        className="field_input bg-red-600 transition_config hover:scale-[101%] active:scale-[99%]"
      >
        Remove
      </button>
    </div>
  );
}
