const factors = {
  newtonMeter: 1,
  kilonewtonMeter: 1000,
  poundForceFoot: 1.35582,
  dyneCentimeter: 0.0000001
};

export default function convertTorque(value, fromUnit, toUnit) {
  const nm = value * factors[fromUnit];
  return nm / factors[toUnit];
}
