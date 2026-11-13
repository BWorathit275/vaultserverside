# Further Reading: Extra Study Repos (Jest · API Testing · MVC · Cookies/Sessions)

Optional reading beyond the slides (decks 10-13). Descriptions come from search-result summaries; open each README to confirm before relying on it.

## Testing guides (Jest, API testing)

| Repo | What it is |
|---|---|
| [goldbergyoni/nodebestpractices](https://github.com/goldbergyoni/nodebestpractices) | 100+ Node.js best practices; testing section covers API testing, AAA, coverage, mocking |
| [goldbergyoni/javascript-testing-best-practices](https://github.com/goldbergyoni/javascript-testing-best-practices) | Testing-only guide: test design, mocking, API tests |
| [goldbergyoni/nodejs-testing-best-practices](https://github.com/goldbergyoni/nodejs-testing-best-practices) | Backend component/integration testing guide with an example app (advanced; moved to testjavascript/nodejs-integration-tests-best-practices) |
| [goldbergyoni/various-testing-examples](https://github.com/goldbergyoni/various-testing-examples) | JavaScript and Node.js testing workshop |

## Tools

| Repo | What it is |
|---|---|
| [jestjs/jest](https://github.com/jestjs/jest) | Official Jest repo (docs: https://jestjs.io) |
| [jest-community/jest-extended](https://github.com/jest-community/jest-extended) | Extra Jest matchers |
| [ladjs/supertest](https://github.com/ladjs/supertest) | HTTP assertions for testing Express endpoints in code |

## Runnable examples

| Repo | What it shows |
|---|---|
| [expressjs/express](https://github.com/expressjs/express/tree/master/examples) (`examples/`) | `mvc`, `auth`, `cookies`, `cookie-sessions`, `ejs`, `error`, `error-pages`, `web-service` |
| [gregjopa/express-app-testing-demo](https://github.com/gregjopa/express-app-testing-demo) | Small Express app tested with Jest + Supertest, with coverage (2014 repo, older syntax) |
| [HugoDF/express-supertest-moxios](https://github.com/HugoDF/express-supertest-moxios) | Supertest + Jest with a mocked outside API call (moxios is older) |
| [MuhdHanish/session_cookies](https://github.com/MuhdHanish/session_cookies) | Express + EJS + MongoDB sessions, cookies, bcryptjs login (small, little-used repo) |

## Security references (cookies, sessions, password hashing)

| Repo | What it is |
|---|---|
| [OWASP/CheatSheetSeries](https://github.com/OWASP/CheatSheetSeries) | Session Management, Password Storage, Authentication cheat sheets |

## Suggested order

1. `expressjs/express` examples (`mvc`, `auth`)
2. `gregjopa/express-app-testing-demo`
3. OWASP Session Management and Password Storage sheets
