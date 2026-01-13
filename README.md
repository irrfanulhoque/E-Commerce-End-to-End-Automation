# E-Commerce End-to-End Automation using Playwright (JS)

[![Playwright Tests](https://img.shields.io/badge/Playwright-Tested-brightgreen)](https://playwright.dev/)  
[![License](https://img.shields.io/badge/License-MIT-blue)](LICENSE)

## Overview

This project is an **end-to-end automation testing suite** for a demo e-commerce website using **Playwright with JavaScript**.  
It demonstrates industry-standard testing practices including:

- **Page Object Model (POM)** for maintainable and reusable test code.
- **Positive and negative test scenarios** to validate functionality and error handling.
- **Cross-browser testing** on Chrome, Firefox, and Edge.
- **Automatic screenshot capture** on test failure.

This project is CV-ready and highlights **QA mindset, automation skills, and real-world e-commerce testing**.

---

## Demo Website

The tests are executed against the **Automation Exercise** demo site:

[https://automationexercise.com/test_cases](https://automationexercise.com/test_cases)

---

## Tech Stack

- **Language:** JavaScript (ES6)  
- **Framework:** [Playwright](https://playwright.dev/)  
- **Test Runner:** Playwright Test  
- **Design Pattern:** Page Object Model (POM)  
- **Extras:** Screenshot capture on test failure  

---

## Project Structure
automationexercise-playwright/
│
├── tests/ # Test scripts organized by feature
│ ├── auth/ # Registration & login tests
│ ├── products/ # Product listing & search tests
│ ├── cart/ # Cart validation & add-to-cart tests
│ ├── checkout/ # Checkout tests
│ └── negative/ # Negative scenarios
│
├── pages/ # Page Object classes
│ ├── HomePage.js
│ ├── LoginPage.js
│ ├── RegisterPage.js
│ ├── ProductsPage.js
│ ├── CartPage.js
│ └── CheckoutPage.js
│
├── utils/ # Reusable helpers and test data
│ ├── testData.js
│ └── helpers.js
│
├── playwright.config.js # Playwright configuration
├── package.json # Project dependencies
└── README.md


---

## Features Tested

- User Registration (Valid Data)  
- User Login (Correct & Incorrect Credentials)  
- View Product List & Search Products  
- Add Products to Cart & Cart Validation  
- Checkout & Checkout with Empty Cart (Error validation)  
- Screenshot capture on test failure for QA evidence  

---

### Screenshot Capture

All failed tests automatically capture screenshots and save them in the `test-results/` folder.  
This feature helps with **debugging issues quickly** and provides **QA evidence** for test failures.




