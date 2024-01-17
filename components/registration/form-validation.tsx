import * as Yup from "yup";

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
    .required("*"),
  extraParticipants: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required("*Required"),
      position: Yup.string().required("*Required"),
    }),
  ),
  dinnerParticipants: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required("*Required"),
      diet: Yup.string().required("*Required"),
    }),
  ),
  price: Yup.object().shape({
    // priceChoice: Yup.number().required("*"),
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
});

export default FormValidation;
