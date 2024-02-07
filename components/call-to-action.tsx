import Link from "next/link";
import Image from "next/image";
import { cta } from "@/lib/data";
import React, { Fragment } from "react";
import SectionHeaderText from "./section-header-text";

export default function CallToAction() {
  return (
    <section className="section_margin">
      <div className="section_container">
        <SectionHeaderText>Become Part of ICS</SectionHeaderText>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-7">
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
    <div className="flex flex-col">
      <div className="relative h-64 sm:h-96 lg:h-80 xl:h-96 rounded-md overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover hover:scale-110 transition-all duration-500"
        />
      </div>
      <div className="px-2 mt-4 flex-grow flex flex-col">
        <h3 className="text-2xl font-bold uppercase">
          {title}
        </h3>
        <p className="flex-grow mt-1 mb-3">
          {description}
        </p>
        <span className="inline-flex w-full h-[3px] bg-gradient-to-r gradient rounded-full" />
        <Link
          href={form}
          target="_blank"
          rel="noreferrer"
          className="relative mt-3 lg:mt-5 button_config bg-black w-full"
        >
          {button}
        </Link>
      </div>
    </div>
  );
}
