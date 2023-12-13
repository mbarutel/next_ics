import Image from "next/image";
import React from "react";

export default function LandingHeader() {
  return (
    <header>
      <div className="container mt-7 md:h-[45rem]">
        <SpinningBackground />
        <TitleAndSubTitle />
        <GridHeader />
      </div>
    </header>
  );
}

function SpinningBackground() {
  return (
    <div className="overflow-hidden relative h-full rounded-tl-lg">
      <div className="absolute left-1/4 -translate-x-1/2 top-1/2 -translate-y-1/2 z-0">
        <div className="relative h-[80rem] w-[80rem] rounded-full overflow-hidden">
          <Image
            src="/assets/images/conference-bg.webp"
            alt="Conference Aboriginal Art"
            fill
            className="object-cover opacity-20 z-10 grayscale animate-[spin_8s_linear_infinite]"
          />
        </div>
      </div>
    </div>
  );
}

function TitleAndSubTitle() {
  return (
    <div className="absolute left-5 top-1/4 -translate-y-1/2 z-10">
      <h1 className="flex_col font-extrabold text-6xl w-fit">
        <span>Indigenous</span>
        <span>Conference</span>
        <span>Services</span>
        <span className="h-2 w-full bg-white rounded-full my-3" />
      </h1>
      <p className="flex_col">
        <span>ICS wishes to invite you and your Team for the interest</span>
        <span className="-mt-1">
          in humanities and improving outcomes for First
        </span>
        <span className="-mt-1">Nations people to our next event</span>
      </p>
    </div>
  );
}

function GridHeader() {
  return (
    <div className="grid grid-cols-6 gap-3 z-10 absolute inset-0">
      <div className="header_grid_empty col-start-3 col-end-6" />
      <div className="header_grid header_grid_effects">
        <h3 className="header_grid_text">
          Proudly presented, formulated, designed and organised by First Nations
          Peoples
        </h3>
      </div>
      <div className="header_grid header_grid_effects col-start-5 col-end-6">
        <h3 className="header_grid_text text-justify">
          encompassing Aboriginal people, Torres Strait Islander people and the
          Mob - Koorie, Koori, Goori, Yolngu, Anangu, Palawa, Murri, Nunga,
          Ngarrindjeri
        </h3>
      </div>
      <div className="header_grid_empty" />
      <div className="header_grid header_grid_effects col-start-4 col-end-5">
        <h3 className="header_grid_text">
          The IMPOSSIBLE IS THE NEXT STEP FOR OUR JOURNEY
        </h3>
      </div>
      <div className="header_grid_empty row-start-3 row-end-5 col-start-5 col-end-5" />
      <div className="header_grid_empty" />
      <div className="header_grid_empty col-start-1 col-end-5" />
      <div className="header_grid header_grid_effects">
        <h3 className="header_grid_text">
          Proudly presented, formulated, designed and organised by First Nations
          Peoples
        </h3>
      </div>
    </div>
  );
}
