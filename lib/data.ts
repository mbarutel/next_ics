import React from "react";
import { HiSpeakerphone } from "react-icons/hi";
import { PiMedalFill } from "react-icons/pi";
import { RiPresentationFill } from "react-icons/ri";

export const configs = {
  contact: {
    phone: "+61740009111",
    email: "adminics@iinet.net.au",
  },
  defaultCoverImage: {
    src:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    alt: "default-cover-image",
    width: 192,
    height: 192,
  },
  forms: {
    registration:
      "https://forms.office.com/Pages/ResponsePage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAa__ZvvzOdUNkRXNktIN1o4T1pGNFJDUEYwV1FBS1I5RS4u",
    submitPaper:
      "https://forms.office.com/pages/responsepage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAa__ZvvzOdURDA4VDFPTlgzVU01OUtBM0pCSkRBWFU0OS4u",
    exhibitor:
      "https://forms.office.com/pages/responsepage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAa__ZvvzOdURU5XVUZNTk1KVzRCSUM3VVc0OTM0VVYyUC4u",
    sponsor:
      "https://forms.office.com/pages/responsepage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAa__ZvvzOdURDE3WU0yN0M2VzRCQzNTMEVYUkdKRlBTVi4u",
  },
} as const;

// export const advantages = [
//   {
//     icon: React.createElement(HiSpeakerphone),
//     header: "Join the movement",
//     description:
//       "Be a part of our 100% Indigenous-owned conference services that are free from government influence. Embrace the power of First Nations culture and unity!",
//   },
//   {
//     icon: React.createElement(HiSpeakerphone),
//     header: "Celebrate cultural identity",
//     description:
//       "Join us in preserving and celebrating Indigenous cultural identity while striving for self-determination. Our heritage, paired with professional event management, sets the standard for excellence.",
//   },
//   {
//     icon: React.createElement(HiSpeakerphone),
//     header: "Forge partnerships",
//     description:
//       "Partner with us and fund conferences without relying on government sources. Shape the agenda and address your organization's specific needs. Let's make your event truly impactful.",
//   },
//   {
//     icon: React.createElement(HiSpeakerphone),
//     header: "Empower independence",
//     description:
//       "Support Indigenous independence through private enterprise. By working together, we can make a lasting impact on Indigenous communities' success and prosperity.",
//   },
// ] as const;

export const advantages = [
  {
    header: "Join the movement",
    image: "/assets/images/advantages-one.jpg",
  },
  {
    header: "Celebrate cultural identity",
    image: "/assets/images/advantages-two.jpg",
  },
  {
    header: "Forge partnerships",
    image: "/assets/images/advantages-three.jpg",
  },
  {
    header: "Empower independence",
    image: "/assets/images/advantages-four.jpg",
  },
] as const;

export const cta = [
  {
    title: "Keynotes",
    description:
      "Empower others with your stories, insights, and wisdom, inspiring a world where Indigenous culture is celebrated and respected.",
    button: "Become a Speaker",
    image: "/assets/images/advantages-two.jpg",
    form:
      "https://forms.office.com/pages/responsepage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAa__ZvvzOdURDA4VDFPTlgzVU01OUtBM0pCSkRBWFU0OS4u",
  },
  {
    title: "Exhibitions",
    description:
      "Use your platform to create awareness about vital Indigenous causes and issues, inspiring attendees to become advocates for positive change.",
    button: "Become an Exhibitor",
    image: "/assets/images/advantages-three.jpg",
    form:
      "https://forms.office.com/pages/responsepage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAa__ZvvzOdURU5XVUZNTk1KVzRCSUM3VVc0OTM0VVYyUC4u",
  },
  {
    title: "Sponsorship",
    description:
      "Associate your brand with a cause that matters, gaining valuable exposure to a diverse and engaged audience, both locally and globally.",
    button: "Become a Sponsor",
    image: "/assets/images/advantages-one.jpg",
    form:
      "https://forms.office.com/pages/responsepage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAa__ZvvzOdURDE3WU0yN0M2VzRCQzNTMEVYUkdKRlBTVi4u",
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
    path: "/conferences",
  },
  {
    name: "Contact Us",
    path: "/contact",
  },
] as const;
