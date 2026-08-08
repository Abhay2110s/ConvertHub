export default function calculateAge(birthDate, asOfDate = new Date().toISOString().slice(0, 10)) {
  const birth = new Date(`${birthDate}T00:00:00`);
  const asOf = new Date(`${asOfDate}T00:00:00`);

  if (Number.isNaN(birth.getTime()) || Number.isNaN(asOf.getTime())) {
    throw new Error("Please provide valid dates.");
  }
  if (birth > asOf) {
    throw new Error("Birth date cannot be after the reference date.");
  }

  let years = asOf.getFullYear() - birth.getFullYear();
  let months = asOf.getMonth() - birth.getMonth();
  let days = asOf.getDate() - birth.getDate();

  if (days < 0) {
    months -= 1;
    const previousMonthDays = new Date(asOf.getFullYear(), asOf.getMonth(), 0).getDate();
    days += previousMonthDays;
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const totalDays = Math.floor((asOf - birth) / 86400000);

  return { years, months, days, totalDays };
}
