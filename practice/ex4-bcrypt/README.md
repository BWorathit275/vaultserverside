# Exercise 4 — Register / login with bcrypt (20 min)

Same idea as Cookies **Project II**. Complete `starter/server.js`, then test with `request.rest`.

| Route | Must do |
|---|---|
| `GET /users` | list users (you should see **hashes**, never plain passwords) |
| `POST /users` `{ name, password }` | 400 if name or password missing; hash with `bcrypt.genSalt()` + `bcrypt.hash()`; push; **201** |
| `POST /users/login` `{ name, password }` | user not found → **400** `Cannot find user`; `bcrypt.compare` true → `Success`, false → `Not Allowed`; errors → 500 |

Remember:
- bcrypt functions return Promises → `async (req, res)` + `await`
- `users.find(u => u.name === req.body.name)` — **`===`**, not `=` (the slide has `=`)
- Register the same password twice: the hashes differ (random salt), but `compare` still works

**Bonus (not in slides)**
1. Register the same name twice → **409 Conflict**
2. Return the same message for "no such user" and "wrong password" (avoids revealing which usernames exist)
