import { FormValuesType, RegistrationType } from "./types";

export const validateString = (value: unknown, maxLength: number) => {
  if (!value || typeof value !== "string" || value.length > maxLength) {
    return false;
  }
  return true;
};

export const getErrorMessage = (error: unknown) => {
  let message: string;

  if (error instanceof Error) {
    message = error.message;
  } else if (error && typeof error === "object" && "message" in error) {
    message = String(error.message);
  } else if (typeof error === "string") {
    message = error;
  } else {
    message = "Something went wrong";
  }

  return message;
};

// export const RegistrationObjectApiParser = (
//   { values, conference }: { values: FormValuesType; conference: string },
// ) => {
//   const events = values.events.join("\n");
//
//   const registrationApiObject: RegistrationType = {
//     conference: conference,
//     events: events,
//     address: values.address,
//     company: values.company,
//     discount: values.discount,
//     referral: values.referral,
//     priceValue: values.price.priceChoice,
//     priceDueDate: values.price.dueDate,
//     masterclass: values.masterclass,
//     accomodation: values.accomodation,
//     mainParticipant: {
//       name: values.name,
//       email: values.email,
//       position: values.position,
//       phone: values.phone,
//     },
//     extraParticipants: values.extraParticipants,
//     agreement: values.agreement,
//   };
// };
