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
  const base = "font-sans font-bold rounded-button inline-flex items-center justify-center gap-2.5 cursor-pointer";

  const variants = {
    primary: "mag-btn bg-charcoal text-white shadow-cta",
    secondary: "bg-ivory text-charcoal-light hover:bg-[#E8DFD0] active:scale-[0.97] transition-all duration-200",
    outline: "bg-transparent border-2 border-gold text-gold hover:bg-gold hover:text-white active:scale-[0.97] transition-all duration-200",
  };

  const sizes = {
    sm: "px-5 py-2.5 text-[13px]",
    md: "px-7 py-3.5 text-[14px]",
    lg: "px-8 py-4 text-[15px] tracking-wide",
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
