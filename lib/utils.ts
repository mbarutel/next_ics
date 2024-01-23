import {
  ConferenceType,
  DinnerParticipantType,
  FormValuesType,
  ParticipantType,
  RegistrationType,
} from "./types";

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
  { values, conference }: {
    values: FormValuesType;
    conference: ConferenceType;
  },
): RegistrationType => {
  const reference = parseReference(values.events);
  const events = values.events.join("\n");
  const extraParticipants = parseExtraParticipants(values.extraParticipants)
    .map((item) => item.name.concat(` | ${item.email} | ${item.position}`))
    .join("\n");
  const dinnerParticipants = parseDinnerParticipants(values.dinnerParticipants)
    .map((item) => item.name.concat(` | ${item.diet}`)).join("\n");

  if (!conference.prices) {
    throw new Error("Conference prices are not set");
  }

  const dinnerPrice = values.dinnerParticipants.length *
    conference.prices?.dinner;
  const masterclassPrice = values.masterclass === "no"
    ? 0
    : conference.prices?.masterclass;
  const total =
    (values.price.priceChoice * (values.extraParticipants.length + 1)) +
    dinnerPrice + masterclassPrice;

  return {
    reference: reference,
    conference: conference.title,
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
    dinnerPrice: dinnerPrice,
    masterclassPrice: masterclassPrice,
    total: total,
  };
};

const parseExtraParticipants = (
  extraParticipants: never[],
): ParticipantType[] => {
  if (!extraParticipants || Array.isArray(extraParticipants) === false) {
    return [];
  }
  for (let i = 0; i < extraParticipants.length; i++) {
    if (
      typeof extraParticipants[i] !== "object" ||
      !("name" in extraParticipants[i]) || !("email" in extraParticipants[i]) ||
      !("position" in extraParticipants[i])
    ) {
      return [];
    }
  }
  return extraParticipants as ParticipantType[];
};

const parseDinnerParticipants = (
  dinnerParticipants: never[],
): DinnerParticipantType[] => {
  if (!dinnerParticipants || Array.isArray(dinnerParticipants) === false) {
    return [];
  }
  for (let i = 0; i < dinnerParticipants.length; i++) {
    if (
      typeof dinnerParticipants[i] !== "object" ||
      !("name" in dinnerParticipants[i]) || !("diet" in dinnerParticipants[i])
    ) {
      return [];
    }
  }
  return dinnerParticipants as DinnerParticipantType[];
};

const parseReference = (events: string[]): string => {
  const date = new Date();
  const eventCode = events[0].split(" ").map((word) => word[0]).join("");

  const seconds = date.getSeconds();
  const minutes = date.getMinutes();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${eventCode}-${day}/${month}/${year}-${minutes}${seconds}`;
};
