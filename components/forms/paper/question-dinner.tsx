"use client";

import { dietaryOptions } from "@/lib/data";
import { FieldArray } from "formik";
import React, { Fragment, useEffect, useState } from "react";
import { DinnerParticipantType } from "@/lib/types";
import Select from "react-select";
import InputField from "./input-field";
import { formSelectStyle } from "@/lib/form-select-style";

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
    if (selected === true && name !== null) {
      const participant: DinnerParticipantType[] = [
        {
          name: name,
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
      <h2 className="text-xl italic">Conference Networking Dinner</h2>
      <small className="pl-4 italic">{`AU$${price} Per Person`}</small>
      {!selected ? (
        <div className="flex_col gap-2">
          <label>
            <input
              type="radio"
              name="dinnerParticipation"
              checked={selected}
              onClick={() => setSelected(true)}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="dinnerParticipation"
              checked={!selected}
              onClick={() => setSelected(false)}
            />
            No
          </label>
        </div>
      ) : (
        <div className="">
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
                  className=""
                >
                  Add Dinner Participant
                </button>
              </>
            )}
          </FieldArray>
        </div>
      )}
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
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-1">
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
        className="border-white border-2 text-white rounded-md"
      >
        Remove
      </button>
    </div>
  );
}
