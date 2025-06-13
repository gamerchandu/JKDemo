# Bookstore    API Automation Framework

## Overview 
This project provides an automated API test framework for the Bookstore FastAPI application. It ensures comprehensive coverage of all major functionalities, including CRUD operations, authentication, and error handling, using Playwright (JavaScript) and Allure reporting.

---

## Features
- **Comprehensive API Test Coverage:**
  - Automates all critical API functionalities: Create, Read, Update, Delete for books.
  - Validates status codes, response payloads, and error handling.
  - Covers positive, negative, and edge test scenarios.
  - Implements request chaining (ex: login/signup → book operations).
- **Framework Implementation:**
  - Uses Playwright Test for API automation.
  - Modular, maintainable, and reusable code structure.
  - Configuration via `.env` for different environments (dev, QA, prod).
- **Execution & Reporting:**
  - Generates detailed Allure reports highlighting Pass/Fail/Skip results.
- **CI/CD Integration:**
  - GitHub Actions pipeline for automated test execution and report upload.

---

## Getting Started

### Prerequisites
- Node.js
- npm
- FastAPI Bookstore backend running (see backend README)

### Installation
```bash
npm install
```

### Configuration
- Set the API base URL in a `.env` file:
  ```
  BASE_URL=http://localhost:8000
  ```

---

## Running the Tests

1. **Start the FastAPI backend** (in a separate terminal):
   ```bash
   uvicorn main:app --reload
   ```
2. **Run the tests:**
   ```bash
   npx playwright test
   ```
3. **Generate and view Allure report:**
   ```bash
   npm run allure:report
   ```

---

## CI/CD Pipeline
- Tests run automatically on every push/PR via GitHub Actions.
- Allure report is uploaded as an artifact for download and review.

---

## Testing Strategy
- **Test Flows:**
  - Each endpoint is tested for positive, negative, and edge cases.
  - Request chaining is used (ex: login → use token for books).
- **Reliability & Maintainability:**
  - Unique test data per run to avoid conflicts.
  - Modular code with reusable API client utilities.
  - Config-driven for easy environment switching.
- **Challenges & Solutions:**
  - *Challenge:* Backend returns 200 for some invalid inputs. 
    *Solution:* Tests are aligned to current backend behavior; recommend improving backend validation for stricter checks.
  - *Challenge:* Ensuring test isolation. 
    *Solution:* Use unique emails and data for each test run.

---

## Sample Allure Report
- After running tests, generate the report with `npm run allure:report`.
- Download/view the report artifact from the GitHub Actions run.


---

## Folder Structure
```
api-tests/
  tests/
    auth.spec.js
    books.spec.js
  utils/
    apiClient.js
  .env
  playwright.config.js
  README.md
  .github/
    workflows/
      ci.yml
```

---

## How to Extend
- Add more test files in `tests/` for new endpoints.
- Add new utility functions in `utils/` as needed.
- Update `.env` for new environments.

---

## License
MIT
