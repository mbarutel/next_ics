"use client";

import { IoAlertCircleOutline } from "react-icons/io5";

type SubmissionType = {
  reference: string;
};

export default function SharedReference<T extends SubmissionType>({
  submission,
  setSubmission,
  error,
}: {
  submission: T;
  setSubmission: React.Dispatch<React.SetStateAction<T>>;
  error?: string;
}) {
  const options = [
    "Manager, Family, Friend or Colleague",
    "Email Newsletter",
    "Social Media",
    "Our Website",
    "Other",
  ];

  const handleChange = (value: string) => {
    setSubmission((prev) => ({
      ...prev,
      reference: value,
    }));
  };

  return (
    <div id="reference" className="w-full form_section_wrapper">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-yellow-400 mb-2">
          How Did You Hear About Us?
        </h2>
        <p className="text-sm text-gray-400">
          Help us understand how you discovered this conference
        </p>
        {error && (
          <p className="text-red-500 text-sm font-medium mt-2 flex items-center gap-1">
            <IoAlertCircleOutline className="w-4 h-4" />
            {error}
          </p>
        )}
      </div>
      <select
        name="reference"
        value={submission.reference}
        onChange={(e) => handleChange(e.target.value)}
        className={`w-full bg-transparent border-b p-2 text-white focus:outline-none transition-colors ${
          error
            ? "border-red-500 focus:border-red-500"
            : "border-white focus:border-yellow-400"
        }`}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
