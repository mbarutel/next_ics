import React from "react";

interface FieldGroupLabelProps {
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export default function FieldGroupLabel({
  icon,
  children,
  className = "",
}: FieldGroupLabelProps) {
  return (
    <div className={`field-group-label ${className}`.trim()}>
      {icon}
      {children}
    </div>
  );
}
