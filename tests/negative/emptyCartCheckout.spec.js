// Write emptyCartCheckout.spec.js.

// Requirements:
// - Attempt checkout with empty cart
// - Assert proper error or restriction message
// - Negative scenario
import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage.js';
import { CartPage } from '../../pages/CartPage.js';
import { takeScreenshotOnFailure } from '../../utils/helpers.js';

test.describe('Negative Checkout - Empty Cart', () => {
  test.afterEach(async ({ page }, testInfo) => {
    await takeScreenshotOnFailure(page, testInfo, 'empty-cart-checkout');
  });

  test('should block checkout when cart is empty', async ({ page }) => {
    const homePage = new HomePage(page);
    const cartPage = new CartPage(page);

    await homePage.gotoHome();
    await homePage.openCart();
    await cartPage.waitForCartToLoad();

    await expect(cartPage.getEmptyCartMessage()).toBeVisible();
    await expect(cartPage.getCheckoutButton()).toBeHidden();
  });
});