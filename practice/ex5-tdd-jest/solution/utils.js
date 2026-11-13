// Return true if the score is an integer from 0 to 100.
function validateScore(score) {
  return Number.isInteger(score) && score >= 0 && score <= 100;
}

// Return weight / height^2 rounded to 1 decimal; throws if either is not positive.
function calculateBMI(weightKg, heightM) {
  if (!(weightKg > 0) || !(heightM > 0)) {
    throw new RangeError("Weight and height must be positive");
  }
  return Math.round((weightKg / (heightM * heightM)) * 10) / 10;
}

// Map a BMI value to Underweight / Normal / Overweight / Obese.
function getBMICategory(bmi) {
  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Normal";
  if (bmi < 30) return "Overweight";
  return "Obese";
}

// Return true if the text reads the same backwards (ignoring case and spaces).
function isPalindrome(text) {
  if (typeof text !== "string") {
    throw new TypeError("Input must be a string");
  }
  const cleaned = text.toLowerCase().replace(/\s/g, "");
  return cleaned === cleaned.split("").reverse().join("");
}

// Return true only for an active user with role "admin".
function canAccessAdmin(user) {
  return user != null && user.role === "admin" && user.active === true;
}

module.exports = { validateScore, calculateBMI, getBMICategory, isPalindrome, canAccessAdmin };
