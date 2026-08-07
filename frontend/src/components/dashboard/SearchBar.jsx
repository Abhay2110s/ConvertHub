import React from "react";
import { Input } from "../ui/input";

export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative">
      <Input
        type="text"
        placeholder="Search converters and calculators..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10"
      />
      <svg
        className="absolute left-3 top-3 h-4 w-4 text-slate-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </div>
  );
}
