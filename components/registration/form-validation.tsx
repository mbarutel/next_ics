import * as Yup from "yup";

// Phone validation helper
const phoneRegex = /\d{10,}/;

const FormValidation = Yup.object().shape({
  events: Yup.array().min(1, "*"),
  name: Yup.string()
    .min(2, "*Too Short")
    .max(50, "*Too Long")
    .required("*"),
  company: Yup.string()
    .max(50, "*Too Long")
    .required("*"),
  position: Yup.string()
    .min(2, "*Too Short")
    .max(50, "*Too Long")
    .required("*"),
  phone: Yup.string() // this needs proper validation
    .min(2, "*Too Short")
    .max(50, "*Too Long")
    .required("*"),
  email: Yup.string().email("*Invalid email").required("*"),
  address: Yup.string()
    .min(2, "*Too Short")
    .max(100, "*Too Long")
    .notRequired(), // Made optional
  extraParticipants: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required("*Required"),
      position: Yup.string().required("*Required"),
      email: Yup.string().required("*Required"),
    }),
  ),
  dinnerParticipants: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required("*Required"),
      diet: Yup.string().required("*Required"),
    }),
  ),
  price: Yup.object().shape({
    priceChoice: Yup.number(),
    dueDate: Yup.date().required("*"),
  }),
  masterclass: Yup.string()
    .required("*"),
  accomodation: Yup.string()
    .required("*"),
  referral: Yup.string()
    .required("*"),
  agreement: Yup.boolean()
    .oneOf([true], "*"),
  // New delegate validation
  delegates: Yup.array().of(
    Yup.object().shape({
      firstName: Yup.string()
        .min(2, "First name must be at least 2 characters")
        .required("First name is required"),
      lastName: Yup.string()
        .min(2, "Last name must be at least 2 characters")
        .required("Last name is required"),
      jobTitle: Yup.string()
        .required("Job title is required"),
      organization: Yup.string()
        .required("Organization is required"),
      email: Yup.string()
        .email("Please enter a valid email address")
        .required("Email is required"),
      phone: Yup.string()
        .matches(phoneRegex, "Please enter a valid phone number (at least 10 digits)")
        .required("Phone number is required"),
      diet: Yup.string()
        .required("Dietary preference is required"),
      dinner: Yup.boolean()
        .required("Dinner selection is required"),
      masterclass: Yup.string()
        .nullable(),
      accommodationNights: Yup.number()
        .min(0, "Accommodation nights cannot be negative")
        .max(5, "Maximum 5 nights")
        .required("Accommodation nights is required"),
    })
  ).min(1, "At least one delegate is required"),
});

export default FormValidation;
