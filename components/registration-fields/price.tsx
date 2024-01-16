"use client";

import React from "react";
import dayjs from "dayjs";
import EmptyWarning from "./empty-warning";
import { FormValuesType, PriceType } from "@/lib/types";
import { Field, FormikErrors, FormikTouched } from "formik";

export default function Price(
  { errors, touched, prices, priceChoice, setFieldValue, defaultDueDate }: {
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
      <h2 className="question_title">Registration Fee</h2>
      <EmptyWarning
        text={errors.price?.dueDate as string}
        error={errors.price?.dueDate}
        touched={errors.price?.dueDate}
      />
      <div className="grid grid-cols-1">
        <button
          type="button"
          onClick={() => (setFieldValue("price", {
            priceChoice: prices.student,
            dueDate: new Date(defaultDueDate),
          }))}
          className="flex items-center justify-start gap-1"
        >
          <Field
            type="radio"
            name="price"
            checked={priceChoice === prices.student}
            onChange={() => {
              setFieldValue("price", {
                priceChoice: prices.student,
                dueDate: new Date(defaultDueDate),
              });
            }}
          />
          Student Price: AU${prices.student}
        </button>

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
              className="flex items-center justify-start gap-1"
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
              Before{" "}
              {dayjs(item.dueDate).format("DD, MMM YYYY")}: AU${item.price}
            </button>
          );
        })}

        <button
          type="button"
          onClick={() => (setFieldValue("price", {
            priceChoice: prices.walkIn,
            dueDate: new Date(defaultDueDate),
          }))}
          className="flex items-center justify-start gap-1"
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
          Walk-in Price: AU${prices.walkIn}
        </button>
      </div>
    </div>
  );
}
