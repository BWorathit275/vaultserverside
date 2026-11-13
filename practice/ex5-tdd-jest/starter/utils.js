// Return true if the score is an integer from 0 to 100.
function validateScore(score) {
  throw new Error("Not implemented");
}

// Return weight / height^2 rounded to 1 decimal; throws if either is not positive.
function calculateBMI(weightKg, heightM) {
  throw new Error("Not implemented");
}

// Map a BMI value to Underweight / Normal / Overweight / Obese.
function getBMICategory(bmi) {
  throw new Error("Not implemented");
}

// Return true if the text reads the same backwards (ignoring case and spaces).
function isPalindrome(text) {
  throw new Error("Not implemented");
}

// Return true only for an active user with role "admin".
function canAccessAdmin(user) {
  throw new Error("Not implemented");
}

module.exports = { validateScore, calculateBMI, getBMICategory, isPalindrome, canAccessAdmin };
