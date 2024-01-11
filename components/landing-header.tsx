import React from "react";
import SpinningBackground from "./spinning-header";
import Link from "next/link";

export default function LandingHeader() {
  return (
    <header>
      <div className="section_container">
        <div className="relative header_wrapper">
          <SpinningBackground />
          <TitleAndSubTitle />
          <GridHeader />
        </div>
      </div>
    </header>
  );
}

function TitleAndSubTitle() {
  return (
    <div className="absolute flex_col left-5 top-1/2 xl:top-1/3 -translate-y-1/2 z-40">
      <h1 className="flex_col uppercase font-extrabold text-5xl sm:text-6xl w-fit">
        <span>Indigenous</span>
        <span>Conference</span>
        <span>Services</span>
        <span className="h-2 w-full bg-white rounded-full my-3" />
      </h1>
      <p className="text-base lg:text-base sm:max-w-[25rem] leading-none">
        ICS wishes to invite you and your team for the interest in humanities
        and improving outcomes for First Nations people to our next event
      </p>
      <Link
        href="/#conferences"
        className="rounded-md w-fit bg-gradient-to-r gradient px-7 py-4 mt-4 text-black/90 font-semibold uppercase hover:scale-105 active:scale-95 transition_config"
      >
        To Our Conferences
      </Link>
    </div>
  );
}

function GridHeader() {
  return (
    <div className="hidden xl:grid grid-cols-6 gap-3 z-20 absolute inset-0">
      <div className="header_grid_empty hidden xl:block xl:col-start-4 xl:col-end-6 2xl:col-start-3 2xl:col-end-6" />
      <div className="header_grid_with_text header_grid_effects flex_end xl:col-start-6 xl:col-end-7">
        <h3>
          Proudly presented, formulated, designed and organised by First Nations
          Peoples
        </h3>
      </div>
      <div className="header_grid_with_text header_grid_effects flex_end xl:col-start-5 xl:col-end-6">
        <h3>
          encompassing Aboriginal people, Torres Strait Islander people, and the
          Mob
        </h3>
      </div>
      <div className="header_grid_empty hidden lg:block" />
      <div className="header_grid_empty col-start-1 col-end-2 lg:hidden" />
      <div className="header_grid_with_text header_grid_effects flex_end xl:col-start-4 xl:col-end-5">
        <h3>
          The IMPOSSIBLE IS THE NEXT STEP FOR OUR JOURNEY
        </h3>
      </div>
      <div className="header_grid_empty hidden xl:block xl:row-start-3 xl:row-end-5 xl:col-start-5 xl:col-end-5" />
      <div className="header_grid_empty hidden xl:block" />
      <div className="header_grid_with_text flex_end xl:col-start-1 xl:col-end-5">
        <h3>
          <span className="!uppercase">ICS</span>{" "}
          stands as a fully Indigenous-owned enterprise, maintaining complete
          independence from government funding bodies
        </h3>
      </div>
      <div className="header_grid_with_text header_grid_effects flex_end">
        <h3>
          Hosted by First Nations Health Professionals and Indigenous Conference
          Organizers
        </h3>
      </div>
    </div>
  );
}
