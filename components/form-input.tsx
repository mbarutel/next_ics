import React from "react";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  className?: string;
}

export default function FormInput({
  error,
  className = "",
  ...props
}: FormInputProps) {
  return (
    <input
      className={`form-input ${error ? "border-red-500" : ""} ${className}`.trim()}
      {...props}
    />
  );
}
