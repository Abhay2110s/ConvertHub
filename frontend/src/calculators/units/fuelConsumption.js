// milesPerGallon and kmPerLiter are both "distance per volume" (linear
// against a common factor), while litersPer100km is "volume per distance"
// (inversely related to the other two). Mixing them through a single
// linear factor table silently produced wrong numbers for any pair that
// wasn't explicitly special-cased, so every combination is handled here.
const LINEAR_TO_KM_PER_LITER = {
  kmPerLiter: 1,
  milesPerGallon: 0.425144
};

export default function convertFuelConsumption(value, fromUnit, toUnit) {
  if (!Number.isFinite(value)) throw new Error("Enter a valid number.");
  if (fromUnit === toUnit) return value;

  // Normalize to km/L first, going through the inverse relationship
  // whenever litersPer100km is involved.
  let kmPerLiter;
  if (fromUnit === "litersPer100km") {
    if (value === 0) throw new Error("Value cannot be zero for L/100km.");
    kmPerLiter = 100 / value;
  } else {
    kmPerLiter = value * LINEAR_TO_KM_PER_LITER[fromUnit];
  }

  if (toUnit === "litersPer100km") {
    if (kmPerLiter === 0) throw new Error("Result is undefined (division by zero).");
    return 100 / kmPerLiter;
  }
  return kmPerLiter / LINEAR_TO_KM_PER_LITER[toUnit];
}
