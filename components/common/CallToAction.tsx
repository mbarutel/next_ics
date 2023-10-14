import React, { Fragment } from "react";
import { cta } from "@/lib/data";
import Link from "next/link";
import Image from "next/image";

export default function CallToAction() {
  return (
    <section className="pt-8 lg:pt-12">
      <div className="container grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-8">
        {cta.map((action, index) => (
          <Fragment key={index}>
            <ActionCard {...action} />
          </Fragment>
        ))}
      </div>
    </section>
  );
}

type ActionCardProp = (typeof cta)[number];
function ActionCard(
  { title, description, button, image, form }: ActionCardProp,
) {
  return (
    <div className="bg-slate-400/90 shadow-xl shadow-black/20 flex flex-col">
      <div className="relative h-52 lg:h-96">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>
      <div className="px-3 pb-3 lg:px-6 lg:pb-6 mt-5 flex-grow flex flex-col">
        <h3 className="text-slate-950 text-2xl mb-1 lg:mb-3">{title}</h3>
        <p className="text-slate-200 lg:text-lg flex-grow mb-3">
          {description}
        </p>
        <span className="inline-flex w-full h-[3px] bg-slate-800/80" />
        <Link
          href={form}
          className="relative inline-flex group mt-3 lg:mt-5 button_padding bg-slate-700  text-white transition-all active:scale-95 w-fit"
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
