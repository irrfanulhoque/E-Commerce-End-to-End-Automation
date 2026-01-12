import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage.js';
import { LoginPage } from '../../pages/LoginPage.js';
import { RegisterPage } from '../../pages/RegisterPage.js';
import { takeScreenshotOnFailure } from '../../utils/helpers.js';
import { testData } from '../../utils/testData.js';

test.describe('User Registration', () => {
  test.afterEach(async ({ page }, testInfo) => {
    await takeScreenshotOnFailure(page, testInfo, 'register');
  });

  test('should register a new user with valid data', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const registerPage = new RegisterPage(page);
    const uniqueEmail = `qa.portfolio+${Date.now()}@example.com`;
    const newUser = { ...testData.newUser, email: uniqueEmail };

    await homePage.gotoHome();
    await homePage.openSignupLogin();
    await loginPage.initiateRegistration(newUser.name, newUser.email);
    await registerPage.completeAccountDetails(newUser);
    await registerPage.completeAddressDetails(newUser);
    await registerPage.submitRegistration();

    await expect(registerPage.getAccountCreatedHeader()).toHaveText(/account created/i);
    await registerPage.confirmAccountCreated();
    await expect(homePage.getLoggedInBanner()).toHaveText(/qa portfolio user/i);
  });
});