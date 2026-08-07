export default function calculateDateDifference(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end - start);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return {
    days: diffDays,
    weeks: Math.floor(diffDays / 7),
    months: Math.floor(diffDays / 30),
    years: Math.floor(diffDays / 365)
  };
}
