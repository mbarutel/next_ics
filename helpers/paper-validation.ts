import { PaperFormikValuesType } from "@/lib/form-paper";

export type PaperValidationErrors = {
  events?: string;
  name?: string;
  jobTitle?: string;
  organisation?: string;
  address?: string;
  phone?: string;
  email?: string;
  paperTitle?: string;
  biography?: string;
  paperDescription?: string;
  accomodation?: string;
  masterclass?: string;
  referral?: string;
  agreement?: string;
};

/**
 * Validates email format
 */
export function validateEmail(email: string): string | undefined {
  if (!email) {
    return "Email is required";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "Please enter a valid email address";
  }

  return undefined;
}

/**
 * Validates phone number
 */
export function validatePhone(phone: string): string | undefined {
  if (!phone) {
    return "Phone number is required";
  }

  // Basic phone validation - at least 10 digits
  const digitsOnly = phone.replace(/\D/g, "");
  if (digitsOnly.length < 10) {
    return "Please enter a valid phone number (at least 10 digits)";
  }

  return undefined;
}

/**
 * Validates required text field
 */
export function validateRequired(value: string, fieldName: string): string | undefined {
  if (!value || !value.trim()) {
    return `${fieldName} is required`;
  }
  return undefined;
}

/**
 * Validates text length
 */
export function validateLength(
  value: string,
  fieldName: string,
  minLength: number,
  maxLength?: number
): string | undefined {
  if (!value) {
    return undefined; // Let required validation handle this
  }

  if (value.length < minLength) {
    return `${fieldName} must be at least ${minLength} characters`;
  }

  if (maxLength && value.length > maxLength) {
    return `${fieldName} must not exceed ${maxLength} characters`;
  }

  return undefined;
}

/**
 * Validates the entire paper submission
 */
export function validatePaperSubmission(
  values: PaperFormikValuesType
): PaperValidationErrors {
  const errors: PaperValidationErrors = {};

  // Conference selection
  if (!values.events || !values.events.trim()) {
    errors.events = "Please select a conference";
  }

  // Speaker information
  const nameError = validateRequired(values.name, "Name");
  if (nameError) errors.name = nameError;

  const jobTitleError = validateRequired(values.jobTitle, "Job Title");
  if (jobTitleError) errors.jobTitle = jobTitleError;

  const organisationError = validateRequired(values.organisation, "Organisation");
  if (organisationError) errors.organisation = organisationError;

  const addressError = validateRequired(values.address, "Address");
  if (addressError) errors.address = addressError;

  const phoneError = validatePhone(values.phone);
  if (phoneError) errors.phone = phoneError;

  const emailError = validateEmail(values.email);
  if (emailError) errors.email = emailError;

  // Paper information
  const paperTitleError = validateRequired(values.paperTitle, "Paper Title");
  if (paperTitleError) errors.paperTitle = paperTitleError;

  const biographyError = validateRequired(values.biography, "Biography");
  if (biographyError) errors.biography = biographyError;
  else {
    const bioLengthError = validateLength(values.biography, "Biography", 50, 500);
    if (bioLengthError) errors.biography = bioLengthError;
  }

  const paperDescError = validateRequired(values.paperDescription, "Paper Description");
  if (paperDescError) errors.paperDescription = paperDescError;
  else {
    const descLengthError = validateLength(
      values.paperDescription,
      "Paper Description",
      100,
      2000
    );
    if (descLengthError) errors.paperDescription = descLengthError;
  }

  // Referral
  const referralError = validateRequired(values.referral, "Referral");
  if (referralError) errors.referral = referralError;

  // Agreement
  if (values.agreement !== "true") {
    errors.agreement = "You must agree to the guidelines to submit";
  }

  return errors;
}

/**
 * Checks if there are any validation errors
 */
export function hasPaperValidationErrors(errors: PaperValidationErrors): boolean {
  return Object.keys(errors).length > 0;
}

/**
 * Gets the first error field for scroll-to-error functionality
 */
export function getFirstPaperErrorField(errors: PaperValidationErrors): string | null {
  const errorFields = Object.keys(errors);
  if (errorFields.length === 0) return null;

  // Priority order for scrolling (top to bottom of form)
  const fieldOrder = [
    "events",
    "name",
    "jobTitle",
    "organisation",
    "address",
    "phone",
    "email",
    "paperTitle",
    "biography",
    "paperDescription",
    "accomodation",
    "masterclass",
    "referral",
    "agreement",
  ];

  for (const field of fieldOrder) {
    if (errorFields.includes(field)) {
      return field;
    }
  }

  return errorFields[0];
}
