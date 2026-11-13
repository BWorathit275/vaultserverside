const calculateShipping = require("./shipping");

describe("calculateShipping", () => {
  // Positive cases
  it("should charge 40 baht for 0.5 kg", () => {
    // Arrange
    const weight = 0.5;
    // Act
    const fee = calculateShipping(weight);
    // Assert
    expect(fee).toBe(40);
  });
  it("should charge 60 baht for 3 kg", () => {
    expect(calculateShipping(3)).toBe(60);
  });
  it("should charge 100 baht for 10 kg", () => {
    expect(calculateShipping(10)).toBe(100);
  });

  // Boundary values
  it("should charge 40 baht at exactly 1 kg", () => {
    expect(calculateShipping(1)).toBe(40);
  });
  it("should charge 60 baht just above 1 kg", () => {
    expect(calculateShipping(1.01)).toBe(60);
  });
  it("should charge 60 baht at exactly 5 kg", () => {
    expect(calculateShipping(5)).toBe(60);
  });
  it("should charge 100 baht just above 5 kg", () => {
    expect(calculateShipping(5.01)).toBe(100);
  });
  it("should charge 100 baht at exactly 20 kg (maximum)", () => {
    expect(calculateShipping(20)).toBe(100);
  });

  // Negative cases
  it("should reject 0 kg", () => {
    expect(() => calculateShipping(0)).toThrow("Weight must be greater than 0");
  });
  it("should reject a negative weight", () => {
    expect(() => calculateShipping(-3)).toThrow(RangeError);
  });
  it("should reject a weight above 20 kg", () => {
    expect(() => calculateShipping(21)).toThrow("Weight exceeds 20 kg");
  });
  it("should reject a string", () => {
    expect(() => calculateShipping("abc")).toThrow(TypeError);
  });
  it("should reject null", () => {
    expect(() => calculateShipping(null)).toThrow("Weight must be a number");
  });
});
