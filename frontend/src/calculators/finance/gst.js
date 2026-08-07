export default function calculateGST(amount, gstRate) {
  return {
    gstAmount: amount * (gstRate / 100),
    totalAmount: amount * (1 + gstRate / 100)
  };
}
