const factors = {
  squareMeter: 1,
  squareKilometer: 1000000,
  squareCentimeter: 0.0001,
  squareMillimeter: 0.000001,
  hectare: 10000,
  acre: 4046.86,
  squareMile: 2589988.11,
  squareYard: 0.836127,
  squareFoot: 0.092903,
  squareInch: 0.00064516
};

export default function convertArea(value, fromUnit, toUnit) {
  const sqMeters = value * factors[fromUnit];
  return sqMeters / factors[toUnit];
}
