"use client";

import { dietaryOptions } from "@/lib/data";
import { Field, FieldArray } from "formik";
import React, { Fragment, useEffect, useState } from "react";
import { DinnerParticipantType } from "@/lib/types";
import Select from "react-select";
import { formSelectStyle } from "@/lib/form-select-style";
import QuestionTitle from "./question-title";
import clsx from "clsx";
import { QuestionBaseProps } from "@/lib/form-paper";

type QuestionDinnerProps = QuestionBaseProps & {
  name: string;
  price: number;
  setFieldValue: Function;
};

export default function QuestionDinner({
  values,
  touched,
  name,
  price,
  setFieldValue,
}: QuestionDinnerProps) {
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
                    {values.dinnerParticipants.length > 0 &&
                      values.dinnerParticipants.map((participant, index) => (
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
                            participants={values.dinnerParticipants}
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
      <Field
        type="text"
        name={`dinnerParticipants.${index}.name`}
        placeholder="Full Name"
        className={clsx("field", {
          "!placeholder-red-500 !border-red-500 italic":
            !field.value?.trim() && field.touched,
        })}
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
