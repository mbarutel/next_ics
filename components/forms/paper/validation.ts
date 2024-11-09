import * as Yup from "yup";

const FormValidation = Yup.object().shape({
  // events: Yup.string().trim().required(),
  // name: Yup.string().trim().max(50, "Too Long").required(),
  // jobTitle: Yup.string().trim().max(50, "Too Long").required(),
  // organisation: Yup.string().trim().max(50, "Too Long").required(),
  // address: Yup.string().trim().max(100, "Too Long").required(),
  // phone: Yup.string().trim().max(100, "Too Long").required(),
  // email: Yup.string().trim().email("Invalid Email").required(),
  // paperTitle: Yup.string().trim().max(100, "Invalid Email").required(),
  // biography: Yup.string().trim().max(100, "Invalid Email").required(),
  // paperDescription: Yup.string().trim().max(100, "Invalid Email").required(),
  // accomodation: Yup.string().required(),
  // dinnerParticipants: Yup.array()
  //   .of(
  //     Yup.object().shape({
  //       name: Yup.string().notRequired(),
  //       diet: Yup.string().notRequired(),
  //     }),
  //   )
  //   .notRequired(),
  // masterclass: Yup.string().trim().max(100, "Invalid Email").required(),
  // payment: Yup.string().trim().max(100, "Invalid Email").notRequired(),
  // discount: Yup.string().trim().max(100, "Invalid Email").notRequired(),
  // referral: Yup.string().required(),
  // agreement: Yup.boolean().isTrue(),
  events: Yup.string().trim(),
  name: Yup.string().trim(),
  jobTitle: Yup.string().trim(),
  organisation: Yup.string().trim(),
  address: Yup.string().trim(),
  phone: Yup.string().trim(),
  email: Yup.string().trim(),
  paperTitle: Yup.string().trim(),
  biography: Yup.string().trim(),
  paperDescription: Yup.string(),
  accomodation: Yup.string(),
  dinnerParticipants: Yup.array().of(
    Yup.object().shape({
      name: Yup.string(),
      diet: Yup.string(),
    }),
  ),
  masterclass: Yup.string().trim(),
  payment: Yup.string().trim(),
  discount: Yup.string().trim(),
  referral: Yup.string(),
  agreement: Yup.string().matches(/^true$/),
});

export default FormValidation;
