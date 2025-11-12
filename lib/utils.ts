import {
  ConferenceType,
  DinnerParticipantType,
  FormValuesType,
  ParticipantType,
  RegistrationType,
} from "./types";
import { v4 as uuidv4 } from "uuid";

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

export const registrationObjectApiParser = ({
  values,
  conference,
}: {
  values: FormValuesType;
  conference: ConferenceType;
}): RegistrationType => {
  if (!conference.prices || !conference.date) {
    throw new Error("Error with conference properties");
  }

  const reference = generateReference(conference);
  const events = values.events.join("\n");

  // Check if using new delegates structure
  const useDelegates = values.delegates && values.delegates.length > 0;

  let extraParticipants: string;
  let dinnerParticipants: string;
  let dinnerPrice: number;
  let masterclassPrice: number;
  let total: number;
  let participantQty: number;

  if (useDelegates) {
    // New delegates-based calculation
    participantQty = values.delegates.length;

    // Format delegates information
    extraParticipants = values.delegates
      .map((delegate, index) =>
        `${index + 1}. ${delegate.firstName} ${delegate.lastName} | ${delegate.email} | ${delegate.jobTitle} at ${delegate.organization}`
      )
      .join("\n");

    // Format dinner participants from delegates
    const dinnerDelegates = values.delegates.filter(d => d.dinner);
    dinnerParticipants = dinnerDelegates
      .map((delegate) =>
        `${delegate.firstName} ${delegate.lastName} | ${delegate.diet}`
      )
      .join("\n");

    // Calculate prices based on delegates
    dinnerPrice = dinnerDelegates.length * conference.prices?.dinner;
    const masterclassDelegates = values.delegates.filter(d => d.masterclass !== null && d.masterclass !== "");
    masterclassPrice = masterclassDelegates.length * conference.prices?.masterclass;

    total = values.price.priceChoice * participantQty + dinnerPrice + masterclassPrice;
  } else {
    // Old structure calculation (backward compatibility)
    participantQty = values.extraParticipants.length + 1;

    extraParticipants = parseExtraParticipants(values.extraParticipants)
      .map((item) =>
        item.name
          .trim()
          .concat(` | ${item.email.trim()} | ${item.position.trim()}`),
      )
      .join("\n");

    dinnerParticipants = parseDinnerParticipants(values.dinnerParticipants)
      .map((item) => item.name.trim().concat(` | ${item.diet}`))
      .join("\n");

    dinnerPrice = values.dinnerParticipants.length * conference.prices?.dinner;
    masterclassPrice = values.masterclass === "no" ? 0 : conference.prices?.masterclass;
    total = values.price.priceChoice * participantQty + dinnerPrice + masterclassPrice;
  }

  const dueDate = new Date().getTime() + 1000 * 60 * 60 * 24 * 7;

  return {
    reference: reference,
    conference: conference.title,
    events: events,
    address: values.address?.trim() || "",
    company: values.company.trim(),
    discount: values.discount.trim(),
    referral: values.referral,
    priceValue: values.price.priceChoice,
    priceDueDate: new Date(dueDate),
    masterclass: useDelegates
      ? (values.delegates.find(d => d.masterclass)?.masterclass || "no")
      : values.masterclass,
    accomodation: useDelegates
      ? values.delegates.reduce((sum, d) => sum + d.accommodationNights, 0)
      : values.accomodation,
    mainParticipant: useDelegates
      ? {
          name: `${values.delegates[0].firstName} ${values.delegates[0].lastName}`,
          email: values.delegates[0].email.trim(),
          position: values.delegates[0].jobTitle.trim(),
          phone: values.delegates[0].phone.trim(),
        }
      : {
          name: values.name.trim(),
          email: values.email.trim(),
          position: values.position.trim(),
          phone: values.phone.trim(),
        },
    dinnerParticipants: dinnerParticipants,
    extraParticipants: extraParticipants,
    agreement: values.agreement,
    dinnerPrice: dinnerPrice,
    masterclassPrice: masterclassPrice,
    total: total,
    delegates: values.delegates || [],
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
      !("name" in extraParticipants[i]) ||
      !("email" in extraParticipants[i]) ||
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
      !("name" in dinnerParticipants[i]) ||
      !("diet" in dinnerParticipants[i])
    ) {
      return [];
    }
  }

  return dinnerParticipants as DinnerParticipantType[];
};
//
// const generateReference = (conference: ConferenceType): string => {
//   if (!conference.date) {
//     throw new Error("Date cannot be empty at this point.");
//   }
//
//   const currentDate = new Date();
//   const day = currentDate.getDate();
//   const minutes = currentDate.getMinutes();
//   const seconds = currentDate.getSeconds().toString().slice(-1);
//
//   return `${conference.invoiceRef}-${day}${minutes}${seconds}`;
// };

const generateReference = (conference: ConferenceType): string => {
  const uniquePart = uuidv4().slice(0, 6);
  return `${conference.invoiceRef}-${uniquePart}`.toUpperCase();
};
