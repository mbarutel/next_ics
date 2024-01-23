"use client";

import React from "react";
import dayjs from "dayjs";
import EmptyWarning from "./empty-warning";
import { FormValuesType, PriceType } from "@/lib/types";
import { Field, FormikErrors, FormikTouched } from "formik";
import QuestionTitle from "./question-title";

export default function Price(
  { errors, prices, priceChoice, setFieldValue, defaultDueDate }: {
    prices: PriceType | undefined;
    priceChoice: number;
    setFieldValue: Function;
    errors: FormikErrors<FormValuesType>;
    touched: FormikTouched<FormValuesType>;
    defaultDueDate: string | undefined;
  },
) {
  if (prices === undefined || defaultDueDate === undefined) {
    return null;
  }

  return (
    <div className="question_wrapper">
      <div className="flex gap-1">
        <EmptyWarning
          text={errors.price?.dueDate as string}
          error={errors.price?.dueDate}
          touched={errors.price?.dueDate}
        />
        <QuestionTitle>Registration Fee</QuestionTitle>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-1 xl:gap-2">
        {prices.base.map((item, index) => {
          const now = new Date();
          const dueDate = new Date(item.dueDate);

          if (dueDate <= now) {
            return null;
          }
          return (
            <button
              type="button"
              key={index}
              onClick={() => (setFieldValue("price", {
                priceChoice: item.price,
                dueDate: dueDate,
              }))}
              className="flex items-center justify-start gap-1 bg-stone-700 border-[1px] border-white rounded-md px-3 py-2"
            >
              <Field
                type="radio"
                name="price"
                checked={priceChoice === item.price}
                onChange={() => {
                  setFieldValue("price", {
                    priceChoice: item.price,
                    dueDate: dueDate,
                  });
                }}
              />
              <span className="font-semibold">
                Before {dayjs(item.dueDate).format("DD, MMM YYYY")}
              </span>: AU${item.price}
            </button>
          );
        })}

        <button
          type="button"
          onClick={() => (setFieldValue("price", {
            priceChoice: prices.walkIn,
            dueDate: new Date(defaultDueDate),
          }))}
          className="flex items-center justify-start gap-1 bg-stone-700 border-[1px] border-white rounded-md px-3 py-2"
        >
          <Field
            type="radio"
            name="price"
            checked={priceChoice === prices.walkIn}
            onChange={() => {
              setFieldValue("price", {
                priceChoice: prices.walkIn,
                dueDate: new Date(defaultDueDate),
              });
            }}
          />
          <span className="font-semibold">Walk-in Price</span>: AU${prices
            .walkIn}
        </button>
      </div>
    </div>
  );
}
