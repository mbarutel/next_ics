import React, { Fragment } from "react";
import { advantages } from "@/lib/data";

export default function Advantages() {
  return (
    <section>
      <div className="container relative bg-advantages_background bg-cover bg-center bg-fixed rounded-xl py-7">
        <div className="bg-white/40 rounded-xl p-5 grid grid-cols-1 gap-3 shadow min-w-[50%]">
          <h2 className="section_header text-stone-600/80 text-center">
            Become&nbsp;part&nbsp;of&nbsp;ICS
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {advantages.map((advantage, index) => (
              <Fragment key={index}>
                <h3 className="capitalize font-semibold text-stone-500/90 text-center">
                  {advantage}
                </h3>
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
