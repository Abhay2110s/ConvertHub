const factors = {
  pascal: 1,
  kilopascal: 1000,
  bar: 100000,
  atm: 101325,
  psi: 6894.76,
  mmHg: 133.322,
  torr: 133.322
};

export default function convertPressure(value, fromUnit, toUnit) {
  const pascals = value * factors[fromUnit];
  return pascals / factors[toUnit];
}
