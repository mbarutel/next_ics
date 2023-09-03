import Link from "next/link";
import React, { Fragment } from "react";
import {BiSolidDownArrow} from "react-icons/bi"

export default function Header() {
  return (
    <header className="relative h-[700px]">
      <HeaderBox />
      <GetStarted />
    </header>
  );
}

function HeaderBox() {
  return (
    <div className="text-center w-max absolute top-1/2 left-1/2 -translate-x-1/2">
      <div className="bg-off_yellow py-5 px-10">
        <h1>Indigenous Conference Services</h1>
        <p>The impossible is the next step for our journey</p>
      </div>
      <Fragment>
        <Link href="/" target="_blank" rel="noreferrer" className="btn">
          Register
        </Link>
        <Link href="/" target="_blank" rel="noreferrer" className="btn">
          Submit a paper
        </Link>
      </Fragment>
    </div>
  );
}

function GetStarted() {
  return (
    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex flex-col items-center">
      <a href="/">
        To get started, check the information below
      </a>
      <BiSolidDownArrow />
    </div>
  );
}
