export default function calculateLoan(principal, annualRate, tenureYears) {
  if (!Number.isFinite(principal) || !Number.isFinite(annualRate) || !Number.isFinite(tenureYears) || tenureYears <= 0) {
    throw new Error("Enter a valid principal, rate and tenure.");
  }
  const monthlyRate = annualRate / 12 / 100;
  const tenureMonths = tenureYears * 12;
  const emi = monthlyRate === 0
    ? principal / tenureMonths
    : (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) / (Math.pow(1 + monthlyRate, tenureMonths) - 1);
  return {
    monthlyPayment: Math.round(emi * 100) / 100,
    totalPayment: Math.round(emi * tenureMonths * 100) / 100,
    totalInterest: Math.round((emi * tenureMonths - principal) * 100) / 100
  };
}
