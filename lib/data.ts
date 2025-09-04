import React from "react";
import { RiInstagramFill, RiMailFill, RiPhoneFill } from "react-icons/ri";

export const configs = {
  contact: {
    phone: "+61414687972",
    email: "admin@icsconferences.org",
    address: "Seaford Entrance, Kewarra Beach QLD 4879",
  },
  forms: {
    submitPaper: "/submit-paper",
    exhibitor: "https://forms.gle/aL37hacuwX8EMcqw6",
    sponsor: "https://forms.gle/ETWg6NV9QC4GWD3U6",
  },
} as const;

export const cta = [
  {
    title: "Keynotes",
    description:
      "Empower others with your stories, insights, and wisdom, inspiring a world where Indigenous culture is celebrated and respected.",
    button: "Become a Speaker",
    image: "/assets/images/calltoaction/pamphlet_one.webp",
    form: configs.forms.submitPaper,
  },
  {
    title: "Exhibitions",
    description:
      "Use your platform to create awareness about vital Indigenous causes and issues, inspiring attendees to become advocates for positive change.",
    button: "Become an Exhibitor",
    image: "/assets/images/calltoaction/pamphlet_two.webp",
    form: configs.forms.exhibitor,
  },
  {
    title: "Sponsorship",
    description:
      "Associate your brand with a cause that matters, gaining valuable exposure to a diverse and engaged audience, both locally and globally.",
    button: "Become a Sponsor",
    image: "/assets/images/calltoaction/pamphlet_three.webp",
    form: configs.forms.sponsor,
  },
] as const;

export const links = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "About",
    path: "/about",
  },
  {
    name: "Conferences",
    path: "/#conferences",
  },
  {
    name: "Contact",
    path: "/contact",
  },
] as const;

export const referralOptions = [
  "Manager, Family, Friend or Colleague",
  "Email newsletter",
  "Social media (Facebook, Twitter, etc)",
  "Our website",
  "Koori Mail",
  "Other",
] as const;

export const accomodationOption = [
  {
    label: "No, Thank you",
    value: 0,
  },
  {
    label: "Yes, one (1) night",
    value: 1,
  },
  {
    label: "Yes, two (2) nights",
    value: 2,
  },
  {
    label: "Yes, three (3) nights",
    value: 3,
  },
  {
    label: "Yes, four (4) nights",
    value: 4,
  },
] as const;

export const dietaryOptions = [
  "Normal",
  "Diabetic",
  "Vegetarian",
  "Gluten Free",
  "Other",
] as const;

export const testimonials = [
  "I loved this conference and I can’t wait to come to the next one!",
  "I felt culturally safe - I am not Aboriginal, but I am not Anglo either. It felt warm, friendly and humble, don’t often get that it in conferences. I met some beautiful people and great networks. Thank you for the opportunity to present.",
  "Really enjoyed myself listening to everyone's story.",
  "Fantastic speakers again! Very informative and impactful for me!",
  "Food was great, organisers did a great job kept us informed and on time, great venue, lovely to see aboriginal wears on sale, IT was spot on and extremely helpful, helped with each presentation.",
  "Thank you for this opportunity to connect & learn from Indigenous people who have such similar struggles as the native population of our lands.",
] as const;

export const footerIcons = [
  {
    title: "Phone",
    icon: React.createElement(RiPhoneFill),
    href: `tel:${configs.contact.phone}`,
  },
  {
    title: "E-Mail",
    icon: React.createElement(RiMailFill),
    href: `mailto:${configs.contact.email}`,
  },
  {
    title: "Instagram",
    icon: React.createElement(RiInstagramFill),
    href: "https://www.instagram.com/ics_conferences/",
  },
];
