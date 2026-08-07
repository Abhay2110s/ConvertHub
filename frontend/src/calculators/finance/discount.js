export default function calculateDiscount(originalPrice, discountPercentage) {
  const discountAmount = originalPrice * (discountPercentage / 100);
  return {
    discountAmount,
    finalPrice: originalPrice - discountAmount,
    savings: discountAmount
  };
}
