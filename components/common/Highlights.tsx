import React from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

type HighlightsProps = {
  text: string;
};
export default function Highlights({ text }: HighlightsProps) {
  return (
    <div className="text-metal_gray text-sm md:text-lg lg:text-2xl flex md:justify-center md:items-center">
      <IoMdCheckmarkCircleOutline className="mr-2 text-xl lg:text-3xl" />
      <span>{text}</span>
    </div>
  );
}
