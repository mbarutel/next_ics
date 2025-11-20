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
    default: "bg-stone-900/40 border-yellow-400/10",
    highlighted: "bg-stone-900/60 border-yellow-400/30",
    subtle: "bg-stone-900/20 border-yellow-400/5",
  };

  return (
    <div className={`rounded-lg p-6 ${variants[variant]} shadow-lg hover:shadow-xl transition-all duration-200 border`}>
      <div className="mb-4 pb-3 border-b border-yellow-400/20">
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
