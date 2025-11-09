import React from "react";

interface FormLabelProps {
  htmlFor?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}

export default function FormLabel({
  htmlFor,
  required = false,
  children,
  className = "",
}: FormLabelProps) {
  return (
    <label htmlFor={htmlFor} className={`form-label ${className}`.trim()}>
      {children}
      {required && <span className="text-red-500"> *</span>}
    </label>
  );
}
