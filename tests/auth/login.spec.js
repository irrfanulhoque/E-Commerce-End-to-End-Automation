import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage.js';
import { LoginPage } from '../../pages/LoginPage.js';
import { RegisterPage } from '../../pages/RegisterPage.js';
import { takeScreenshotOnFailure } from '../../utils/helpers.js';
import { testData } from '../../utils/testData.js';

test.describe('User Login', () => {
  test.afterEach(async ({ page }, testInfo) => {
    await takeScreenshotOnFailure(page, testInfo, 'login');
  });

  test('should login with valid credentials', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const registerPage = new RegisterPage(page);
    const user = { ...testData.newUser, email: `qa.login+${Date.now()}@example.com` };

    await homePage.gotoHome();
    await homePage.openSignupLogin();
    await loginPage.initiateRegistration(user.name, user.email);
    await registerPage.completeAccountDetails(user);
    await registerPage.completeAddressDetails(user);
    await registerPage.submitRegistration();
    await registerPage.confirmAccountCreated();
    await homePage.logout();
    await homePage.openSignupLogin();
    await loginPage.login(user.email, user.password);

    await expect(homePage.getLoggedInBanner()).toBeVisible();
  });
});