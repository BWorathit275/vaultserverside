# Worksheet — Test case tables (no code)

Like the slides' **Project Work** ("present a summary of test results for at least 5 features").
For each requirement, fill a table:

| No | Type (Positive / Negative / Boundary) | Input | Test case | Expected | Actual | Status |
|---|---|---|---|---|---|---|

Aim for **≥ 3 positive, ≥ 3 negative and every boundary**. Leave *Actual/Status* empty
until you run the code. Answers are at the bottom.

---

**W1. `validatePassword(password)`**
Password must be 8–20 characters and contain at least one digit.

**W2. `calculateShipping(weightKg)`**
0 < w ≤ 1 → 40 baht · 1 < w ≤ 5 → 60 · 5 < w ≤ 20 → 100 · otherwise throw an error.

**W3. `canWithdraw(balance, amount)`**
Amount must be a multiple of 100, between 100 and 20,000, and not more than the balance.

**W4. `getGrade(score)`**
80–100 A · 70–79 B · 60–69 C · 50–59 D · 0–49 F · outside 0–100 → throw.

**W5. `canAccessAdmin(user)`**
Only users with `role === "admin"` and `active === true`.

**W6. API: `POST /api/register`**
`username` 5–20 chars (letters/numbers/_), `password` ≥ 8 chars, `age` ≥ 18;
success 201, invalid 400, username taken 409.

**W7. API: `DELETE /api/tasks/:id`**
Must be logged in (401), must own the task (403), task must exist (404), success 200.

---
---

# Answers

### W1 validatePassword (8–20 chars, ≥ 1 digit)

| No | Type | Input | Test case | Expected |
|---|---|---|---|---|
| 1 | Positive | `"abcdefg1"` | exactly 8 chars with digit | true |
| 2 | Positive | `"secret123"` | normal | true |
| 3 | Positive | 20 chars incl. digit | maximum length | true |
| 4 | Boundary | `"abcdef1"` (7) | one below minimum | false |
| 5 | Boundary | 21 chars incl. digit | one above maximum | false |
| 6 | Negative | `"abcdefgh"` | no digit | false |
| 7 | Negative | `""` | empty | false |
| 8 | Negative | `null` / `12345678` (number) | wrong type | false |

### W2 calculateShipping

| No | Type | Input | Expected |
|---|---|---|---|
| 1 | Positive | 0.5 | 40 |
| 2 | Positive | 3 | 60 |
| 3 | Positive | 10 | 100 |
| 4 | Boundary | 1 / 1.01 | 40 / 60 |
| 5 | Boundary | 5 / 5.01 | 60 / 100 |
| 6 | Boundary | 20 / 20.01 | 100 / error |
| 7 | Boundary/Negative | 0 | error |
| 8 | Negative | -3, `"abc"`, `null` | error |

### W3 canWithdraw(balance, amount)

| No | Type | balance, amount | Expected |
|---|---|---|---|
| 1 | Positive | 5000, 1000 | true |
| 2 | Boundary | 5000, 100 | true (minimum) |
| 3 | Boundary | 30000, 20000 | true (maximum) |
| 4 | Boundary | 5000, 0 | false (below minimum) |
| 5 | Boundary | 30000, 20100 | false (above maximum) |
| 6 | Boundary | 1000, 1000 | true (equals balance) |
| 7 | Boundary | 1000, 1100 | false (more than balance) |
| 8 | Negative | 5000, 150 | false (not a multiple of 100) |
| 9 | Negative | 5000, -100 | false |

### W4 getGrade

Boundaries: **-1 (throw), 0 F, 49 F, 50 D, 59 D, 60 C, 69 C, 70 B, 79 B, 80 A, 100 A, 101 (throw)**.
Positive: 85 A, 65 C. Negative: `"80"`, `null` (throw or reject, as specified).

### W5 canAccessAdmin

| No | Type | Input | Expected |
|---|---|---|---|
| 1 | Positive | `{ role: "admin", active: true }` | true |
| 2 | Negative | `{ role: "user", active: true }` | false |
| 3 | Negative | `{ role: "admin", active: false }` | false |
| 4 | Negative | `{ role: "Admin", active: true }` | false (case-sensitive) |
| 5 | Negative | `null` / `{}` | false |

### W6 POST /api/register

| No | Type | Body | Expected |
|---|---|---|---|
| 1 | Positive | `john_1`, `secret123`, 20 | 201 |
| 2 | Boundary | username 5 chars / 20 chars | 201 |
| 3 | Boundary | username 4 / 21 chars | 400 |
| 4 | Boundary | password 8 chars / 7 chars | 201 / 400 |
| 5 | Boundary | age 18 / 17 | 201 / 400 |
| 6 | Negative | username `john doe` / `john@1` | 400 |
| 7 | Negative | missing password / empty body | 400 |
| 8 | Negative | username already used | 409 |
| 9 | Negative | `age: "20"` (string) | 400 (or as specified) |

### W7 DELETE /api/tasks/:id

| No | Type | Situation | Expected |
|---|---|---|---|
| 1 | Positive | owner deletes own existing task | 200 |
| 2 | Negative | no cookie / token | 401 |
| 3 | Negative | logged in as another user | 403 |
| 4 | Negative | id 999 | 404 |
| 5 | Negative | id `abc` | 404 (or 400) — not 500 |
| 6 | Negative | delete the same task twice | 2nd → 404 |
