import React from "react";
import { Card } from "../ui/card";

export default function FormulaCard({ formula, example }) {
  return (
    <Card className="p-4">
      <div className="text-sm font-medium text-slate-700 mb-2">Formula</div>
      <div className="font-mono text-sm bg-slate-100 p-2 rounded mb-2">{formula}</div>
      {example && <div className="text-xs text-slate-500">Example: {example}</div>}
    </Card>
  );
}
