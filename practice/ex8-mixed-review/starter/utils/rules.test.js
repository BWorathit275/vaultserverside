const { canRegister, isValidBio } = require("./rules");

describe("canRegister", () => {
  it("should allow an adult", () => {
    expect(canRegister(25)).toBe(true);
  });
  it("should reject a child", () => {
    expect(canRegister(10)).toBe(false);
  });
});

describe("isValidBio", () => {
  it("should accept a short bio", () => {
    expect(isValidBio("Hello")).toBe(true);
  });
});
