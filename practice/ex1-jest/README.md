# Exercise 1 — Unit Testing with Jest (25 min)

Work in `starter/`. Run `npm install` then `npm test`.

## Part A — `calculateShipping(weightKg)`  (shipping.js is already written)

Requirement:

| Weight (kg) | Fee (baht) |
|---|---|
| 0 < w ≤ 1  | 40 |
| 1 < w ≤ 5  | 60 |
| 5 < w ≤ 20 | 100 |

- Not a number → throws `TypeError("Weight must be a number")`
- ≤ 0 → throws `RangeError("Weight must be greater than 0")`
- \> 20 → throws `RangeError("Weight exceeds 20 kg")`

Write `shipping.test.js`:
1. Use `describe("calculateShipping", ...)` and `it("should ...")`.
2. **Positive** cases for each fee band.
3. **Boundary** values around 1, 5 and 20 (e.g. 1, 1.01, 5, 5.01, 20).
4. **Negative** cases: 0, -3, 21, `"abc"`, `null` — use `toThrow` with the message / error type.
5. Use the **AAA** pattern (Arrange / Act / Assert comments) in at least one test.

## Part B — Bug hunt: `isPassing(score)`  (grade.js)

Requirement: *"A student passes if the score is at least 50. Score must be 0–100,
otherwise throw `RangeError("Score must be between 0 and 100")`."*

1. Write tests in `grade.test.js` that would **catch the bug** in `grade.js`
   (hint: which value sits exactly on the boundary?). Run them and watch one fail (Red).
2. Fix `grade.js` so all tests pass (Green).

## Part C — Objects & arrays  (grade.js)

`getFailedStudents(students)` returns the students whose score is below 50.
Test it with `toEqual` (whole array) and `toContain` (one name in `getFailedNames`).
Also test that an empty input returns `[]`.

**Checklist:** `toBe` for primitives · `toEqual` for objects/arrays ·
wrap throwing calls: `expect(() => fn()).toThrow(...)`.
