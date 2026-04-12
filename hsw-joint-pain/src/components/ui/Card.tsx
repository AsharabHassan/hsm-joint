import { type HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "highlighted" | "shimmer";
  hover?: boolean;
}

export function Card({
  variant = "default",
  hover = true,
  className = "",
  children,
  ...props
}: CardProps) {
  const base = "rounded-card bg-white border border-black/[0.04]";

  const variants = {
    default: "shadow-card",
    highlighted: "shadow-card border-2 border-gold",
    shimmer: "shadow-card card-shimmer overflow-hidden",
  };

  const hoverClass = hover ? "hover-lift" : "";

  return (
    <div
      className={`${base} ${variants[variant]} ${hoverClass} p-7 md:p-8 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
