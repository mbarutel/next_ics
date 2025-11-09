import { PaperFormikValuesType } from "@/lib/form-paper";

const DEFAULT_STORAGE_KEY = "paper_submission_form_data";

export function savePaperFormData(
  data: PaperFormikValuesType,
  key: string = DEFAULT_STORAGE_KEY
): void {
  try {
    const serializedData = JSON.stringify(data);
    localStorage.setItem(key, serializedData);
    console.log("Paper form data saved to localStorage");
  } catch (error) {
    console.error("Error saving paper form to localStorage:", error);
  }
}

export function loadPaperFormData(
  key: string = DEFAULT_STORAGE_KEY
): PaperFormikValuesType | null {
  try {
    const serializedData = localStorage.getItem(key);
    if (serializedData === null) {
      return null;
    }
    const data = JSON.parse(serializedData);
    console.log("Paper form data loaded from localStorage");
    return data as PaperFormikValuesType;
  } catch (error) {
    console.error("Error loading paper form from localStorage:", error);
    return null;
  }
}

export function clearPaperFormData(key: string = DEFAULT_STORAGE_KEY): void {
  try {
    localStorage.removeItem(key);
    console.log("Paper form data cleared from localStorage");
  } catch (error) {
    console.error("Error clearing paper form from localStorage:", error);
  }
}
