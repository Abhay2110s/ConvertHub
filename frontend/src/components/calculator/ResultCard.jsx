import React from "react";
import { Card } from "../ui/card";

export default function ResultCard({ title, value, unit }) {
  return (
    <Card className="p-4 bg-slate-50">
      <div className="text-sm text-slate-500 mb-1">{title}</div>
      <div className="text-2xl font-bold text-slate-900">
        {value} <span className="text-lg font-normal text-slate-600">{unit}</span>
      </div>
    </Card>
  );
}
