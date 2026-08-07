const factors = {
  newton: 1,
  kilonewton: 1000,
  dyne: 0.00001,
  poundForce: 4.44822,
  kilogramForce: 9.80665
};

export default function convertForce(value, fromUnit, toUnit) {
  const newtons = value * factors[fromUnit];
  return newtons / factors[toUnit];
}
