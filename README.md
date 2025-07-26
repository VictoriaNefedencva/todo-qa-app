# React + Node.js Todo App

A fullstack application featuring authentication and todo CRUD. Includes automated tests (Cypress, Supertest), logging, CI, code coverage, and visual regression.

---

## 🚀 Quick Start

1. **Clone the repository:**
   ```sh
   git clone https://github.com/VictoriaNefedencva/todo-qa-app.git
   cd todo-qa-app
   ```

2. **Install dependencies:**

   For backend:
   ```sh
   cd backend
   npm install
   ```

   For frontend:
   ```sh
   cd ../frontend
   npm install
   ```

---

## ▶️ Running the App

**Backend:**
```sh
cd backend
npm start
```

**Frontend:**
```sh
cd ../frontend
npx serve -s .
```

---

## 🧪 Testing

**API tests:**
```sh
cd backend
npm test
```

**UI (Cypress) tests:**
```sh
cd frontend
npx serve -s . &
npm test
```
or open the Cypress GUI:
```sh
npm run cypress:open
```

**Visual regression tests:**
```sh
cd frontend
npm run test:snapshots
```

---

## 📝 Test Plan

- Login: valid/invalid credentials (UI and API)
- CRUD: create, edit, delete todos (UI and API)
- Error checks: missing data, wrong credentials, unauthorized access
- Visual regression after login

---

## 🛠️ Tools

- Cypress (UI & visual)
- Supertest + Jest (API & coverage)
- GitHub Actions (CI)
- Logging (backend — to file, frontend — to console)

---

## ⚠️ Limitations

- In-memory storage
- Single test user: **test / test**
- For demo purposes only

---

## 📦 Repository Structure

```
backend/     # Node.js + Express, tests and logging
frontend/    # React, Cypress, visual regression, logging
.github/
  workflows/
    ci.yml   # CI
README.md