import { DelegateType, ConferenceType } from "@/lib/types";
import { PriceTier } from "./utils";

export type SubmissionType = {
  conferenceTitle?: string;
  selectedConference?: ConferenceType;
  selectedPriceTier?: PriceTier;
  delegates: DelegateType[];
  promoCode: string;
  reference: string;
};

const DEFAULT_STORAGE_KEY = "delegate_registration_form_data";

export function saveFormData<T>(
  data: T,
  key: string = DEFAULT_STORAGE_KEY
): void {
  try {
    const serializedData = JSON.stringify(data);
    localStorage.setItem(key, serializedData);
    console.log("Form data saved to localStorage");
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
}

export function loadFormData<T>(
  key: string = DEFAULT_STORAGE_KEY
): T | null {
  try {
    const serializedData = localStorage.getItem(key);
    if (serializedData === null) {
      return null;
    }
    const data = JSON.parse(serializedData);
    console.log("Form data loaded from localStorage");
    return data as T;
  } catch (error) {
    console.error("Error loading from localStorage:", error);
    return null;
  }
}

export function clearFormData(key: string = DEFAULT_STORAGE_KEY): void {
  try {
    localStorage.removeItem(key);
    console.log("Form data cleared from localStorage");
  } catch (error) {
    console.error("Error clearing localStorage:", error);
  }
}
