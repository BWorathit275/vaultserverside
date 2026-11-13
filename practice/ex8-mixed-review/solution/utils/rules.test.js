const { canRegister, isValidBio } = require("./rules");

describe("canRegister", () => {
  it("should allow an adult", () => {
    expect(canRegister(25)).toBe(true);
  });
  it("should reject a child", () => {
    expect(canRegister(10)).toBe(false);
  });
  // Boundary tests that were missing — 18 fails on the original "> 18" code
  it("should allow exactly 18", () => {
    expect(canRegister(18)).toBe(true);
  });
  it("should reject 17", () => {
    expect(canRegister(17)).toBe(false);
  });
  it("should reject a non-integer age", () => {
    expect(canRegister("20")).toBe(false);
    expect(canRegister(18.5)).toBe(false);
  });
});

describe("isValidBio", () => {
  it("should accept a short bio", () => {
    expect(isValidBio("Hello")).toBe(true);
  });
  it("should accept a missing bio (optional)", () => {
    expect(isValidBio(undefined)).toBe(true);
  });
  it("should accept exactly 100 characters", () => {
    expect(isValidBio("a".repeat(100))).toBe(true);
  });
  it("should reject 101 characters", () => {
    expect(isValidBio("a".repeat(101))).toBe(false);
  });
  it("should reject a non-string bio", () => {
    expect(isValidBio(123)).toBe(false);
  });
});
