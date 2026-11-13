# Exercise 5 — TDD with Jest (30 min)

Practise **Test Driven Development**: *"we don't write code until we write the test"*.
The functions in `starter/utils.js` are stubs that throw `"Not implemented"`.

For **each** function:
1. **Red** — write the tests in `utils.test.js` first. Run `npm test`: they fail.
2. **Green** — write the simplest code in `utils.js` that makes them pass.
3. **Refactor** — tidy the code; tests must stay green.

Use one `describe()` per function, `it("should ...")` names, and the right matcher.

## Requirements

**`validateScore(score)`** → `true`/`false`
- Valid if it is an **integer** from **0 to 100** (inclusive).
- `50.5`, `-1`, `101`, `"80"`, `null` → `false`
- Test the boundaries: -1, 0, 100, 101

**`calculateBMI(weightKg, heightM)`** → number rounded to **1 decimal**
- BMI = weight / height²  (e.g. 70 kg, 1.75 m → `22.9`)
- weight or height ≤ 0 → throw `RangeError("Weight and height must be positive")`

**`getBMICategory(bmi)`** → string
| BMI | Category |
|---|---|
| < 18.5 | `"Underweight"` |
| 18.5 – < 25 | `"Normal"` |
| 25 – < 30 | `"Overweight"` |
| ≥ 30 | `"Obese"` |
Test every boundary: 18.4 / 18.5, 24.9 / 25, 29.9 / 30.

**`isPalindrome(text)`** → `true`/`false`
- Ignore case and spaces: `"Race car"` → `true`, `"hello"` → `false`, `""` → `true`
- Not a string → throw `TypeError("Input must be a string")`

**`canAccessAdmin(user)`** → `true`/`false`  *(from the slides' Project Work)*
- `true` only if `user.role === "admin"` **and** `user.active === true`
- `null`/`undefined` user → `false`
- Use `toBeTruthy` / `toBeFalsy` in at least one test.
