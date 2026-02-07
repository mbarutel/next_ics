import { DelegateType, SpeakerParticipantType, PaperSubmissionType, ExhibitorType, ExhibitorSubmissionType, SponsorRepresentativeType, SponsorSubmissionType } from "@/lib/types";

export type ValidationErrors = {
  conferenceTitle?: string;
  selectedPriceTier?: string;
  delegates?: {
    [delegateIndex: number]: {
      firstName?: string;
      lastName?: string;
      jobTitle?: string;
      organization?: string;
      email?: string;
      phone?: string;
    };
  };
  reference?: string;
};

export type PaperValidationErrors = {
  conferenceTitle?: string;
  paperTitle?: string;
  paperDescription?: string;
  speakers?: {
    [speakerIndex: number]: {
      firstName?: string;
      lastName?: string;
      jobTitle?: string;
      organization?: string;
      email?: string;
      phone?: string;
      biography?: string;
    };
  };
  reference?: string;
};

export type ExhibitorValidationErrors = {
  conferenceTitle?: string;
  organizationName?: string;
  organizationStreetAddress?: string;
  organizationCity?: string;
  organizationStateProvince?: string;
  organizationPostalCode?: string;
  organizationCountry?: string;
  productServicesDescription?: string;
  exhibitors?: {
    [exhibitorIndex: number]: {
      firstName?: string;
      lastName?: string;
      jobTitle?: string;
      email?: string;
      phone?: string;
    };
  };
  reference?: string;
};

export type SponsorValidationErrors = {
  conferenceTitle?: string;
  organizationName?: string;
  organizationStreetAddress?: string;
  organizationCity?: string;
  organizationStateProvince?: string;
  organizationPostalCode?: string;
  organizationCountry?: string;
  selectedPackage?: string;
  sponsors?: {
    [sponsorIndex: number]: {
      firstName?: string;
      lastName?: string;
      jobTitle?: string;
      email?: string;
      phone?: string;
    };
  };
  reference?: string;
};

/**
 * Validates email format
 */
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validates phone format (basic validation - checks for at least 10 digits)
 */
function isValidPhone(phone: string): boolean {
  const digitsOnly = phone.replace(/\D/g, "");
  return digitsOnly.length >= 10;
}

/**
 * Validates a single delegate's information
 */
export function validateDelegate(delegate: DelegateType): {
  firstName?: string;
  lastName?: string;
  jobTitle?: string;
  organization?: string;
  email?: string;
  phone?: string;
} {
  const errors: {
    firstName?: string;
    lastName?: string;
    jobTitle?: string;
    organization?: string;
    email?: string;
    phone?: string;
  } = {};

  // First Name validation
  if (!delegate.firstName.trim()) {
    errors.firstName = "First name is required";
  } else if (delegate.firstName.trim().length < 2) {
    errors.firstName = "First name must be at least 2 characters";
  }

  // Last Name validation
  if (!delegate.lastName.trim()) {
    errors.lastName = "Last name is required";
  } else if (delegate.lastName.trim().length < 2) {
    errors.lastName = "Last name must be at least 2 characters";
  }

  // Job Title validation
  if (!delegate.jobTitle.trim()) {
    errors.jobTitle = "Job title is required";
  }

  // Organization validation
  if (!delegate.organization.trim()) {
    errors.organization = "Organization is required";
  }

  // Email validation
  if (!delegate.email.trim()) {
    errors.email = "Email is required";
  } else if (!isValidEmail(delegate.email)) {
    errors.email = "Please enter a valid email address";
  }

  // Phone validation
  if (!delegate.phone.trim()) {
    errors.phone = "Phone number is required";
  } else if (!isValidPhone(delegate.phone)) {
    errors.phone = "Please enter a valid phone number (at least 10 digits)";
  }

  return errors;
}

/**
 * Validates delegates array
 */
export function validateDelegates(delegates: DelegateType[]): ValidationErrors["delegates"] {
  const delegateErrors: ValidationErrors["delegates"] = {};

  delegates.forEach((delegate, index) => {
    const delegateValidationErrors = validateDelegate(delegate);
    if (Object.keys(delegateValidationErrors).length > 0) {
      delegateErrors[index] = delegateValidationErrors;
    }
  });

  return Object.keys(delegateErrors).length > 0 ? delegateErrors : undefined;
}

