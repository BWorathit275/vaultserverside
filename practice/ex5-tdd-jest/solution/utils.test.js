const {
  validateScore,
  calculateBMI,
  getBMICategory,
  isPalindrome,
  canAccessAdmin,
} = require("./utils");

describe("validateScore", () => {
  it("should accept a normal score", () => {
    expect(validateScore(75)).toBe(true);
  });
  it("should accept the boundaries 0 and 100", () => {
    expect(validateScore(0)).toBe(true);
    expect(validateScore(100)).toBe(true);
  });
  it("should reject just outside the boundaries (-1, 101)", () => {
    expect(validateScore(-1)).toBe(false);
    expect(validateScore(101)).toBe(false);
  });
  it("should reject a decimal score", () => {
    expect(validateScore(50.5)).toBe(false);
  });
  it("should reject a string and null", () => {
    expect(validateScore("80")).toBe(false);
    expect(validateScore(null)).toBe(false);
  });
});

describe("calculateBMI", () => {
  it("should calculate BMI rounded to 1 decimal", () => {
    // Arrange
    const weight = 70;
    const height = 1.75;
    // Act
    const bmi = calculateBMI(weight, height);
    // Assert
    expect(bmi).toBe(22.9);
  });
  it("should throw RangeError for zero weight", () => {
    expect(() => calculateBMI(0, 1.7)).toThrow(RangeError);
  });
  it("should throw for a negative height with the right message", () => {
    expect(() => calculateBMI(60, -1.6)).toThrow("Weight and height must be positive");
  });
});

describe("getBMICategory", () => {
  it.each([
    [18.4, "Underweight"],
    [18.5, "Normal"],
    [24.9, "Normal"],
    [25, "Overweight"],
    [29.9, "Overweight"],
    [30, "Obese"],
  ])("BMI %p should be %p", (bmi, expected) => {
    expect(getBMICategory(bmi)).toBe(expected);
  });
});

describe("isPalindrome", () => {
  it("should ignore case and spaces", () => {
    expect(isPalindrome("Race car")).toBe(true);
  });
  it("should return false for a non-palindrome", () => {
    expect(isPalindrome("hello")).toBe(false);
  });
  it("should treat an empty string as a palindrome", () => {
    expect(isPalindrome("")).toBe(true);
  });
  it("should throw TypeError for a number", () => {
    expect(() => isPalindrome(121)).toThrow(TypeError);
  });
});

describe("canAccessAdmin", () => {
  it("should allow an active admin", () => {
    expect(canAccessAdmin({ role: "admin", active: true })).toBeTruthy();
  });
  it("should deny a normal user", () => {
    expect(canAccessAdmin({ role: "user", active: true })).toBeFalsy();
  });
  it("should deny an inactive admin", () => {
    expect(canAccessAdmin({ role: "admin", active: false })).toBe(false);
  });
  it("should deny a missing user", () => {
    expect(canAccessAdmin(null)).toBe(false);
    expect(canAccessAdmin(undefined)).toBe(false);
  });
});
