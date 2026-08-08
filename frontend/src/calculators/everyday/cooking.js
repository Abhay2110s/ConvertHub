const ML_PER_UNIT = {
  milliliter: 1,
  teaspoon: 4.92892,
  tablespoon: 14.7868,
  cup: 236.588,
  fluidOunce: 29.5735,
  pint: 473.176,
  quart: 946.353,
  liter: 1000,
  gallon: 3785.41
};

export default function convertCooking(amount, fromUnit, toUnit) {
  const value = Number(amount);
  if (!Number.isFinite(value) || value < 0) throw new Error("Enter a valid non-negative amount.");
  if (!ML_PER_UNIT[fromUnit] || !ML_PER_UNIT[toUnit]) throw new Error("Choose valid cooking units.");
  const milliliters = value * ML_PER_UNIT[fromUnit];
  return { result: milliliters / ML_PER_UNIT[toUnit], from: fromUnit, to: toUnit };
}
