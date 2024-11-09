import * as Yup from "yup";

const FormValidation = Yup.object().shape({
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
