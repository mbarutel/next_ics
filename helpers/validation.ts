import { DelegateType, SpeakerParticipantType, PaperSubmissionType } from "@/lib/types";

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
