export default function calculateSimpleInterest(principal, annualRate, timeYears) {
  const interest = principal * (annualRate / 100) * timeYears;
  return {
    principal,
    interest: Math.round(interest * 100) / 100,
    totalAmount: Math.round((principal + interest) * 100) / 100
  };
}
