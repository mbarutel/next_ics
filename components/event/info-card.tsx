import React, { ReactNode } from "react";

type InfoCardProps = {
  icon?: string;
  title: string;
  children: ReactNode;
  variant?: "default" | "highlighted" | "subtle";
};

export default function InfoCard({
  icon,
  title,
  children,
  variant = "default",
}: InfoCardProps) {
  const variants = {
    default: "bg-stone-900/40",
    highlighted: "bg-stone-900/60",
    subtle: "bg-stone-900/20",
  };

  return (
    <div className={`rounded-lg p-6 ${variants[variant]} shadow-md hover:shadow-lg transition-shadow`}>
      <div className="flex items-center gap-3 mb-4">
        {icon && <span className="text-3xl">{icon}</span>}
        <h2 className="text-xl md:text-2xl font-bold uppercase tracking-wide text-yellow-400">
          {title}
        </h2>
      </div>
      <div className="prose prose-invert prose-yellow max-w-none">
        {children}
      </div>
    </div>
  );
}
