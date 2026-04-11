import { type ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
}

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const base =
    "font-sans font-bold rounded-button transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]";

  const variants = {
    primary: "bg-gold text-white shadow-cta hover:bg-gold-dark",
    secondary: "bg-ivory text-muted hover:bg-cream",
    outline:
      "bg-transparent border-2 border-gold text-gold hover:bg-gold hover:text-white",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-[15px]",
    lg: "px-8 py-4 text-base",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
