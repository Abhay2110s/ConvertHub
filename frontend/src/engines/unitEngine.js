export function convert(value, fromUnit, toUnit, type) {
  const engines = {
    length: () => import("../calculators/units/length"),
    weight: () => import("../calculators/units/weight"),
    area: () => import("../calculators/units/area"),
    volume: () => import("../calculators/units/volume"),
    speed: () => import("../calculators/units/speed"),
    temperature: () => import("../calculators/units/temperature"),
    pressure: () => import("../calculators/units/pressure"),
    force: () => import("../calculators/units/force"),
    torque: () => import("../calculators/units/torque"),
    density: () => import("../calculators/units/density"),
    energy: () => import("../calculators/units/energy"),
    power: () => import("../calculators/units/power"),
    frequency: () => import("../calculators/units/frequency"),
    fuelConsumption: () => import("../calculators/units/fuelConsumption")
  };
  const engine = engines[type];
  if (!engine) throw new Error(`Unknown engine type: ${type}`);
  return engine().then((mod) => mod.default(value, fromUnit, toUnit));
}
