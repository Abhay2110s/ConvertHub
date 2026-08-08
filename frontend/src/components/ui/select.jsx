import React from "react";

export function Select({ children, className = "", ...props }) {
  return (
    <select
      className={`h-12 w-full min-w-0 appearance-none border-[3px] border-black bg-[#FFF8EC] px-4 py-3 pr-10 text-sm font-black text-black outline-none transition hover:-translate-y-0.5 hover:bg-[#FDE047] focus:translate-y-[-1px] focus:bg-white focus:shadow-[4px_4px_0px_#8B5CF6] disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    >
      {children}
    </select>
  );
}
