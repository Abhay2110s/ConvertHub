
import { Card } from "../ui/card";

export default function CategoryCard({ category, onClick }) {
  return (
    <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => onClick(category)}>
      <div className="p-6">
        <div className="text-3xl mb-3">{category.icon}</div>
        <h3 className="text-lg font-semibold mb-1">{category.name}</h3>
        <p className="text-sm text-slate-500">{category.count} tools</p>
      </div>
    </Card>
  );
}
