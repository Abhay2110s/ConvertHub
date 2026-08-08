export default function calculateBusinessDays(startDate, endDate) {
  const start = new Date(`${startDate}T00:00:00`);
  const end = new Date(`${endDate}T00:00:00`);

  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    throw new Error("Please provide valid dates.");
  }

  const first = start <= end ? start : end;
  const last = start <= end ? end : start;
  const calendarDays = Math.floor((last - first) / 86400000) + 1;
  let businessDays = 0;
  const current = new Date(first);

  while (current <= last) {
    const day = current.getDay();
    if (day !== 0 && day !== 6) businessDays++;
    current.setDate(current.getDate() + 1);
  }

  return {
    businessDays,
    calendarDays,
    weekends: calendarDays - businessDays
  };
}
