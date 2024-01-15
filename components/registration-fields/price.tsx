"use client";

// import { FeeType } from "@/contentful/types/types";
import { FormValuesType, PriceType } from "@/lib/types";
import { Field, FormikErrors, FormikTouched } from "formik";
import React from "react";
import { CiWarning } from "react-icons/ci";
import clsx from "clsx";
import dayjs from "dayjs";

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
      <div className="flex justify-between mb-2 sm:mb-6">
        <h2 className="question_title">Registration Fee</h2>
        {errors.price && touched.price
          ? (
            <div className="validation_message">
              <CiWarning />
              {errors.price.fee}
            </div>
          )
          : null}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-7 gap-y-2">
        <button
          type="button"
          onClick={() => (setFieldValue("price", {
            priceChoice: prices.student,
            dueDate: new Date(defaultDueDate),
          }))}
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
          Student Price:{" "}
          <span className="font-semibold">
            AU${prices.student}
          </span>
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
              <span className="font-semibold capitalize">
                {dayjs(item.dueDate).format("DD, MMM YYYY")}: AU${item.price}
              </span>
            </button>
          );
        })}
        <button
          type="button"
          onClick={() => (setFieldValue("price", {
            priceChoice: prices.walkIn,
            dueDate: new Date(defaultDueDate),
          }))}
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
          Walk-in Price:{" "}
          <span className="font-semibold">
            AU${prices.walkIn}
          </span>
        </button>
      </div>
    </div>
  );
}
