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
      "https://forms.office.com/pages/responsepage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAa__ZvvzOdUOFJaVzVPRTUxRjhPT0dVV0lJTlNaRzg5Uy4u",
    submitPaper:
      "https://forms.office.com/pages/responsepage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAa__ZvvzOdURDA4VDFPTlgzVU01OUtBM0pCSkRBWFU0OS4u",
    exhibitor:
      "https://forms.office.com/pages/responsepage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAa__ZvvzOdURU5XVUZNTk1KVzRCSUM3VVc0OTM0VVYyUC4u",
    sponsor:
      "https://forms.office.com/pages/responsepage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAa__ZvvzOdURDE3WU0yN0M2VzRCQzNTMEVYUkdKRlBTVi4u",
  },
} as const;

export const advantages = [
  {
    header: "Join the Indigenous Movement",
    description:
      "Be a part of our 100% Indigenous-owned conference services that are free from government influence. Embrace the power of First Nations culture and unity!",
  },
  {
    header: "Celebrate Cultural Identity",
    description:
      "Join us in preserving and celebrating Indigenous cultural identity while striving for self-determination. Our heritage, paired with professional event management, sets the standard for excellence.",
  },
  {
    header: "Forge Partnerships, Not Just Events",
    description:
      "Partner with us and fund conferences without relying on government sources. Shape the agenda and address your organization's specific needs. Let's make your event truly impactful.",
  },
  {
    header: "Empower Indigenous Independence",
    description:
      "Support Indigenous independence through private enterprise. By working together, we can make a lasting impact on Indigenous communities' success and prosperity.",
  },
] as const;

export const cta = [
  {
    title: "Keynotes",
    description: "Share your passion through ICS",
    button: "Become a Speaker",
    icon: React.createElement(HiSpeakerphone),
    form:
      "https://forms.office.com/pages/responsepage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAa__ZvvzOdURDA4VDFPTlgzVU01OUtBM0pCSkRBWFU0OS4u",
  },
  {
    title: "Exhibitions",
    description: "Connect, Engage, & Exhibit at ICS",
    button: "Become an Exhibitor",
    icon: React.createElement(RiPresentationFill),
    form:
      "https://forms.office.com/pages/responsepage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAa__ZvvzOdURU5XVUZNTk1KVzRCSUM3VVc0OTM0VVYyUC4u",
  },
  {
    title: "Sponsorship",
    description: "Share your passion through ICS",
    button: "Become a Speaker",
    icon: React.createElement(PiMedalFill),
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
    name: "Contact",
    path: "/contact",
  },
] as const;
