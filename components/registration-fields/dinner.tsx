"use client";

import clsx from "clsx";
import Select from "react-select";
import { dietaryOptions } from "@/lib/data";
import React, { Fragment, useEffect, useState } from "react";
import { ErrorMessage, Field, FieldArray } from "formik";
import { DinnerParticipantType, ParticipantType } from "@/lib/types";

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
      <h2 className="question_title">Conference Networking Dinner</h2>
      <p className="question_description mb-2 sm:mb-6">AU$150 Per Person</p>
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => setSelected(true)}
          className={clsx(
            "border field_input bg-stone-700 transition button_effect",
            {
              "!bg-gradient-to-r gradient": selected === true,
            },
          )}
        >
          Yes
        </button>
        <button
          type="button"
          onClick={() => setSelected(false)}
          className={clsx(
            "border rounded-sm bg-stone-700 transition_config field_input",
            {
              "!bg-gradient-to-r gradient": selected === false,
            },
          )}
        >
          No
        </button>
      </div>
      {selected === false ? null : (
        <div className="mt-6">
          <FieldArray name="dinnerParticipants">
            {({ remove, push }) => (
              <div>
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
                      />
                    </Fragment>
                  ))}
                <button
                  type="button"
                  onClick={() => {
                    push({ name: "", diet: "normal" });
                  }}
                  className="w-full !bg-gradient-to-l gradient field_input"
                >
                  Add Dinner Participant
                </button>
              </div>
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
};
function DinnerParticipantField(
  {
    name,
    position,
    remove,
    setFieldValue,
    options,
    push,
    setSelected,
    index,
    participant,
  }: DinnerParticipantFieldProps,
) {
  const customStyles = {
    control: (provided: Record<string, unknown>, state: any) => ({
      ...provided,
      padding: "6px 0",
      boxShadow: "none",
      borderColor: "none",
      "&:hover": {
        color: "#60B3D1",
      },
      border: state.isFocused ? "1.5px solid #60B3D1" : "1.5px solid #cbd5e1",
    }),
    option: (styles: any, state: any) => ({
      ...styles,
      color: "#000",
      backgroundColor: state.isSelected ? "#60B3D1" : styles.color,
      borderBottom: "1px solid rgba(0, 0, 0, 0.125)",
      "&:hover": {
        backgroundColor: "#60B3D1",
      },
    }),
    input: (base: any) => ({
      ...base,
      "input:focus": {
        boxShadow: "none",
        border: "1px solid #60B3D1",
      },
    }),
    menuPortal: (base: any) => ({ ...base, zIndex: 9999 }),
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 mb-2">
      <span className="text-red-600 font-medium sm:col-start-1 sm:col-end-2">
        <ErrorMessage
          name={`dinnerParticipants.${index}.name`}
          component="div"
        />
      </span>
      <Field
        type="text"
        name={`dinnerParticipants.${index}.name`}
        placeholder="Full Name"
        className="field_input sm:col-start-1 sm:col-end-2"
      />
      <span className="text-red-600 font-medium sm:col-start-2 sm:col-end-3 sm:row-start-1">
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
        className="sm:col-start-2 sm:col-end-3 z-40"
      />
      <button
        type="button"
        onClick={() => {
          if (index === 0) {
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
