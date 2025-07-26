# Test Plan for Todo QA App

## 1. What is Being Tested

The Todo QA App is a fullstack application with authentication and todo CRUD functionality. The following aspects are covered by tests:
- User authentication (login, invalid login)
- Todo CRUD operations (create, read, update, delete)
- API error handling (missing data, unauthorized, invalid requests)
- UI functionality and rendering
- Visual consistency of the UI (visual regression)
- Code quality (via code coverage)

## 2. Test Coverage Areas

- **Backend (API)**
  - Authentication endpoints
  - CRUD endpoints for todos
  - Error scenarios (invalid input, missing authorization)
- **Frontend (UI)**
  - Login form (valid/invalid credentials)
  - Todo list rendering and CRUD actions
  - UI error messages
- **End-to-End (E2E)**
  - Complete user flows (login, todo management)
  - Integration between frontend and backend
- **Visual Regression**
  - UI appearance after key actions (e.g., after login)

## 3. Tools Used and Rationale

- **Jest + Supertest** (backend API testing):
  - Widely used for Node.js projects
  - Enables HTTP request assertions and code coverage metrics
- **Cypress** (frontend E2E and UI testing):
  - Powerful for simulating real user interactions
  - Supports visual regression plugins
- **Cypress-image-snapshot** (visual testing):
  - Automated screenshots and comparison for UI consistency
- **GitHub Actions** (Continuous Integration):
  - Automates running tests and code quality checks on each push

## 4. How to Run the Tests

**Backend (API) tests:**
```sh
cd backend
npm install
npm test
```

**Frontend (UI & E2E) tests:**
```sh
cd frontend
npm install
npx serve -s . &
npm test
```
or open Cypress UI:
```sh
npm run cypress:open
```

**Visual regression tests:**
```sh
cd frontend
npm run test:snapshots
```

Tests are also automatically run in CI via GitHub Actions on every code push.

## 5. Assumptions and Limitations

- The app uses in-memory storage; data resets on server restart.
- Only one test user exists: `test` / `test`
- No persistent database or production authentication flows are implemented.
- Visual regression tests use default viewport and may fail if run in different environments.
- The project is intended for demo/testing purposes only, not for production.

---