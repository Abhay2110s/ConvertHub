export default function convertCooking(amount, fromUnit, toUnit) {
  const factors = {
    cup: 1,
    tablespoon: 0.0625,
    teaspoon: 0.020833,
    milliliter: 0.00422675,
    gram: 0.00440925,
    ounce: 0.125,
    pound: 2
  };

  const cups = amount * factors[fromUnit];
  return cups / factors[toUnit];
}
