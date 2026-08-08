export function calculate(type, inputs) {
  const engines = {
    age: () => import("../calculators/datetime/age"),
    timezone: () => import("../calculators/datetime/timezone"),
    dateDifference: () => import("../calculators/datetime/dateDifference"),
    countdown: () => import("../calculators/datetime/countdown"),
    businessDays: () => import("../calculators/datetime/businessDays")
  };

  const engine = engines[type];
  if (!engine) throw new Error(`Unknown date calculator: ${type}`);
  return engine().then((mod) => mod.default(...inputs));
}
