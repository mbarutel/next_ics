import React from "react";
import Link from "next/link";
import SpinningBackground from "../shared/spinning-header";

export default function HomeHeader() {
  return (
    <header>
      <div className="container -mt-6">
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
    <div className="absolute flex_col w-[95%] left-2 md:w-fit md:left-5 top-1/2 xl:top-1/3 -translate-y-1/2 z-40">
      <h1 className="arvo uppercase font-extrabold text-5xl sm:text-6xl">
        Indigenous
        <br />
        Conference
        <br />
        Services
      </h1>
      <div className="h-2 w-full bg-white rounded-full my-3" />
      <p className="md:w-[25rem] leading-tight">
        ICS wishes to invite you and your team with interest in humanities and
        improving outcomes for First Nations people to our next conference.
      </p>
      <Link href="/#conferences" className="button_primary w-fit mt-6">
        To our conferences
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
          proudly presented, formulated, designed and organised by First Nations
          peoples
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
        <h3>the impossible is the next step for our journey</h3>
      </div>
      <div className="header_grid_empty hidden xl:block xl:row-start-3 xl:row-end-5 xl:col-start-5 xl:col-end-5" />
      <div className="header_grid_empty hidden xl:block" />
      <div className="header_grid_with_text flex_end xl:col-start-1 xl:col-end-5 hover:italic">
        <h3>
          <span className="!uppercase">ICS</span> stands as a fully
          Indigenous-owned enterprise, maintaining complete independence from
          government funding bodies
        </h3>
      </div>
      <div className="header_grid_with_text header_grid_effects flex_end">
        <h3>
          hosted by First Nations health professionals and Indigenous conference
          organizers
        </h3>
      </div>
    </div>
  );
}
