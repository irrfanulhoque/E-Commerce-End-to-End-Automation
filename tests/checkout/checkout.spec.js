import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage.js';
import { LoginPage } from '../../pages/LoginPage.js';
import { ProductsPage } from '../../pages/ProductsPage.js';
import { CartPage } from '../../pages/CartPage.js';
import { CheckoutPage } from '../../pages/CheckoutPage.js';
import { takeScreenshotOnFailure } from '../../utils/helpers.js';
import { testData } from '../../utils/testData.js';

test.describe('Checkout Flow', () => {
  test.afterEach(async ({ page }, testInfo) => {
    await takeScreenshotOnFailure(page, testInfo, 'checkout');
  });

  test('should complete checkout successfully', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const productName = testData.products.productName;

    await homePage.gotoHome();
    await homePage.openSignupLogin();
    await loginPage.login(testData.existingUser.email, testData.existingUser.password);
    await homePage.openProducts();
    await productsPage.waitForProductsToLoad();
    await productsPage.addProductToCart(productName);
    await productsPage.goToCartFromModal();
    await cartPage.waitForCartToLoad();
    await cartPage.proceedToCheckout();

    await expect(checkoutPage.getAddressDetails()).toBeVisible();
    await expect(checkoutPage.getOrderReviewTable()).toBeVisible();

    await checkoutPage.addOrderComment('Order placed via Playwright E2E test.');
    await checkoutPage.placeOrder();
    await checkoutPage.enterPaymentDetails(testData.payment);
    await checkoutPage.confirmPayment();

    await expect(checkoutPage.getOrderPlacedHeading()).toHaveText(/order placed/i);
    await expect(checkoutPage.getOrderSuccessAlert()).toContainText(/your order has been placed successfully/i);
  });
});
