const factors = {
  watt: 1,
  kilowatt: 1000,
  megawatt: 1000000,
  horsepower: 745.7,
  btuPerHour: 0.293071,
  caloriePerSecond: 4.184
};

export default function convertPower(value, fromUnit, toUnit) {
  const watts = value * factors[fromUnit];
  return watts / factors[toUnit];
}
