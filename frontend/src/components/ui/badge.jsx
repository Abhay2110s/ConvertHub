import React from "react";

export function Badge({ children, variant = "default", className = "", ...props }) {
  const variants = {
    default: "border-transparent bg-slate-900 text-white",
    secondary: "border-transparent bg-slate-100 text-slate-900",
    destructive: "border-transparent bg-red-500 text-white",
    outline: "text-slate-900",
    success: "border-transparent bg-green-500 text-white"
  };

  return (
    <div className={`inline-flex items-center rounded-full border border-slate-200 px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 ${variants[variant]} ${className}`} {...props}>
      {children}
    </div>
  );
}
