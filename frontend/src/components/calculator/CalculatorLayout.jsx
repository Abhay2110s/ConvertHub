import React from "react";
import { Card } from "../ui/card";

export default function CalculatorLayout({ title, description, children }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">{title}</h1>
            <p className="text-slate-600">{description}</p>
          </div>
          <Card className="p-6">
            {children}
          </Card>
        </div>
      </div>
    </div>
  );
}
