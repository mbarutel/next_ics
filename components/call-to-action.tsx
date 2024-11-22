import Link from "next/link";
import Image from "next/image";
import { cta } from "@/lib/data";
import React, { Fragment } from "react";

export default function CallToAction() {
  return (
    <section>
      <div className="container">
        <h2 className="section_title">Become Part of ICS</h2>
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
function ActionCard({
  title,
  description,
  button,
  image,
  form,
}: ActionCardProp) {
  return (
    <div className="flex flex-col">
      <div className="relative h-64 sm:h-96 lg:h-80 xl:h-96 rounded-sm overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover hover:scale-110 transition-all duration-500"
        />
      </div>
      <hr className="my-4" />
      <div className="flex-grow flex flex-col">
        <h3 className="text-2xl font-bold uppercase">{title}</h3>
        <p className="flex-grow my-2">{description}</p>
        <Link
          href={form}
          target="_blank"
          rel="noreferrer"
          className="mt-3 button_primary"
        >
          {button}
        </Link>
      </div>
    </div>
  );
}
