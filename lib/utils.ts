import { FormValuesType, ParticipantType, RegistrationType } from "./types";

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

export const RegistrationObjectApiParser = (
  { values, conference }: { values: FormValuesType; conference: string },
): RegistrationType => {
  console.log(values);
  const events = values.events.join("\n");
  const extraParticipants = values.extraParticipants.map((item) =>
    item.name.concat(` | ${item.position}`)
  ).join("\n");
  const dinnerParticipants = values.dinnerParticipants.map((item) =>
    item.name.concat(` | ${item.diet}`)
  ).join("\n");

  return {
    conference: conference,
    events: events,
    address: values.address,
    company: values.company,
    discount: values.discount,
    referral: values.referral,
    priceValue: values.price.priceChoice,
    priceDueDate: values.price.dueDate,
    masterclass: values.masterclass,
    accomodation: values.accomodation,
    paymentMethod: values.paymentMethod,
    mainParticipant: {
      name: values.name,
      email: values.email,
      position: values.position,
      phone: values.phone,
    },
    dinnerParticipants: dinnerParticipants,
    extraParticipants: extraParticipants,
    agreement: values.agreement,
  };
};
