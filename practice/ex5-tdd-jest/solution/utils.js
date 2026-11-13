function validateScore(score) {
  return Number.isInteger(score) && score >= 0 && score <= 100;
}

function calculateBMI(weightKg, heightM) {
  if (!(weightKg > 0) || !(heightM > 0)) {
    throw new RangeError("Weight and height must be positive");
  }
  return Math.round((weightKg / (heightM * heightM)) * 10) / 10;
}

function getBMICategory(bmi) {
  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Normal";
  if (bmi < 30) return "Overweight";
  return "Obese";
}

function isPalindrome(text) {
  if (typeof text !== "string") {
    throw new TypeError("Input must be a string");
  }
  const cleaned = text.toLowerCase().replace(/\s/g, "");
  return cleaned === cleaned.split("").reverse().join("");
}

function canAccessAdmin(user) {
  return user != null && user.role === "admin" && user.active === true;
}

module.exports = { validateScore, calculateBMI, getBMICategory, isPalindrome, canAccessAdmin };
