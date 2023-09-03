export const configs = {
  contact: {
    phone: "",
    email: "",
    address: "",
  },
  defaultCoverImage: {
    src:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    alt: "default-cover-image",
    width: 192,
    height: 192,
  },
} as const;

export const cta = [
  {
    header: "Join the Indigenous Movement",
    description: [
      "Be a part of our 100% Indigenous-owned conference services that are free from government influence.",
      "Embrace the power of First Nations culture and unity!",
    ],
  },
  {
    header: "Celebrate Cultural Identity",
    description: [
      "Join us in preserving and celebrating Indigenous cultural identity while striving for self-determination.",
      "Our heritage, paired with professional event management, sets the standard for excellence.",
    ],
  },
  {
    header: "Forge Partnerships, Not Just Events",
    description: [
      "Partner with us and fund conferences without relying on government sources.",
      "Shape the agenda and address your organization's specific needs. Let's make your event truly impactful.",
    ],
  },
  {
    header: "Empower Indigenous Independence",
    description: [
      "Support Indigenous independence through private enterprise.",
      "By working together, we can make a lasting impact on Indigenous communities' success and prosperity.",
    ],
  },
] as const;
