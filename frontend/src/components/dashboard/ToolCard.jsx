import React from "react";
import { Card } from "../ui/card";

export default function ToolCard({ tool, onClick }) {
  return (
    <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => onClick(tool)}>
      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold">{tool.name}</h3>
          <span className="text-xs text-slate-500">{tool.category}</span>
        </div>
        <p className="text-sm text-slate-600">{tool.description}</p>
      </div>
    </Card>
  );
}
