export function calculate(type, inputs) {
  const engines = {
    bmi: () => import("../calculators/everyday/bmi"),
    calories: () => import("../calculators/everyday/calories"),
    cooking: () => import("../calculators/everyday/cooking"),
    clothingSize: () => import("../calculators/everyday/clothingSize"),
    shoeSize: () => import("../calculators/everyday/shoeSize")
  };

  const engine = engines[type];
  if (!engine) throw new Error(`Unknown everyday calculator: ${type}`);
  return engine().then((mod) => mod.default(...inputs));
}
