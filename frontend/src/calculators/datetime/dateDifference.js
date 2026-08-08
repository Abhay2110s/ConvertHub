export default function calculateDateDifference(startDate, endDate) {
  const start = new Date(`${startDate}T00:00:00`);
  const end = new Date(`${endDate}T00:00:00`);

  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    throw new Error("Please provide valid dates.");
  }

  const direction = end >= start ? 1 : -1;
  const diffTime = Math.abs(end - start);
  const diffDays = Math.floor(diffTime / 86400000);

  return {
    days: diffDays * direction,
    absoluteDays: diffDays,
    weeks: Math.floor(diffDays / 7) * direction,
    remainingDays: diffDays % 7,
    yearsApprox: Math.floor(diffDays / 365.2425)
  };
}