/**
 * Checks if there are any validation errors
 */
export function hasValidationErrors(errors: ValidationErrors): boolean {
  if (errors.conferenceTitle || errors.selectedPriceTier || errors.reference) {
    return true;
  }

  if (errors.delegates && Object.keys(errors.delegates).length > 0) {
    return true;
  }

  return false;
}

/**
 * Gets the first error field identifier for scrolling
 * Returns a string in the format "section" or "delegate-{index}-{field}"
 */
export function getFirstErrorField(errors: ValidationErrors): string | null {
  // Check conference title
  if (errors.conferenceTitle) {
    return "conference-selection";
  }

  // Check price tier
  if (errors.selectedPriceTier) {
    return "price-selection";
  }

  // Check delegates
  if (errors.delegates) {
    const delegateIndices = Object.keys(errors.delegates)
      .map(Number)
      .sort((a, b) => a - b);

    if (delegateIndices.length > 0) {
      const firstDelegateIndex = delegateIndices[0];
      const firstDelegateErrors = errors.delegates[firstDelegateIndex];
      const firstField = Object.keys(firstDelegateErrors)[0];
      return `delegate-${firstDelegateIndex}-${firstField}`;
    }
  }

  // Check reference
  if (errors.reference) {
    return "reference";
  }

  return null;
}

/**
 * Validates a single speaker's information
 */
function validateSpeaker(speaker: SpeakerParticipantType): {
  firstName?: string;
  lastName?: string;
  jobTitle?: string;
  organization?: string;
  email?: string;
  phone?: string;
  biography?: string;
} {
  const errors: {
    firstName?: string;
    lastName?: string;
    jobTitle?: string;
    organization?: string;
    email?: string;
    phone?: string;
    biography?: string;
  } = {};

  // First Name validation
  if (!speaker.firstName.trim()) {
    errors.firstName = "First name is required";
  } else if (speaker.firstName.trim().length < 2) {
    errors.firstName = "First name must be at least 2 characters";
  }

  // Last Name validation
  if (!speaker.lastName.trim()) {
    errors.lastName = "Last name is required";
  } else if (speaker.lastName.trim().length < 2) {
    errors.lastName = "Last name must be at least 2 characters";
  }

  // Job Title validation
  if (!speaker.jobTitle.trim()) {
    errors.jobTitle = "Job title is required";
  }

  // Organization validation
  if (!speaker.organization.trim()) {
    errors.organization = "Organization is required";
  }

  // Email validation
  if (!speaker.email.trim()) {
    errors.email = "Email is required";
  } else if (!isValidEmail(speaker.email)) {
    errors.email = "Please enter a valid email address";
  }

  // Phone validation
  if (!speaker.phone.trim()) {
    errors.phone = "Phone number is required";
  } else if (!isValidPhone(speaker.phone)) {
    errors.phone = "Please enter a valid phone number (at least 10 digits)";
  }

  // Biography validation
  if (!speaker.biography.trim()) {
    errors.biography = "Biography is required";
  } else if (speaker.biography.trim().length < 50) {
    errors.biography = "Biography must be at least 50 characters";
  }

  return errors;
}

/**
 * Validates the paper submission form
 */
export function validatePaperSubmission(
  submission: PaperSubmissionType
): PaperValidationErrors {
  const errors: PaperValidationErrors = {};

  // Validate conference selection
  if (!submission.conferenceTitle) {
    errors.conferenceTitle = "Please select a conference";
  }

  // Validate paper title
  if (!submission.paperTitle.trim()) {
    errors.paperTitle = "Paper title is required";
  } else if (submission.paperTitle.trim().length < 10) {
    errors.paperTitle = "Paper title must be at least 10 characters";
  }

  // Validate paper description
  if (!submission.paperDescription.trim()) {
    errors.paperDescription = "Paper description is required";
  } else if (submission.paperDescription.trim().length < 100) {
    errors.paperDescription = "Paper description must be at least 100 characters";
  }

  // Validate speakers
  const speakerErrors: PaperValidationErrors["speakers"] = {};
  submission.speakers.forEach((speaker, index) => {
    const speakerValidationErrors = validateSpeaker(speaker);
    if (Object.keys(speakerValidationErrors).length > 0) {
      speakerErrors[index] = speakerValidationErrors;
    }
  });

  if (Object.keys(speakerErrors).length > 0) {
    errors.speakers = speakerErrors;
  }

  // Validate reference
  if (!submission.reference.trim()) {
    errors.reference = "Please provide a reference";
  }

  return errors;
}

