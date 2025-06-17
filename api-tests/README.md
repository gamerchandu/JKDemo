# Bookstore API Automation Framework

## Overview    
This repo contains automated API tests for the Bookstore FastAPI application. The goal is to ensure all major features like CRUD operations, authentication and error handling work as expected. The tests are built using Playwright (JavaScript) and Allure for reporting.

---

## Features
- **Full API Coverage:**  
  Tests cover all key API features: creating, reading, updating and deleting books as well as authentication and error scenarios
- **Robust Test Design:**  
  Includes positive, negative and edge cases. Uses request chaining (ex: login/signup before book actions)
- **Modern Framework:**  
  Built with Playwright Test for API automation. Code is modular and easy to maintain
- **Configurable:**  
  Uses a `.env` file for environment-specific settings
- **Clear Reporting:**  
  Generates Allure reports for easy review
- **CI/CD Ready:**  
  Integrated with GitHub Actions for automated test runs and report uploads.

---

## How I Built the API Tests

Here’s the process I followed to set up and write these API tests:

1. **Understanding the Requirements**  
   I started by reading the API documentation and looking at the backend code. This helped me list out all the endpoints and understand how authentication works.

2. **Choosing Tools & Setting Up**  
   I picked Playwright Test for its modern API testing features and easy setup. I initialized the project with `npm init` and installed the necessary dependencies:
   ```bash
   npm install --save-dev @playwright/test allure-playwright
   ```

3. **Organizing the Project**  
   I created a simple folder structure:
   ```
   api-tests/
     tests/
     utils/
     .env
     playwright.config.js
   ```
   Utility files were added for reusable API logic.

4. **Configuring Environments**  
   I set up a `.env` file to store things like the API base URL, making it easy to switch between dev, QA and prod

5. **Test Data Approach**  
   To avoid data clashes, I made sure each test uses unique data (like random emails or book titles). Utility functions help generate this data.

6. **Reusable API Utilities**  
   I wrote helper functions in `utils/apiClient.js` for common actions like login and CRUD operations. This keeps the tests clean.

7. **Writing the Tests**  
   For each endpoint, I wrote:
   - Positive tests (valid requests)
   - Negative tests (invalid input, unauthorized access)
   - Edge cases (missing fields, boundary values)
   Tests are chained where needed (ex login before book actions).

8. **Assertions & Validation**  
   Each test checks status codes, response payloads and error messages. Where the backend behavior wasn’t ideal (like returning 200 for invalid input), I noted it and aligned the tests accordingly.

9. **Reporting**  
   Allure reporting is integrated for detailed, visual test results. Scripts are included to generate and view reports.

10. **CI/CD Integration**  
    I set up a GitHub Actions workflow to run the tests on every push or pull request. The Allure report is uploaded as an artifact.

11. **Documentation**  
    All setup and usage instructions are included in this README to help others get started quickly.

---

## Getting Started

### Prerequisites
- Node.js
- npm
- FastAPI Bookstore backend running

### Installation
```bash
npm install
```

### Configuration
- Add your API base URL to a `.env` file:
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
   npm run test
   ```
3. **Generate and view the Allure report:**
   ```bash
   npm run allure:report
   ```

---

## CI/CD Pipeline
- Tests run automatically on every push or pull request via GitHub Actions.
- The Allure report is uploaded as an artifact for download and review.

---

## Testing Strategy
- **Test Flows:**  
  Every endpoint is tested for positive, negative and edge cases. Request chaining is used where needed.
- **Reliability:**  
  Unique test data is used for each run to avoid conflicts. Utilities keep the code modular and maintainable.
- **Challenges:**  
  - Some backend endpoints return 200 even for invalid input. For now, tests match the current behavior but I recommend improving backend validation.
  - To keep tests isolated, each run uses unique data.

---

## Sample Allure Report
- After running the tests, generate the report with `npm run allure:report`.
- Download or view the report artifact from the GitHub Actions run.

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
- Add new test files in `tests/` for additional endpoints.
- Add utility functions in `utils/` as needed.
- Update `.env` for new environments.

---
