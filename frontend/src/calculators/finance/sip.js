export default function calculateSIP(monthlyInvestment, expectedReturn, timePeriod) {
  const monthlyRate = expectedReturn / 12 / 100;
  const months = timePeriod * 12;
  const futureValue = monthlyInvestment * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
  const investedAmount = monthlyInvestment * months;
  return {
    futureValue: Math.round(futureValue * 100) / 100,
    investedAmount: Math.round(investedAmount * 100) / 100,
    estimatedReturns: Math.round((futureValue - investedAmount) * 100) / 100
  };
}
