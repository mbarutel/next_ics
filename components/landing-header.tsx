import Image from "next/image";
import React from "react";

export default function LandingHeader() {
  return (
    <header>
      <div className="container">
        <div className="relative mt-7 xl:h-[45rem] lg:h-[35rem] md:h-[30rem] sm:h-[25rem] h-[20rem] z-10">
          <SpinningBackground />
          <TitleAndSubTitle />
          <GridHeader />
        </div>
      </div>
    </header>
  );
}

function SpinningBackground() {
  return (
    <div className="overflow-hidden relative h-full rounded-lg">
      <div className="absolute left-1/4 -translate-x-1/2 top-1/2 -translate-y-1/2 z-10">
        <div className="relative h-[72rem] w-[72rem] rounded-full overflow-hidden">
          <Image
            src="/assets/images/header-bg.svg"
            alt="Conference Aboriginal Art"
            fill
            className="object-cover z-10 opacity-20 grayscale animate-[spin_10s_linear_infinite]"
          />
        </div>
      </div>
    </div>
  );
}

function TitleAndSubTitle() {
  return (
    <div className="absolute left-1/2 sm:left-5 top-1/2 sm:top-1/3 lg:top-1/4 -translate-y-1/2 -translate-x-1/2 sm:translate-x-0 z-20">
      <h1 className="flex_col font-extrabold text-5xl xl:text-6xl w-fit">
        <span>Indigenous</span>
        <span className="flex sm:flex-col gap-3">
          <span>Conference</span>
          <span>Services</span>
        </span>
        <span className="h-2 w-full bg-white rounded-full my-3" />
      </h1>
      <p className="flex_col text-base sm:text-sm lg:text-base max-w-1/2">
        <span>ICS wishes to invite you and your team for the interest</span>
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
    <div className="hidden sm:grid xl:grid-cols-6 lg:grid-cols-5 grid-cols-4 gap-3 z-20 absolute inset-0">
      <div className="header_grid_empty hidden lg:block xl:col-start-3 xl:col-end-6 lg:col-start-3 lg:col-end-5" />
      <div className="header_grid header_grid_effects flex_end lg:col-auto col-start-4 col-end-5">
        <h3 className="header_grid_text">
          Proudly presented, formulated, designed and organised by First Nations
          Peoples
        </h3>
      </div>
      <div className="header_grid_empty col-start-3 col-end-4 hidden md:block lg:hidden" />
      <div className="header_grid header_grid_effects flex_end xl:col-start-5 xl:col-end-6 lg:col-start-4 lg:col-end-5 col-start-4 col-end-5">
        <h3 className="header_grid_text">
          encompassing Aboriginal people, Torres Strait Islander people, and the
          Mob
        </h3>
      </div>
      <div className="header_grid_empty hidden lg:block" />
      <div className="header_grid_empty col-start-1 col-end-3 lg:col-span-2 xl:hidden" />
      <div className="header_grid header_grid_effects flex_end xl:col-start-4 xl:col-end-5 lg:col-start-3 lg:col-end-4">
        <h3 className="header_grid_text">
          The IMPOSSIBLE IS THE NEXT STEP FOR OUR JOURNEY
        </h3>
      </div>
      <div className="header_grid_empty hidden xl:block xl:row-start-3 xl:row-end-5 xl:col-start-5 xl:col-end-5" />
      <div className="header_grid_empty hidden xl:block" />
      <div className="header_grid_empty hidden lg:block xl:col-start-1 xl:col-end-5" />
      <div className="header_grid header_grid_effects flex_end">
        <h3 className="header_grid_text">
          Hosted by First Nations Health Professionals and Indigenous Conference
          Organizers
        </h3>
      </div>
    </div>
  );
}
