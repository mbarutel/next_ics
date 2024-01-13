"use client";

import { Fragment } from "react";
import { ParticipantType } from "@/lib/types";
import { ErrorMessage, Field, FieldArray } from "formik";

export default function ExtraParticipants(
  { extraParticipants }: {
    extraParticipants: ParticipantType[];
  },
) {
  return (
    <div className="question_wrapper">
      <h2 className="question_title mb-2 sm:mb-6">Extra Participants</h2>
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
              className="w-full bg-gradient-to-r gradient py-2 rounded-md text-black justify-center"
            >
              Add Delegate
            </button>
          </div>
        )}
      </FieldArray>
    </div>
  );
}

function ParticipantField(
  { name, position, remove, index }: {
    name: string;
    position: string;
    remove: Function;
    index: number;
  },
) {
  return (
    <div className="grid grid-cols-1 gap-1 sm:grid-cols-3 mb-2">
      <div className="flex flex-col sm:gap-2">
        <Field
          name={name}
          type="text"
          placeholder="Full Name"
          className="field_input"
        />
        <ErrorMessage
          name={name}
          component="div"
        />
      </div>
      <div className="flex flex-col sm:gap-2">
        <Field
          type="text"
          name={position}
          placeholder="Position"
          className="field_input"
        />
        <ErrorMessage
          name={position}
          component="div"
        />
      </div>
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
