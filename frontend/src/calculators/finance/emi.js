export default function calculateEMI(principal, annualRate, tenureMonths) {
  const monthlyRate = annualRate / 12 / 100;
  const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) / (Math.pow(1 + monthlyRate, tenureMonths) - 1);
  return {
    emi: Math.round(emi * 100) / 100,
    totalAmount: Math.round(emi * tenureMonths * 100) / 100,
    totalInterest: Math.round((emi * tenureMonths - principal) * 100) / 100
  };
}
