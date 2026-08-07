export default function calculateAge(birthDate) {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return {
    years: age,
    months: today.getMonth() - birth.getMonth() + (monthDiff < 0 ? 12 : 0),
    days: today.getDate() - birth.getDate() + (today.getDate() < birth.getDate() ? new Date(today.getFullYear(), today.getMonth(), 0).getDate() : 0)
  };
}
