export function convert(value, fromUnit, toUnit, type) {
  const engines = {
    length: () => import("./units/length"),
    weight: () => import("./units/weight"),
    area: () => import("./units/area"),
    volume: () => import("./units/volume"),
    speed: () => import("./units/speed"),
    temperature: () => import("./units/temperature"),
    pressure: () => import("./units/pressure"),
    force: () => import("./units/force"),
    torque: () => import("./units/torque"),
    density: () => import("./units/density"),
    energy: () => import("./units/energy"),
    power: () => import("./units/power"),
    frequency: () => import("./units/frequency"),
    fuelConsumption: () => import("./units/fuelConsumption")
  };

  const engine = engines[type];
  if (!engine) throw new Error(`Unknown engine type: ${type}`);
  return engine().then((mod) => mod.default(value, fromUnit, toUnit));
}
