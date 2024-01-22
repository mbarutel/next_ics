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
                    position={`extraParticipants.${index}.position`}
                  />
                </Fragment>
              ))}
            <button
              type="button"
              onClick={() => {
                push({ name: "", position: "" });
              }}
              className="w-full bg-gradient-to-r gradient field_input text-black"
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
  position: string;
  remove: Function;
  index: number;
};
function ParticipantField(
  { name, position, remove, index }: ParticipantFieldProps,
) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 sm:gap-1 mb-1">
      <div className="validation_text sm:col-start-1 sm:col-end-2">
        <ErrorMessage
          name={name}
          component="div"
        />
      </div>
      <Field
        name={name}
        type="text"
        placeholder="Full Name"
        className="field_input sm:col-start-1 sm:col-end-2 text-black"
      />
      <span className="validation_text sm:col-start-2 sm:col-end-3 sm:row-start-1">
        <ErrorMessage
          name={position}
          component="div"
        />
      </span>
      <Field
        type="text"
        name={position}
        placeholder="Position"
        className="field_input sm:col-start-2 sm:col-end-3 text-black"
      />
      <button
        type="button"
        onClick={() => remove(index)}
        className="field_input bg-red-600"
      >
        Remove
      </button>
    </div>
  );
}
