// Write invalidLogin.spec.js.

// Requirements:
// - Attempt login with invalid credentials
// - Assert error message is displayed
// - Use LoginPage
// - Keep test readable and clean
// - Negative test mindset

import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage.js';
import { LoginPage } from '../../pages/LoginPage.js';
import { takeScreenshotOnFailure } from '../../utils/helpers.js';
import { testData } from '../../utils/testData.js';

test.describe('Negative Login', () => {
  test.afterEach(async ({ page }, testInfo) => {
    await takeScreenshotOnFailure(page, testInfo, 'invalid-login');
  });

  test('should show error for invalid credentials', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);

    await homePage.gotoHome();
    await homePage.openSignupLogin();
    await loginPage.login(testData.invalidUser.email, testData.invalidUser.password);

    await expect(loginPage.getErrorAlert()).toHaveText(/your email or password is incorrect/i);
  });
});
