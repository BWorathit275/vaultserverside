# Exercise 11 — API testing in Postman (35 min)

Test the **ex6 Tasks API** with Postman instead of REST Client, using variables,
the Authorization tab, test scripts and the Collection Runner.

## Setup

1. Start the **fixed** API: `cd ../ex6-api-testing/solution && npm install && npm run dev`
2. Postman (web.postman.co or desktop) → **Import** → `starter/tasks-api.postman_collection.json`
   and `starter/local.postman_environment.json`
3. Top-right environment dropdown → choose **Tasks API - local**

## Tasks

**1. Variables (5 min)**
- Find where `{{base_url}}`, `{{username}}`, `{{password}}` are defined (Environment) and
  `{{taskId}}` (Collection → Variables). Why is a variable better than typing the URL 11 times?

**2. Authorization tab (5 min)**
- The collection uses **Basic Auth** with `{{username}}`/`{{password}}`; requests inherit it.
- Request 02 overrides it with **No Auth**; request 10 overrides it with **user2**.
- Open the **Headers** (hidden) / Console and find the `Authorization: Basic ...` header Postman generated.

**3. Write the test scripts (15 min)** — Scripts → **Post-response** of each request:
- Status code for every request (`pm.response.to.have.status(...)`)
- 01: `username` is `user1` · 03: array with ≥ 3 items, response time < 500 ms
- 04: every task's status is `In Progress` · 06: owner equals the environment's `username`
- 07: title is `Practise Postman` · 09: status changed **and title unchanged**
- 06 already saves the new id with `pm.collectionVariables.set("taskId", ...)` — requests 07–11 use it.

**4. Collection Runner (5 min)**
- Run the whole collection in order → every test should pass on the **fixed** API.
- Now stop it and start the **buggy** API (`../ex6-api-testing/starter`), run again.
  Which tests fail? Match each failure to a bug from exercise 6.

**5. Report (5 min)** — export the run results or take a screenshot; write which bugs were found.

## Snippets

```js
pm.test("Status code is 200", () => {
  pm.response.to.have.status(200);
});
pm.test("Has userId", () => {
  const data = pm.response.json();
  pm.expect(data).to.have.property("userId");
});
pm.expect(data).to.be.an("array");
pm.expect(data.length).to.be.at.least(3);
pm.expect(pm.response.responseTime).to.be.below(500);
pm.environment.get("username");
pm.collectionVariables.set("taskId", pm.response.json().id);
```

Solution: `solution/tasks-api.postman_collection.json` (import it to compare).
Expected on the buggy API: requests 05, 08, 09 (title), 10 fail — and 11 fails too, because
request 10 already deleted the task (a failing test can cause later ones to fail: run order matters).
