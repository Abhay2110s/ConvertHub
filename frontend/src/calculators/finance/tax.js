export default function calculateTax(amount, taxRate) {
  return {
    taxAmount: amount * (taxRate / 100),
    totalAmount: amount * (1 + taxRate / 100)
  };
}
