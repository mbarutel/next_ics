import * as Yup from "yup";

const FormValidation = Yup.object().shape({
  events: Yup.object().nonNullable(),
  name: Yup.string()
    .trim()
    .min(2, "Too Short")
    .max(50, "Too Long")
    .required("Required"),
  jobTitle: Yup.string()
    .trim()
    .min(2, "Too Short")
    .max(50, "Too Long")
    .required("Required"),
  organisation: Yup.string()
    .trim()
    .min(2, "Too Short")
    .max(50, "Too Long")
    .required("Required"),
  address: Yup.string()
    .trim()
    .min(2, "Too Short")
    .max(50, "Too Long")
    .required("Required"),
  phone: Yup.string() // This needs proper validation
    .trim()
    .min(2, "Too Short")
    .max(100, "Too Long")
    .required("Required"),
  email: Yup.string().trim().email("Invalid Email").required("Required"),
  accomodation: Yup.string().required("Required"),
  referral: Yup.string().required("Required"),
  agreement: Yup.boolean().oneOf([true], "Required"),
});

export default FormValidation;
