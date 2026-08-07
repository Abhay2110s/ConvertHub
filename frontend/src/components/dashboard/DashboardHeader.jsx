import React from "react";

export default function DashboardHeader({ title }) {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-lg bg-slate-900" />
          <span className="text-xl font-bold">ConvertHub</span>
        </a>
        <h1 className="text-lg font-semibold">{title}</h1>
      </div>
    </header>
  );
}
