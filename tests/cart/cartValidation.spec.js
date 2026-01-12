import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage.js';
import { ProductsPage } from '../../pages/ProductsPage.js';
import { CartPage } from '../../pages/CartPage.js';
import { takeScreenshotOnFailure } from '../../utils/helpers.js';
import { testData } from '../../utils/testData.js';

test.describe('Cart Validation', () => {
  test.afterEach(async ({ page }, testInfo) => {
    await takeScreenshotOnFailure(page, testInfo, 'cart-validation');
  });

  test('should validate product price and quantity', async ({ page }) => {
    const homePage = new HomePage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const productName = testData.products.productName;

    await homePage.gotoHome();
    await homePage.openProducts();
    await productsPage.waitForProductsToLoad();
    await productsPage.addProductToCart(productName);
    await productsPage.continueShopping();
    await productsPage.addProductToCart(productName);
    await productsPage.goToCartFromModal();
    await cartPage.waitForCartToLoad();

    await expect(cartPage.getCartQuantityLocator(productName)).toHaveText('2');
    await expect(cartPage.getCartPriceLocator(productName)).toContainText('Rs.');
  });
});