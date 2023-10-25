import Link from "next/link";
import Image from "next/image";
import { cta } from "@/lib/data";
import React, { Fragment } from "react";

export default function CallToAction() {
  return (
    <section className="pt-8 lg:pt-12">
      <div className="container">
        <h2 className="w-fit section_header text-orange-500 mb-6 sm:mb-10">
          Become Part of ICS
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-2 lg:gap-8">
          {cta.map((action, index) => (
            <Fragment key={index}>
              <ActionCard {...action} />
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

type ActionCardProp = (typeof cta)[number];
function ActionCard(
  { title, description, button, image, form }: ActionCardProp,
) {
  return (
    <div className="bg-slate-400/90 shadow-xl shadow-black/20 flex flex-col rounded-md overflow-hidden group">
      <div className="relative h-52 lg:h-96 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-110 transition-all duration-500"
        />
      </div>
      <div className="px-3 pb-3 lg:px-6 lg:pb-6 mt-5 flex-grow flex flex-col">
        <h3
          style={{ fontFamily: "Gabarito" }}
          className="text-slate-950/80 text-2xl mb-1 lg:mb-3"
        >
          {title}
        </h3>
        <p className="text-slate-200 lg:text-lg flex-grow mb-3">
          {description}
        </p>
        <span className="inline-flex w-full h-[3px] bg-slate-800/80 rounded-full" />
        <Link
          href={form}
          target="_blank"
          rel="noreferrer"
          className="relative inline-flex group mt-3 lg:mt-5 button_padding bg-slate-700  text-white transition-all active:scale-95 w-fit rounded-md overflow-hidden"
        >
          <span className="z-10">
            {button}
          </span>
          <span className="absolute h-full w-0 left-0 bottom-0 group-hover:w-full bg-slate-950 transition-all ease-in-out z-0" />
        </Link>
      </div>
    </div>
  );
}