/**
 * Checks if there are any paper validation errors
 */
export function hasPaperValidationErrors(errors: PaperValidationErrors): boolean {
  if (errors.conferenceTitle || errors.paperTitle || errors.paperDescription || errors.reference) {
    return true;
  }

  if (errors.speakers && Object.keys(errors.speakers).length > 0) {
    return true;
  }

  return false;
}

/**
 * Gets the first error field identifier for scrolling (paper submission)
 * Returns a string in the format "section" or "speaker-{index}-{field}"
 */
export function getFirstPaperErrorField(errors: PaperValidationErrors): string | null {
  // Check conference title
  if (errors.conferenceTitle) {
    return "conference-selection";
  }

  // Check paper title
  if (errors.paperTitle) {
    return "paper-title";
  }

  // Check paper description
  if (errors.paperDescription) {
    return "paper-description";
  }

  // Check speakers
  if (errors.speakers) {
    const speakerIndices = Object.keys(errors.speakers)
      .map(Number)
      .sort((a, b) => a - b);

    if (speakerIndices.length > 0) {
      const firstSpeakerIndex = speakerIndices[0];
      const firstSpeakerErrors = errors.speakers[firstSpeakerIndex];
      const firstField = Object.keys(firstSpeakerErrors)[0];
      return `speaker-${firstSpeakerIndex}-${firstField}`;
    }
  }

  // Check reference
  if (errors.reference) {
    return "reference";
  }

  return null;
}

/**
 * Validates a single exhibitor
 */
export function validateExhibitor(
  exhibitor: ExhibitorType,
  index: number
): { [key: string]: string } {
  const errors: {
    firstName?: string;
    lastName?: string;
    jobTitle?: string;
    email?: string;
    phone?: string;
  } = {};

  // Validate first name
  if (!exhibitor.firstName.trim()) {
    errors.firstName = "First name is required";
  }

  // Validate last name
  if (!exhibitor.lastName.trim()) {
    errors.lastName = "Last name is required";
  }

  // Validate job title
  if (!exhibitor.jobTitle.trim()) {
    errors.jobTitle = "Job title is required";
  }

  // Validate email
  if (!exhibitor.email.trim()) {
    errors.email = "Email is required";
  } else if (!isValidEmail(exhibitor.email)) {
    errors.email = "Invalid email format";
  }

  // Validate phone
  if (!exhibitor.phone.trim()) {
    errors.phone = "Phone number is required";
  } else if (!isValidPhone(exhibitor.phone)) {
    errors.phone = "Invalid phone number";
  }

  return errors;
}

/**
 * Validates all exhibitors
 */
export function validateExhibitors(
  exhibitors: ExhibitorType[]
): { [index: number]: { [key: string]: string } } {
  const exhibitorErrors: { [index: number]: { [key: string]: string } } = {};

  exhibitors.forEach((exhibitor, index) => {
    const errors = validateExhibitor(exhibitor, index);
    if (Object.keys(errors).length > 0) {
      exhibitorErrors[index] = errors;
    }
  });

  return exhibitorErrors;
}

/**
 * Validates the complete exhibitor submission
 */
