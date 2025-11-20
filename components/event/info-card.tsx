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
    default: "bg-stone-900/20 border-stone-800/50",
    highlighted: "bg-stone-900/30 border-stone-700/50",
    subtle: "bg-stone-900/10 border-stone-800/30",
  };

  return (
    <div className={`rounded-sm p-8 ${variants[variant]} border`}>
      <div className="mb-6">
        <h2 className="text-lg md:text-xl font-semibold tracking-tight text-stone-100">
          {title}
        </h2>
      </div>
      <div className="prose prose-invert prose-stone max-w-none text-stone-300 text-sm leading-relaxed">
        {children}
      </div>
    </div>
  );
}
