export default function calculateLoan(principal, annualRate, tenureYears) {
  const monthlyRate = annualRate / 12 / 100;
  const tenureMonths = tenureYears * 12;
  const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) / (Math.pow(1 + monthlyRate, tenureMonths) - 1);
  return {
    monthlyPayment: Math.round(emi * 100) / 100,
    totalPayment: Math.round(emi * tenureMonths * 100) / 100,
    totalInterest: Math.round((emi * tenureMonths - principal) * 100) / 100
  };
}
