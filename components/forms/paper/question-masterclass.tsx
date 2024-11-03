"use client";

import React, { Fragment, useEffect, useState } from "react";
import { EventType, MasterclassType } from "@/lib/types";
import { QuestionBaseProps } from "@/lib/form-paper";
import QuestionTitle from "./question-title";

type QuestionMasterclassProps = QuestionBaseProps & {
  events: EventType[];
};
export default function QuestionMasterclass({
  values,
  touched,
  events,
}: QuestionMasterclassProps) {
  const [masterclasses, setMasterclasses] = useState<MasterclassType[]>([]);

  useEffect(() => {
    let arr: MasterclassType[] = [];

    events.forEach((event) => {
      if (
        values.events.includes(event.title) &&
        event.conference &&
        event.conference.masterclass.length > 0
      ) {
        arr.push(...event.conference.masterclass);
      }
    });

    setMasterclasses(arr);
  }, [values.events]);

  if (masterclasses.length === 0) {
    return null;
  }

  return (
    <>
      <hr className="my-2" />
      <div className="form_section_wrapper">
        <QuestionTitle title="Post Conference Masterclass" />
        <div className="flex_col">
          {masterclasses.map((masterclass) => (
            <Fragment key={masterclass.slug}>
              <label>
                <input
                  type="radio"
                  name="masterclass"
                  value={masterclass.title}
                />
                {masterclass.title}
              </label>
            </Fragment>
          ))}
          <label>
            <input type="radio" name="masterclass" value="no" />
            No
          </label>
        </div>
      </div>
    </>
  );
}
