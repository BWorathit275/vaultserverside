// Pure functions -> easy to unit test with Jest.

// 4-20 chars, letters / numbers / underscore, must start with a letter.
function validateUsername(username) {
  return typeof username === "string" && /^[A-Za-z][A-Za-z0-9_]{3,19}$/.test(username);
}

// At least 8 characters and contains at least one number.
function validatePassword(password) {
  return typeof password === "string" && password.length >= 8 && /[0-9]/.test(password);
}

// Throws on invalid book data, returns true if valid.
function validateBook(book) {
  if (book == null || typeof book.title !== "string" || book.title.trim() === "") {
    throw new Error("title is required");
  }
  if (!Number.isInteger(book.copies) || book.copies < 0 || book.copies > 50) {
    throw new RangeError("copies must be an integer from 0 to 50");
  }
  return true;
}

module.exports = { validateUsername, validatePassword, validateBook };
