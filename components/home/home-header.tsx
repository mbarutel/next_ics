import React, { Fragment } from "react";
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
  const title = ["Indigenous", "Conference", "Services"];
  return (
    <div className="absolute flex_col w-[95%] left-2 md:w-fit md:left-5 top-1/2 md:top-1/3 -translate-y-1/2 z-40">
      <h1 className="arvo uppercase font-extrabold text-5xl sm:text-6xl flex flex-wrap">
        {title.map((text, index) => (
          <Fragment key={index}>{text}</Fragment>
        ))}
      </h1>
      <hr className="h-2 w-full bg-white rounded-sm my-2" />
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
    <div className="hidden md:grid grid-cols-6 gap-3 z-20 absolute inset-0">
      <div className="header_grid_empty hidden lg:block lg:col-start-4 lg:col-end-6 2xl:col-start-3 2xl:col-end-6" />
      <div className="header_grid_with_text header_grid_effects flex_end md:col-start-5 lg:col-start-6 md:col-end-7">
        <h3>
          proudly presented, formulated, designed and organised by First Nations
          peoples
        </h3>
      </div>
      <div className="header_grid_with_text header_grid_effects flex_end md:col-start-5 md:col-end-7 lg:col-end-6">
        <h3>
          encompassing Aboriginal people, Torres Strait Islander people, and the
          Mob
        </h3>
      </div>
      <div className="header_grid_empty hidden lg:block" />
      <div className="header_grid_empty col-start-5 col-end-7 lg:col-start-1 lg:col-end-2 lg:hidden" />
      <div className="header_grid_with_text header_grid_effects flex_end col-start-1 col-end-3 lg:col-start-4 lg:col-end-5">
        <h3>the impossible is the next step for our journey</h3>
      </div>
      <div className="header_grid_empty hidden lg:block lg:row-start-3 lg:row-end-5 lg:col-start-5 lg:col-end-5" />
      <div className="header_grid_empty hidden lg:block" />
      <div className="header_grid_with_text flex_end col-start-3 col-end-5 lg:col-start-1 lg:col-end-5 hover:italic">
        <h3>
          <span className="!uppercase">ICS</span> stands as a fully
          Indigenous-owned enterprise, maintaining complete independence from
          government funding bodies
        </h3>
      </div>
      <div className="header_grid_with_text header_grid_effects col-start-5 col-end-7 lg:col-auto flex_end">
        <h3>
          hosted by First Nations health professionals and Indigenous conference
          organizers
        </h3>
      </div>
    </div>
  );
}
