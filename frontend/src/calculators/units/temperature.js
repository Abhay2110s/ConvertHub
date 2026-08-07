export default function convertTemperature(value, fromUnit, toUnit) {
  if (fromUnit === toUnit) return value;

  let celsius;
  switch (fromUnit) {
    case "celsius":
      celsius = value;
      break;
    case "fahrenheit":
      celsius = (value - 32) * 5 / 9;
      break;
    case "kelvin":
      celsius = value - 273.15;
      break;
    default:
      throw new Error(`Unknown unit: ${fromUnit}`);
  }

  switch (toUnit) {
    case "celsius":
      return celsius;
    case "fahrenheit":
      return celsius * 9 / 5 + 32;
    case "kelvin":
      return celsius + 273.15;
    default:
      throw new Error(`Unknown unit: ${toUnit}`);
  }
}
