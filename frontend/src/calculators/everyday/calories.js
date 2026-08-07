export default function calculateCalories(weight, height, age, gender, activityLevel) {
  let bmr;
  if (gender === "male") {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }

  const multipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    veryActive: 1.9
  };

  return {
    bmr: Math.round(bmr),
    dailyCalories: Math.round(bmr * multipliers[activityLevel])
  };
}
