const factors = {
  joule: 1,
  kilojoule: 1000,
  calorie: 4.184,
  kilocalorie: 4184,
  wattHour: 3600,
  kilowattHour: 3600000,
  electronVolt: 1.60218e-19,
  btu: 1055.06
};

export default function convertEnergy(value, fromUnit, toUnit) {
  const joules = value * factors[fromUnit];
  return joules / factors[toUnit];
}
