"use client";

import { formSelectStyle } from "@/lib/form-select-style";
import { QuestionBaseProps } from "@/lib/form-paper";
import { DinnerParticipantType } from "@/lib/types";
import React, { useEffect, useState } from "react";
import QuestionTitle from "./question-title";
import { dietaryOptions } from "@/lib/data";
import { Field, FieldArray } from "formik";
import Select, { SingleValue } from "react-select";
import clsx from "clsx";

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
  }, [selected, setFieldValue]);

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
                            index={index}
                            remove={remove}
                            options={options}
                            values={values}
                            touched={touched}
                            setSelected={setSelected}
                            setFieldValue={setFieldValue}
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

type DinnerParticipantFieldProps = QuestionBaseProps & {
  index: number;
  options: {
    value: string;
    label: string;
  }[];
  remove: Function;
  setSelected: Function;
  setFieldValue: Function;
  participant: DinnerParticipantType;
  participants: DinnerParticipantType[];
};
function DinnerParticipantField({
  index,
  options,
  remove,
  values,
  touched,
  setSelected,
  setFieldValue,
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
            !values.dinnerParticipants[index].name &&
            touched.dinnerParticipants &&
            touched.dinnerParticipants[index],
        })}
      />
      <Select
        options={options}
        name={`dinnerParticipants.${index}.diet`}
        instanceId={`dinnerParticipants.${index}.diet`}
        value={options.filter((option) => option.value === participant.diet)}
        onChange={(event: SingleValue<{ value: string; label: string }>) =>
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
