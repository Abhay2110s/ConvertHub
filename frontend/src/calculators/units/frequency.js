const factors = {
  hertz: 1,
  kilohertz: 1000,
  megahertz: 1000000,
  gigahertz: 1000000000
};

export default function convertFrequency(value, fromUnit, toUnit) {
  const hz = value * factors[fromUnit];
  return hz / factors[toUnit];
}
