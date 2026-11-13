// Return the shipping fee (40/60/100 baht) for a weight; throws for invalid weights.
function calculateShipping(weightKg) {
  if (typeof weightKg !== "number" || Number.isNaN(weightKg)) {
    throw new TypeError("Weight must be a number");
  }
  if (weightKg <= 0) {
    throw new RangeError("Weight must be greater than 0");
  }
  if (weightKg > 20) {
    throw new RangeError("Weight exceeds 20 kg");
  }
  if (weightKg <= 1) return 40;
  if (weightKg <= 5) return 60;
  return 100;
}

module.exports = calculateShipping;
