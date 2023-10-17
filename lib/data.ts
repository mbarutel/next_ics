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

export const cta = [
  {
    title: "Keynotes",
    description:
      "Empower others with your stories, insights, and wisdom, inspiring a world where Indigenous culture is celebrated and respected.",
    button: "Become a Speaker",
    image: "/assets/images/advantages-two.webp",
    form:
      "https://forms.office.com/pages/responsepage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAa__ZvvzOdURDA4VDFPTlgzVU01OUtBM0pCSkRBWFU0OS4u",
  },
  {
    title: "Exhibitions",
    description:
      "Use your platform to create awareness about vital Indigenous causes and issues, inspiring attendees to become advocates for positive change.",
    button: "Become an Exhibitor",
    image: "/assets/images/advantages-three.webp",
    form:
      "https://forms.office.com/pages/responsepage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAa__ZvvzOdURU5XVUZNTk1KVzRCSUM3VVc0OTM0VVYyUC4u",
  },
  {
    title: "Sponsorship",
    description:
      "Associate your brand with a cause that matters, gaining valuable exposure to a diverse and engaged audience, both locally and globally.",
    button: "Become a Sponsor",
    image: "/assets/images/advantages-one.webp",
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
