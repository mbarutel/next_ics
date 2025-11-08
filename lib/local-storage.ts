import { FormValuesType } from "./types";

const DEFAULT_STORAGE_KEY = "registration_form_data";

/**
 * Save form data to localStorage
 */
export function saveFormData(
  data: FormValuesType,
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

/**
 * Load form data from localStorage
 */
export function loadFormData(
  key: string = DEFAULT_STORAGE_KEY
): FormValuesType | null {
  try {
    const serializedData = localStorage.getItem(key);
    if (serializedData === null) {
      return null;
    }
    const data = JSON.parse(serializedData);
    console.log("Form data loaded from localStorage");
    return data;
  } catch (error) {
    console.error("Error loading from localStorage:", error);
    return null;
  }
}

/**
 * Clear form data from localStorage
 */
export function clearFormData(key: string = DEFAULT_STORAGE_KEY): void {
  try {
    localStorage.removeItem(key);
    console.log("Form data cleared from localStorage");
  } catch (error) {
    console.error("Error clearing localStorage:", error);
  }
}

/**
 * Check if form data exists in localStorage
 */
export function hasFormData(key: string = DEFAULT_STORAGE_KEY): boolean {
  try {
    return localStorage.getItem(key) !== null;
  } catch (error) {
    console.error("Error checking localStorage:", error);
    return false;
  }
}
