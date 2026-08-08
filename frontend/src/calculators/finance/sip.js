export default function calculateSIP(monthlyInvestment, expectedReturn, timePeriod) {
  if (!Number.isFinite(monthlyInvestment) || !Number.isFinite(expectedReturn) || !Number.isFinite(timePeriod) || timePeriod <= 0) {
    throw new Error("Enter a valid monthly investment, rate and time period.");
  }
  const monthlyRate = expectedReturn / 12 / 100;
  const months = timePeriod * 12;
  const futureValue = monthlyRate === 0
    ? monthlyInvestment * months
    : monthlyInvestment * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
  const investedAmount = monthlyInvestment * months;
  return {
    futureValue: Math.round(futureValue * 100) / 100,
    investedAmount: Math.round(investedAmount * 100) / 100,
    estimatedReturns: Math.round((futureValue - investedAmount) * 100) / 100
  };
}
