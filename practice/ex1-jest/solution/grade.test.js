const { isPassing, getFailedStudents, getFailedNames } = require("./grade");

describe("isPassing", () => {
  // Boundary: 49 / 50 / 51 — the test for 50 fails on the buggy "> 50" code
  it("should fail a score of 49", () => {
    expect(isPassing(49)).toBe(false);
  });
  it("should pass a score of exactly 50", () => {
    expect(isPassing(50)).toBe(true);
  });
  it("should pass a score of 51", () => {
    expect(isPassing(51)).toBe(true);
  });

  // Range boundaries
  it("should accept 0 and 100", () => {
    expect(isPassing(0)).toBe(false);
    expect(isPassing(100)).toBe(true);
  });
  it("should reject -1", () => {
    expect(() => isPassing(-1)).toThrow("Score must be between 0 and 100");
  });
  it("should reject 101", () => {
    expect(() => isPassing(101)).toThrow(RangeError);
  });
});

describe("getFailedStudents / getFailedNames", () => {
  const students = [
    { name: "Alice", score: 80 },
    { name: "Bob", score: 49 },
    { name: "Chai", score: 50 },
    { name: "Dao", score: 12 },
  ];

  it("should return only students below 50", () => {
    expect(getFailedStudents(students)).toEqual([
      { name: "Bob", score: 49 },
      { name: "Dao", score: 12 },
    ]);
  });
  it("should include Bob in the failed names", () => {
    expect(getFailedNames(students)).toContain("Bob");
  });
  it("should not include Chai (exactly 50 passes)", () => {
    expect(getFailedNames(students)).not.toContain("Chai");
  });
  it("should return [] for an empty class", () => {
    expect(getFailedStudents([])).toEqual([]);
  });
});
