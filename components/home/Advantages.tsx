import React, { Fragment } from "react";
import { BiSolidRightArrow } from "react-icons/bi";
import { cta } from "@/lib/data";

export default function Advantages() {
  return (
    <section className="relative bg-advantages_background bg-cover bg-center">
      <div className="container">
        <h2 className="flex justify-center mb-4">
          Become&nbsp;part&nbsp;of&nbsp;ICS
        </h2>
        <div className="bg-off_white rounded-xl p-5 grid grid-cols-1 gap-3 shadow">
          {cta.map((item, index) => (
            <Fragment key={index}>
              <div className="flex text-light_brown items-center md:justify-center mb-1 md:mb-2 text-xl md:text-3xl">
                <BiSolidRightArrow className="hidden md:block mr-1 text-lg" />
                <h3>{item.header}</h3>
              </div>
              {item.description.map((description, index) => (
                <Fragment key={index}>
                  <p className="mb-1 text-left md:text-center">{description}</p>
                </Fragment>
              ))}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