export function validateExhibitorSubmission(
  submission: ExhibitorSubmissionType
): ExhibitorValidationErrors {
  const errors: ExhibitorValidationErrors = {};

  // Validate conference selection
  if (!submission.conferenceTitle) {
    errors.conferenceTitle = "Please select a conference";
  }

  // Validate organization name
  if (!submission.organizationName.trim()) {
    errors.organizationName = "Organization name is required";
  }

  // Validate organization street address
  if (!submission.organizationStreetAddress.trim()) {
    errors.organizationStreetAddress = "Street address is required";
  }

  // Validate organization city
  if (!submission.organizationCity.trim()) {
    errors.organizationCity = "City is required";
  }

  // Validate organization state/province
  if (!submission.organizationStateProvince.trim()) {
    errors.organizationStateProvince = "State/Province is required";
  }

  // Validate organization postal code
  if (!submission.organizationPostalCode.trim()) {
    errors.organizationPostalCode = "Postal code is required";
  }

  // Validate organization country
  if (!submission.organizationCountry.trim()) {
    errors.organizationCountry = "Country is required";
  }

  // Validate product/services description
  if (!submission.productServicesDescription.trim()) {
    errors.productServicesDescription = "Product/services description is required";
  } else if (submission.productServicesDescription.trim().length < 50) {
    errors.productServicesDescription = "Description must be at least 50 characters";
  }

  // Validate exhibitors
  if (!submission.exhibitors || submission.exhibitors.length === 0) {
    errors.exhibitors = { 0: { firstName: "At least one exhibitor is required" } };
  } else {
    const exhibitorErrors = validateExhibitors(submission.exhibitors);
    if (Object.keys(exhibitorErrors).length > 0) {
      errors.exhibitors = exhibitorErrors;
    }
  }

  // Validate reference
  if (!submission.reference.trim()) {
    errors.reference = "Please provide a reference";
  }

  return errors;
}

/**
 * Checks if there are any exhibitor validation errors
 */
export function hasExhibitorValidationErrors(errors: ExhibitorValidationErrors): boolean {
  if (
    errors.conferenceTitle ||
    errors.organizationName ||
    errors.organizationStreetAddress ||
    errors.organizationCity ||
    errors.organizationStateProvince ||
    errors.organizationPostalCode ||
    errors.organizationCountry ||
    errors.productServicesDescription ||
    errors.reference
  ) {
    return true;
  }

  if (errors.exhibitors && Object.keys(errors.exhibitors).length > 0) {
    return true;
  }

  return false;
}

/**
 * Gets the first error field identifier for scrolling (exhibitor submission)
 * Returns a string in the format "section" or "exhibitor-{index}-{field}"
 */
export function getFirstExhibitorErrorField(errors: ExhibitorValidationErrors): string | null {
  // Check conference title
  if (errors.conferenceTitle) {
    return "conference-selection";
  }

  // Check organization fields
  if (errors.organizationName) {
    return "organization-name";
  }
  if (errors.organizationStreetAddress) {
    return "organization-street-address";
  }
  if (errors.organizationCity) {
    return "organization-city";
  }
  if (errors.organizationStateProvince) {
    return "organization-state-province";
  }
  if (errors.organizationPostalCode) {
    return "organization-postal-code";
  }
  if (errors.organizationCountry) {
    return "organization-country";
  }
  if (errors.productServicesDescription) {
    return "product-services-description";
  }

  // Check exhibitors
  if (errors.exhibitors) {
    const exhibitorIndices = Object.keys(errors.exhibitors)
      .map(Number)
      .sort((a, b) => a - b);

    if (exhibitorIndices.length > 0) {
      const firstExhibitorIndex = exhibitorIndices[0];
      const firstExhibitorErrors = errors.exhibitors[firstExhibitorIndex];
      const firstField = Object.keys(firstExhibitorErrors)[0];
      return `exhibitor-${firstExhibitorIndex}-${firstField}`;
    }
  }

  // Check reference
  if (errors.reference) {
    return "reference";
  }

  return null;
}

/**
 * Validates a single sponsor
 */
export function validateSponsor(
  sponsor: SponsorRepresentativeType,
  index: number
): { [key: string]: string } {
  const errors: {
    firstName?: string;
    lastName?: string;
    jobTitle?: string;
    email?: string;
    phone?: string;
  } = {};

  // Validate first name
  if (!sponsor.firstName.trim()) {
    errors.firstName = "First name is required";
  }

  // Validate last name
  if (!sponsor.lastName.trim()) {
    errors.lastName = "Last name is required";
  }

  // Validate job title
  if (!sponsor.jobTitle.trim()) {
    errors.jobTitle = "Job title is required";
  }

  // Validate email
  if (!sponsor.email.trim()) {
    errors.email = "Email is required";
  } else if (!isValidEmail(sponsor.email)) {
    errors.email = "Invalid email format";
  }

  // Validate phone
  if (!sponsor.phone.trim()) {
    errors.phone = "Phone number is required";
  } else if (!isValidPhone(sponsor.phone)) {
    errors.phone = "Invalid phone number";
  }

  return errors;
}

/**
 * Validates all sponsors
 */
