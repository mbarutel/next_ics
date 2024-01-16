import * as Yup from "yup";

const FormValidation = Yup.object().shape({
  events: Yup.array().min(1, "*Provide at least one event"),
  name: Yup.string()
    .min(2, "*Too Short!")
    .max(50, "*Too Long!")
    .required("*Required"),
  company: Yup.string()
    .max(50, "*Too Long!")
    .required("*Required"),
  position: Yup.string()
    .min(2, "*Too Short!")
    .max(50, "*Too Long!")
    .required("*Required"),
  phone: Yup.string() // this needs proper validation
    .min(2, "*Too Short!")
    .max(50, "*Too Long!")
    .required("*Required"),
  email: Yup.string().email("*Invalid email").required("*Required"),
  address: Yup.string()
    .min(2, "*Too Short!")
    .max(100, "*Too Long!")
    .required("*Required"),
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
    priceChoice: Yup.number().required("*Required"),
    dueDate: Yup.date().required("*Required"),
  }),
  masterclass: Yup.string()
    .required("*Required"),
  accomodation: Yup.string()
    .required("*Required"),
  referral: Yup.string()
    .required("*Required"),
  agreement: Yup.boolean()
    .oneOf([true], "*Must Accept Terms and Conditions"),
});

export default FormValidation;
