export default function calculatePercentage(type, a, b) {
  const first = Number(a);
  const second = Number(b);
  if (!Number.isFinite(first) || !Number.isFinite(second)) throw new Error("Enter both numeric values.");

  switch (type) {
    case "of":
      return { result: (first * second) / 100, expression: `${first}% of ${second}` };
    case "isWhat":
      if (second === 0) throw new Error("The second value cannot be zero.");
      return { result: (first / second) * 100, expression: `${first} is what % of ${second}` };
    case "increase":
      return { original: first, percentage: second, change: first * (second / 100), result: first * (1 + second / 100) };
    case "decrease":
      return { original: first, percentage: second, change: first * (second / 100), result: first * (1 - second / 100) };
    case "difference": {
      const difference = Math.abs(first - second);
      const average = (first + second) / 2;
      return { difference, percent: average === 0 ? 0 : (difference / Math.abs(average)) * 100 };
    }
    case "change": {
      if (first === 0) throw new Error("The starting value cannot be zero.");
      const change = second - first;
      return { change, percentChange: (change / Math.abs(first)) * 100 };
    }
    case "part": {
      if (second === 0) throw new Error("The total cannot be zero.");
      return { part: first, total: second, percent: (first / second) * 100 };
    }
    default:
      throw new Error(`Unknown percentage calculation: ${type}`);
  }
}
