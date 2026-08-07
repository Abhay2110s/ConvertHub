const factors = {
  meter: 1,
  kilometer: 1000,
  centimeter: 0.01,
  millimeter: 0.001,
  mile: 1609.344,
  yard: 0.9144,
  foot: 0.3048,
  inch: 0.0254,
  micrometer: 0.000001,
  nanometer: 0.000000001
};

export default function convertLength(value, fromUnit, toUnit) {
  const meters = value * factors[fromUnit];
  return meters / factors[toUnit];
}
