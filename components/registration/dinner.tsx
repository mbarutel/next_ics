"use client";

import clsx from "clsx";
import Select from "react-select";
import { dietaryOptions } from "@/lib/data";
import { customStyles } from "./select-style";
import { ErrorMessage, Field, FieldArray } from "formik";
import React, { Fragment, useEffect, useState } from "react";
import { DinnerParticipantType, ParticipantType } from "@/lib/types";
import QuestionTitle from "./question-title";

export default function Dinner({
  name,
  participants,
  setFieldValue,
  dinnerParticipants,
}: {
  name: string;
  setFieldValue: Function;
  participants: ParticipantType[];
  dinnerParticipants: DinnerParticipantType[];
}) {
  const [selected, setSelected] = useState<boolean>(false);
  const options = dietaryOptions.map((item) => ({
    value: item.toLowerCase(),
    label: item,
  }));

  useEffect(() => {
    if (selected === true) {
      const participant: DinnerParticipantType[] = [{
        name: name,
        diet: "normal",
      }];

      const extraParticipants: DinnerParticipantType[] = participants.map((
        participant,
      ) => (
        {
          name: participant.name,
          diet: "normal",
        }
      ));
      setFieldValue("dinnerParticipants", [
        ...participant,
        ...extraParticipants,
      ]);
    } else {
      setFieldValue("dinnerParticipants", []);
    }
  }, [name, participants, setFieldValue, selected]);

  return (
    <div className="question_wrapper">
      <QuestionTitle>Conference Networking Dinner</QuestionTitle>
      <p className="-mt-2 mb-2">AU$150 Per Person</p>
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => setSelected(true)}
          className={clsx(
            "border field_input bg-stone-700 transition_config rounded-md transition_config hover:scale-[101%] active:scale-[99%]",
            {
              "!bg-gradient-to-r gradient !text-black": selected === true,
            },
          )}
        >
          Yes
        </button>
        <button
          type="button"
          onClick={() => setSelected(false)}
          className={clsx(
            "border field_input bg-stone-700 transition_config rounded-md transition_config hover:scale-[101%] active:scale-[99%]",
            {
              "!bg-gradient-to-r gradient !text-black": selected === false,
            },
          )}
        >
          No
        </button>
      </div>
      {selected === false
        ? null
        : (
          <div className="mt-2 border-t-4 border-stone-700/80">
            <FieldArray name="dinnerParticipants">
              {({ remove, push }) => (
                <>
                  <div className="mb-2">
                    {dinnerParticipants.length > 0 &&
                      dinnerParticipants.map((participant, index) => (
                        <Fragment key={index}>
                          <DinnerParticipantField
                            name={`dinnerParticipants.${index}.name`}
                            position={`dinnerParticipants.${index}.diet`}
                            options={options}
                            push={push}
                            remove={remove}
                            setFieldValue={setFieldValue}
                            setSelected={setSelected}
                            index={index}
                            participant={participant}
                            participants={dinnerParticipants}
                          />
                        </Fragment>
                      ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      push({ name: "", diet: "normal" });
                    }}
                    className="w-full !bg-gradient-to-l gradient field_input text-black transition_config hover:scale-[101%] active:scale-[99%]"
                  >
                    Add Dinner Participant
                  </button>
                </>
              )}
            </FieldArray>
          </div>
        )}
    </div>
  );
}

type DinnerParticipantFieldProps = {
  name: string;
  position: string;
  options: {
    value: string;
    label: string;
  }[];
  push: Function;
  remove: Function;
  index: number;
  setFieldValue: Function;
  setSelected: Function;
  participant: DinnerParticipantType;
  participants: DinnerParticipantType[];
};
function DinnerParticipantField(
  {
    remove,
    setFieldValue,
    options,
    setSelected,
    index,
    participant,
    participants,
  }: DinnerParticipantFieldProps,
) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-1">
      <span className="validation_text sm:col-start-1 sm:col-end-2">
        <ErrorMessage
          name={`dinnerParticipants.${index}.name`}
          component="div"
        />
      </span>
      <Field
        type="text"
        name={`dinnerParticipants.${index}.name`}
        placeholder="Full Name"
        className="field_input sm:col-start-1 sm:col-end-2 text-black"
      />
      <span className="validation_text sm:col-start-2 sm:col-end-3 sm:row-start-1">
        <ErrorMessage
          name={`dinnerParticipants.${index}.diet`}
          component="div"
        />
      </span>
      <Select
        options={options}
        name={`dinnerParticipants.${index}.diet`}
        instanceId={`dinnerParticipants.${index}.diet`}
        value={options.filter((option) => option.value === participant.diet)}
        onChange={(event) => (
          setFieldValue(
            `dinnerParticipants.${index}.diet`,
            event?.value,
          )
        )}
        styles={customStyles}
        className="sm:col-start-2 sm:col-end-3"
      />
      <button
        type="button"
        onClick={() => {
          console.log(participants);
          if (participants.length === 1) {
            setSelected(false);
          }
          remove(index);
        }}
        className="field_input bg-red-600"
      >
        Remove
      </button>
    </div>
  );
}
