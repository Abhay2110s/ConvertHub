export default function calculateCompoundInterest(principal, rate, time, compoundFrequency = 1) {
  const amount = principal * Math.pow(1 + rate / 100 / compoundFrequency, compoundFrequency * time);
  return {
    totalAmount: Math.round(amount * 100) / 100,
    interestEarned: Math.round((amount - principal) * 100) / 100
  };
}
