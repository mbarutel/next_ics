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

export const registrationObjectApiParser = (
  { values, conference }: {
    values: FormValuesType;
    conference: ConferenceType;
  },
): RegistrationType => {
  if (!conference.prices || !conference.date) {
    throw new Error("Error with conference properties");
  }

  const reference = generateReference(conference);
  const events = values.events.join("\n");
  const extraParticipants = parseExtraParticipants(values.extraParticipants)
    .map((item) => item.name.concat(` | ${item.email} | ${item.position}`))
    .join("\n");
  const dinnerParticipants = parseDinnerParticipants(values.dinnerParticipants)
    .map((item) => item.name.concat(` | ${item.diet}`)).join("\n");

  const dinnerPrice = values.dinnerParticipants.length *
    conference.prices?.dinner;
  const masterclassPrice = values.masterclass === "no"
    ? 0
    : conference.prices?.masterclass;
  const total =
    (values.price.priceChoice * (values.extraParticipants.length + 1)) +
    dinnerPrice + masterclassPrice;

  const dueDate = new Date().getTime() + (1000 * 60 * 60 * 24 * 7);

  return {
    reference: reference,
    conference: conference.title,
    events: events,
    address: values.address,
    company: values.company,
    discount: values.discount,
    referral: values.referral,
    priceValue: values.price.priceChoice,
    priceDueDate: new Date(dueDate),
    masterclass: values.masterclass,
    accomodation: values.accomodation,
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

const generateReference = (conference: ConferenceType): string => {
  if (!conference.date) {
    throw new Error("Date cannot be empty at this point.");
  }

  const currentDate = new Date();
  const day = currentDate.getDate();
  const minutes = currentDate.getMinutes();
  const seconds = currentDate.getSeconds().toString().slice(-1);

  return `${conference.invoiceRef}-${day}${minutes}${seconds}`;
};
