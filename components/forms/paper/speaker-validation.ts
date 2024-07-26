import * as Yup from "yup";

const SpeakerValidation = Yup.object().shape({
  events: Yup.object().nonNullable(),
  name: Yup.string()
    .min(2)
    .max(50, "* Too Long")
    .required("*"),
  jobTitle: Yup.string()
    .max(50, "*Too Long")
    .required("*"),
  organization: Yup.string()
    .min(2, "*Too Short")
    .max(50, "*Too Long")
    .required("*"),
  address: Yup.string() // this needs proper validation
    .min(2, "*Too Short")
    .max(50, "*Too Long")
    .required("*"),
  phone: Yup.string().email("*Invalid email").required("*"),
  email: Yup.string()
    .min(2, "*Too Short")
    .max(100, "*Too Long")
    .required("*"),
  accomodation: Yup.string()
    .required("*"),
  referral: Yup.string()
    .required("*"),
  agreement: Yup.boolean()
    .oneOf([true], "*"),
});

export default SpeakerValidation;
