const factors = {
  liter: 1,
  milliliter: 0.001,
  cubicMeter: 1000,
  cubicCentimeter: 0.001,
  cubicInch: 0.0163871,
  cubicFoot: 28.3168,
  gallon: 3.78541,
  quart: 0.946353,
  pint: 0.473176,
  cup: 0.24
};

export default function convertVolume(value, fromUnit, toUnit) {
  const liters = value * factors[fromUnit];
  return liters / factors[toUnit];
}
