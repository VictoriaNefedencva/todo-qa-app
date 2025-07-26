# Todo App: QA Automation Example

## Task

React + Node.js app with login and todo CRUD.
Automated tests (Cypress, Supertest), logging, CI, code coverage, and visual regression.

## Quick start

1. Backend

```sh
cd backend
npm install
npm start
```

2. Frontend

```sh
cd ../frontend
npm install
npx serve -s .
```

3. API tests

```sh
cd backend
npm test
```

4. UI (Cypress) tests

```sh
cd frontend
npx serve -s . &
npm test
```
or open Cypress GUI: `npm run cypress:open`

5. Visual regression tests

```sh
cd frontend
npm run test:snapshots
```

## Test plan

- Login: valid/invalid credentials (UI and API)
- CRUD: create, edit, delete todos (UI and API)
- Error checks: missing data, wrong credentials, unauthorized
- Visual regression after login

**Tools:**  
Cypress (UI & visual), Supertest+Jest (API & coverage), GitHub Actions (CI), logging (backend to file, frontend to console).

**Limitations:**  
In-memory storage, single test user: test/test, demo only.

## Structure

```
backend/     # Node.js + Express, tests and logging
frontend/    # React, Cypress, visual regression, logging
.github/
  workflows/
    ci.yml   # CI
README.md
```
