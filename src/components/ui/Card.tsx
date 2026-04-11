import { type HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "highlighted" | "ivory";
}

export function Card({
  variant = "default",
  className = "",
  children,
  ...props
}: CardProps) {
  const variants = {
    default: "bg-white border border-ivory shadow-card",
    highlighted: "bg-white border-2 border-gold shadow-card",
    ivory: "bg-ivory border border-ivory",
  };

  return (
    <div
      className={`rounded-card p-5 md:p-6 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
