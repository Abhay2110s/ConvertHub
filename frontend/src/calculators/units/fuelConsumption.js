const factors = {
  kmPerLiter: 1,
  milesPerGallon: 0.425144,
  litersPer100km: 100
};

export default function convertFuelConsumption(value, fromUnit, toUnit) {
  if (fromUnit === toUnit) return value;

  if (fromUnit === "litersPer100km" && toUnit === "kmPerLiter") {
    return 100 / value;
  }
  if (fromUnit === "kmPerLiter" && toUnit === "litersPer100km") {
    return 100 / value;
  }
  if (fromUnit === "milesPerGallon" && toUnit === "kmPerLiter") {
    return value * 0.425144;
  }
  if (fromUnit === "kmPerLiter" && toUnit === "milesPerGallon") {
    return value / 0.425144;
  }

  const base = value * factors[fromUnit];
  return base / factors[toUnit];
}
