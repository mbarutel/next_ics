"use client";

import React, { useEffect } from "react";
import dayjs from "dayjs";
import EmptyWarning from "./empty-warning";
import { FormValuesType, PriceType } from "@/lib/types";
import { Field, FormikErrors, FormikTouched } from "formik";
import QuestionTitle from "./question-title";
import clsx from "clsx";

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

  // Auto-select current price tier based on today's date
  useEffect(() => {
    if (priceChoice === 0 && prices) {
      const now = new Date();

      // Find the first valid (non-expired) price tier
      const currentTier = prices.base.find((item) => {
        const dueDate = new Date(item.dueDate);
        return dueDate > now;
      });

      if (currentTier) {
        setFieldValue("price", {
          priceChoice: currentTier.price,
          dueDate: currentTier.dueDate,
        });
      } else {
        // If all tiers are expired, select walk-in price
        setFieldValue("price", {
          priceChoice: prices.walkIn,
          dueDate: new Date(defaultDueDate),
        });
      }
    }
  }, [prices, priceChoice, setFieldValue, defaultDueDate]);

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
              className={clsx(
                "flex items-center justify-start gap-1 bg-stone-700 border-[1px] border-white rounded-md px-3 py-2 transition_config hover:scale-[101%] active:scale-[99%]",
                {
                  "!bg-gradient-to-r gradient text-black":
                    priceChoice === item.price,
                },
              )}
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
          className={clsx(
            "flex items-center justify-start gap-1 bg-stone-700 border-[1px] border-white rounded-md px-3 py-2 transition_config hover:scale-[101%] active:scale-[99%]",
            {
              "!bg-gradient-to-r gradient text-black":
                priceChoice === prices.walkIn,
            },
          )}
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
