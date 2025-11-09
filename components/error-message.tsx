import React from "react";

interface ErrorMessageProps {
  children?: React.ReactNode;
  className?: string;
}

export default function ErrorMessage({
  children,
  className = "",
}: ErrorMessageProps) {
  if (!children) return null;

  return <p className={`form-error ${className}`.trim()}>{children}</p>;
}
