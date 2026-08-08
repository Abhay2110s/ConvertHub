export default function calculateProfitLoss(costPrice, sellingPrice) {
  const cost = Number(costPrice);
  const selling = Number(sellingPrice);
  const difference = selling - cost;
  const percent = cost === 0 ? 0 : Math.abs(difference / cost) * 100;

  return {
    profit: Math.max(difference, 0),
    loss: Math.max(-difference, 0),
    difference: Math.abs(difference),
    percentage: percent,
    status: difference > 0 ? "Profit" : difference < 0 ? "Loss" : "No Profit / No Loss"
  };
}
