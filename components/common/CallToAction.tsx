import React from "react";
import { cta } from "@/lib/data";
import Link from "next/link";

export default function CallToAction() {
  return (
    <section>
      <div className="container text-center">
        <h3 className="text-center mb-8 text-3xl italic font-thin">
          Building better future together
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {cta.map((item, index) => (
            <div key={index}>
              <div className="advantage_card">
                <span className="text-4xl mb-3">
                  {item.icon}
                </span>
                <strong className="text-2xl">
                  {item.title}
                </strong>
                <p className="italic text-center">
                  {item.description}
                </p>
              </div>
              <Link
                href={item.form}
                className="border-b-[1px] inline-block mt-4 text-2xl effects"
                target="_blank"
                rel="noreferrer"
              >
                {item.button}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
