export default function calculateEMI(principal, annualRate, tenureMonths) {
  if (!Number.isFinite(principal) || !Number.isFinite(annualRate) || !Number.isFinite(tenureMonths) || tenureMonths <= 0) {
    throw new Error("Enter a valid principal, rate and tenure.");
  }
  const monthlyRate = annualRate / 12 / 100;
  // 0% interest means equal principal-only installments; the standard
  // formula divides by zero in this case.
  const emi = monthlyRate === 0
    ? principal / tenureMonths
    : (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) / (Math.pow(1 + monthlyRate, tenureMonths) - 1);
  return {
    emi: Math.round(emi * 100) / 100,
    totalAmount: Math.round(emi * tenureMonths * 100) / 100,
    totalInterest: Math.round((emi * tenureMonths - principal) * 100) / 100
  };
}
