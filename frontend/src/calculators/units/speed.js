const factors = {
  meterPerSecond: 1,
  kilometerPerHour: 0.277778,
  milePerHour: 0.44704,
  footPerSecond: 0.3048,
  knot: 0.514444
};

export default function convertSpeed(value, fromUnit, toUnit) {
  const mps = value * factors[fromUnit];
  return mps / factors[toUnit];
}
