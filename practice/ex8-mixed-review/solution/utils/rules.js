// Requirement: users must be 18 or older to register.
function canRegister(age) {
  return Number.isInteger(age) && age >= 18; // FIX 1: "18 or older" means >=
}

// Requirement: bio is optional, at most 100 characters.
function isValidBio(bio) {
  return bio === undefined || (typeof bio === "string" && bio.length <= 100);
}

module.exports = { canRegister, isValidBio };
