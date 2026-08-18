# iConcile QA Automation Framework

Playwright + TypeScript automation framework automates the required SauceDemo UI scenarios and Restful Booker API scenarios using reusable components, Page Object Model, API client abstraction, centralized configuration, test data management, validation utilities, CI/CD execution and reporting.

---

## 1. Project Overview

This project demonstrates a reusable Playwright automation framework for:

- UI automation
- REST API automation
- API chaining
- Data-driven testing
- Reusable validation utilities
- Failure debugging
- HTML and Allure reporting
- CI/CD execution using GitHub Actions


## 2. Technology Stack

| Technology | Purpose |
|---|---|
| Playwright | UI and API automation |
| TypeScript | Programming language |
| Node.js / npm | Runtime and dependency management |
| Playwright Test | Test runner and assertions |
| Page Object Model | UI abstraction |
| XLSX | Excel-based test data |
| Allure | Test reporting |
| Git | Version control |
| GitHub Actions | CI/CD |
| dotenv | Environment variable management |

---

## 3. Framework Approach

The framework follows a modular and reusable design.

```text
Tests
├── UI Tests
│   ├── Page Objects
│   └── Reusable Utilities
│
└── API Tests
    ├── Booking API Client
    ├── API Endpoints
    └── Validators
```

### UI Automation

UI tests use the Page Object Model.

```text
Pages
├── Login.ts
├── Product.ts
├── CartPage.ts
└── CheckoutPage.ts
```

### API Automation

API tests use a reusable `BookingApiClient`.

```text
BookingApiClient
├── createToken()
├── createBooking()
├── getBooking()
├── updateBooking()
└── deleteBooking()
```
# Test Data

Test data is maintained separately from test logic.

UI and API data is stored in TypeScript files and Excel where appropriate.

# Debugging

Playwright is configured to capture:

* Screenshots on failure
* Video on failure
* Trace on failure

# Test Tags

Tests are grouped using Playwright tags:

@ui
@api
@sanity
@regression
@negative


## 4. Project Structure

```text
.
├── .github/
│   └── workflows/
│       ├── sanity.yaml
│       └── regression.yaml
│
├── Pages/
│   ├── CartPage.ts
│   ├── CheckoutPage.ts
│   ├── Login.ts
│   └── Product.ts
│
├── config/
│   ├── env.ts
│   └── bookingApi.ts
│
├── testData/
│   ├── API/
│   │   └── bookingData.ts
│   │
│   └── UI/
│       ├── AddProducts.ts
│       ├── RemoveProducts.ts
│       └── ProductList.xlsx
│
├── tests/
│   ├── API/
│   │   └── booking.spec.ts
│   │
│   └── UI/
│       ├── checkout.spec.ts
│       ├── login.spec.ts
│       └── products.spec.ts
│
├── utils/
│   ├── API/
│   │   ├── bookingApiClient.ts
│   │   ├── bookingEndPoints.ts
│   │   └── validators/
│   │       ├── statusCodeValidator.ts
│   │       ├── responseBodyValidator.ts
│   │       └── schemaValidator.ts
│   │
│   └── UI/
│       ├── getLocators.ts
│       └── testDataGenerator.ts
│
├── .env
├── .gitignore
├── package.json
├── playwright.config.ts
└── README.md
```


# 5. Prerequisites

Install the following:

* Node.js 18+ recommended
* npm
* Git
* Java 17+ if Allure CLI is used locally else HTML reporting is still there.
* VS Code or another TypeScript-compatible IDE


# 6. Setup

* Clone the repository: 
git clone <repository-url>

* Install dependencies:
npm install

* Install Playwright browser:
npx playwright install

## Environment Variables (Mandatory else env.ts would throw error)

BASE_URL = " <Value>"
PASSWORD = " <Value>"
USER_NAME = " <Value>"
API_BASE_URL = " <Value>"
API_AUTH = " <Value>"
GET_BOOKING = " <Value>"
CREATE_BOOKING = " <Value>"
UPDATE_BOOKING = " <Value>"
DELETE_BOOKING = " <Value>"
BOOKING_API_USERNAME = " <Value>"
BOOKING_API_PASSWORD = " <Value>"

# 7. How to Execute UI Tests

npm run test:ui

# 8. How to Execute UI Tests

npm run test:api

# 9. How to Execute the complete suite

npm run test

# 10. How to Generate Reports

* Playwright HTML Report

After test execution:

npm run report

The report contains:

Test execution status
Execution duration
Failure details
Screenshots
Videos
Traces where available

* Allure Report

npm run allure:serve


# 11. Assumptions

* Required credentials are provided through environment variables.

# 12. AI Assistance

* Framework design discussions -- After research, I created the config folder and managed all the environments centrally through it.

* Debugging implementation issues -- used for debugging multiple issues appearing here and there.

* Improving documentation

# 13. Future improvements

* Multi-environment configuration management
* Additional API assertions
* Parallel API/UI execution optimization
* customized reporting fro better visualization(enhancements in Allure reporting )
* Better CI/CD integration
