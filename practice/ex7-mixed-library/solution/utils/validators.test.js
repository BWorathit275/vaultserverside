const { validateUsername, validatePassword, validateBook } = require("./validators");

describe("validateUsername", () => {
  it("should accept a valid username", () => {
    expect(validateUsername("ann_01")).toBe(true);
  });
  it("should accept the boundaries 4 and 20 characters", () => {
    expect(validateUsername("abcd")).toBe(true);
    expect(validateUsername("a".repeat(20))).toBe(true);
  });
  it("should reject 3 and 21 characters", () => {
    expect(validateUsername("abc")).toBe(false);
    expect(validateUsername("a".repeat(21))).toBe(false);
  });
  it("should reject a name starting with a number", () => {
    expect(validateUsername("1ann")).toBe(false);
  });
  it("should reject spaces and special characters", () => {
    expect(validateUsername("ann lee")).toBe(false);
    expect(validateUsername("ann@lee")).toBe(false);
  });
  it("should reject non-strings", () => {
    expect(validateUsername(null)).toBe(false);
    expect(validateUsername(12345)).toBe(false);
  });
});

describe("validatePassword", () => {
  it("should accept exactly 8 characters with a number", () => {
    expect(validatePassword("abcdefg1")).toBe(true);
  });
  it("should reject 7 characters", () => {
    expect(validatePassword("abcdef1")).toBe(false);
  });
  it("should reject a password without a number", () => {
    expect(validatePassword("abcdefgh")).toBe(false);
  });
  it("should reject undefined", () => {
    expect(validatePassword(undefined)).toBeFalsy();
  });
});

describe("validateBook", () => {
  it("should accept a valid book", () => {
    expect(validateBook({ title: "Clean Code", copies: 2 })).toBe(true);
  });
  it("should accept 0 and 50 copies", () => {
    expect(validateBook({ title: "A", copies: 0 })).toBe(true);
    expect(validateBook({ title: "A", copies: 50 })).toBe(true);
  });
  it("should throw when the title is missing or blank", () => {
    expect(() => validateBook({ copies: 1 })).toThrow("title is required");
    expect(() => validateBook({ title: "   ", copies: 1 })).toThrow("title is required");
  });
  it("should throw RangeError for -1, 51 and 1.5 copies", () => {
    expect(() => validateBook({ title: "A", copies: -1 })).toThrow(RangeError);
    expect(() => validateBook({ title: "A", copies: 51 })).toThrow(RangeError);
    expect(() => validateBook({ title: "A", copies: 1.5 })).toThrow(RangeError);
  });
});
