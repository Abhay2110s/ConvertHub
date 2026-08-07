const factors = {
  kgPerM3: 1,
  gPerCm3: 1000,
  lbPerFt3: 16.0185
};

export default function convertDensity(value, fromUnit, toUnit) {
  const kgm3 = value * factors[fromUnit];
  return kgm3 / factors[toUnit];
}
