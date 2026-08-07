const factors = {
  kilogram: 1,
  gram: 0.001,
  milligram: 0.000001,
  metricTon: 1000,
  pound: 0.453592,
  ounce: 0.0283495,
  carat: 0.0002,
  stone: 6.35029
};

export default function convertWeight(value, fromUnit, toUnit) {
  const kg = value * factors[fromUnit];
  return kg / factors[toUnit];
}