export function validateSponsors(
  sponsors: SponsorRepresentativeType[]
): { [index: number]: { [key: string]: string } } {
  const sponsorErrors: { [index: number]: { [key: string]: string } } = {};

  sponsors.forEach((sponsor, index) => {
    const errors = validateSponsor(sponsor, index);
    if (Object.keys(errors).length > 0) {
      sponsorErrors[index] = errors;
    }
  });

  return sponsorErrors;
}

/**
 * Validates the complete sponsor submission
 */
export function validateSponsorSubmission(
  submission: SponsorSubmissionType
): SponsorValidationErrors {
  const errors: SponsorValidationErrors = {};

  // Validate conference selection
  if (!submission.conferenceTitle) {
    errors.conferenceTitle = "Please select a conference";
  }

  // Validate organization name
  if (!submission.organizationName.trim()) {
    errors.organizationName = "Organization name is required";
  }

  // Validate organization street address
  if (!submission.organizationStreetAddress.trim()) {
    errors.organizationStreetAddress = "Street address is required";
  }

  // Validate organization city
  if (!submission.organizationCity.trim()) {
    errors.organizationCity = "City is required";
  }

  // Validate organization state/province
  if (!submission.organizationStateProvince.trim()) {
    errors.organizationStateProvince = "State/Province is required";
  }

  // Validate organization postal code
  if (!submission.organizationPostalCode.trim()) {
    errors.organizationPostalCode = "Postal code is required";
  }

  // Validate organization country
  if (!submission.organizationCountry.trim()) {
    errors.organizationCountry = "Country is required";
  }

  // Validate sponsorship package selection
  if (!submission.selectedPackage) {
    errors.selectedPackage = "Please select a sponsorship package";
  }

  // Validate sponsors
  if (!submission.sponsors || submission.sponsors.length === 0) {
    errors.sponsors = { 0: { firstName: "At least one sponsor representative is required" } };
  } else {
    const sponsorErrors = validateSponsors(submission.sponsors);
    if (Object.keys(sponsorErrors).length > 0) {
      errors.sponsors = sponsorErrors;
    }
  }

  // Validate reference
  if (!submission.reference.trim()) {
    errors.reference = "Please provide a reference";
  }

  return errors;
}

/**
 * Checks if there are any sponsor validation errors
 */
export function hasSponsorValidationErrors(errors: SponsorValidationErrors): boolean {
  if (
    errors.conferenceTitle ||
    errors.organizationName ||
    errors.organizationStreetAddress ||
    errors.organizationCity ||
    errors.organizationStateProvince ||
    errors.organizationPostalCode ||
    errors.organizationCountry ||
    errors.selectedPackage ||
    errors.reference
  ) {
    return true;
  }

  if (errors.sponsors && Object.keys(errors.sponsors).length > 0) {
    return true;
  }

  return false;
}

/**
 * Gets the first error field identifier for scrolling (sponsor submission)
 * Returns a string in the format "section" or "sponsor-{index}-{field}"
 */
export function getFirstSponsorErrorField(errors: SponsorValidationErrors): string | null {
  // Check conference title
  if (errors.conferenceTitle) {
    return "conference-selection";
  }

  // Check organization fields
  if (errors.organizationName) {
    return "organization-name";
  }
  if (errors.organizationStreetAddress) {
    return "organization-street-address";
  }
  if (errors.organizationCity) {
    return "organization-city";
  }
  if (errors.organizationStateProvince) {
    return "organization-state-province";
  }
  if (errors.organizationPostalCode) {
    return "organization-postal-code";
  }
  if (errors.organizationCountry) {
    return "organization-country";
  }

  // Check package selection
  if (errors.selectedPackage) {
    return "package-selection";
  }

  // Check sponsors
  if (errors.sponsors) {
    const sponsorIndices = Object.keys(errors.sponsors)
      .map(Number)
      .sort((a, b) => a - b);

    if (sponsorIndices.length > 0) {
      const firstSponsorIndex = sponsorIndices[0];
      const firstSponsorErrors = errors.sponsors[firstSponsorIndex];
      const firstField = Object.keys(firstSponsorErrors)[0];
      return `sponsor-${firstSponsorIndex}-${firstField}`;
    }
  }

  // Check reference
  if (errors.reference) {
    return "reference";
  }

  return null;
}
