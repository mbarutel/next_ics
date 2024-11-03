"use client";

import { dietaryOptions } from "@/lib/data";
import { FieldArray } from "formik";
import React, { Fragment, useEffect, useState } from "react";
import { DinnerParticipantType } from "@/lib/types";
import Select from "react-select";
import InputField from "./input-field";
import { formSelectStyle } from "@/lib/form-select-style";
import QuestionTitle from "./question-title";

export default function QuestionDinner({
  name,
  price,
  setFieldValue,
  dinnerParticipants,
}: {
  name: string | null;
  price: number;
  setFieldValue: Function;
  dinnerParticipants: DinnerParticipantType[];
}) {
  const [selected, setSelected] = useState<boolean>(false);
  const options = dietaryOptions.map((item) => ({
    value: item.toLowerCase(),
    label: item,
  }));

  useEffect(() => {
    if (selected === true) {
      const participant: DinnerParticipantType[] = [
        {
          name: name ? name : "",
          diet: "normal",
        },
      ];

      setFieldValue("dinnerParticipants", [...participant]);
    } else {
      setFieldValue("dinnerParticipants", []);
    }
  }, [setFieldValue, selected]);

  return (
    <>
      <hr className="my-2" />
      <div className="form_section_wrapper">
        <QuestionTitle
          title="Conference Networking Dinner"
          subtitle={`Connect, collaborate, and create opportunities at our exclusive networking dinner! | AU$${price} Per Person`}
        />
        <hr className="mb-2" />
        <div className="flex flex-col">
          {!selected ? (
            <button
              onClick={() => {
                setSelected(true);
              }}
              className="button_primary text-center !w-full"
            >
              Yes, please!
            </button>
          ) : (
            <FieldArray name="dinnerParticipants">
              {({ remove, push }) => (
                <>
                  <div className="mb-3">
                    {dinnerParticipants.length > 0 &&
                      dinnerParticipants.map((participant, index) => (
                        <div key={index} className="mb-2">
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
                        </div>
                      ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      push({ name: "", diet: "normal" });
                    }}
                    className="button_primary bg-yellow-400"
                  >
                    Add Dinner Participant
                  </button>
                </>
              )}
            </FieldArray>
          )}
        </div>
      </div>
    </>
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
function DinnerParticipantField({
  remove,
  setFieldValue,
  options,
  setSelected,
  index,
  participant,
  participants,
}: DinnerParticipantFieldProps) {
  return (
    <div className="fields_wrapper xl:grid-cols-3">
      <InputField
        type="text"
        name={`dinnerParticipants.${index}.name`}
        placeholder="Full Name"
      />
      <Select
        options={options}
        name={`dinnerParticipants.${index}.diet`}
        instanceId={`dinnerParticipants.${index}.diet`}
        value={options.filter((option) => option.value === participant.diet)}
        onChange={(event) =>
          setFieldValue(`dinnerParticipants.${index}.diet`, event?.value)
        }
        styles={formSelectStyle}
      />
      <button
        type="button"
        onClick={() => {
          if (participants.length === 1) {
            setSelected(false);
          }
          remove(index);
        }}
        className="button_primary bg-red-400"
      >
        Remove
      </button>
    </div>
  );
}
