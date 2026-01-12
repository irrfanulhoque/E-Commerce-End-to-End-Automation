import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage.js';
import { ProductsPage } from '../../pages/ProductsPage.js';
import { CartPage } from '../../pages/CartPage.js';
import { takeScreenshotOnFailure } from '../../utils/helpers.js';
import { testData } from '../../utils/testData.js';

test.describe('Cart - Add Product', () => {

  // Capture screenshot on failure
  test.afterEach(async ({ page }, testInfo) => {
    await takeScreenshotOnFailure(page, testInfo, 'add-to-cart');
  });

  test('should add a product to cart from catalog', async ({ page }) => {
    const homePage = new HomePage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const productName = testData.products.productName;

    // Navigate to home & open products page
    await homePage.gotoHome();
    await homePage.openProducts();

    // Wait for products to load
    await productsPage.waitForProductsToLoad();

    // Add product to cart using robust method
    await productsPage.addProductToCart(productName);

    // Optional: continue shopping if you want to add more items
    // await productsPage.continueShopping();

    // Go to cart from modal
    await productsPage.goToCartFromModal();

    // Wait for cart to be ready
    await cartPage.waitForCartToLoad();

    // Assert quantity = 1
    await expect(cartPage.getCartQuantityLocator(productName)).toHaveText('1');

    // Optionally assert price is displayed
    await expect(cartPage.getCartPriceLocator(productName)).toContainText('Rs.');
  });

  test('should add first two products to cart', async ({ page }) => {
    const homePage = new HomePage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);

    await homePage.gotoHome();
    await expect(homePage.getHomeSlider()).toBeVisible();

    await homePage.openProducts();
    await expect(productsPage.getAllProductsHeader()).toBeVisible();
    await productsPage.waitForProductsToLoad();

    await productsPage.addProductToCart(0);
    await productsPage.continueShopping();
    await productsPage.addProductToCart(1);
    await productsPage.goToCartFromModal();
    await cartPage.waitForCartToLoad();

    await expect(page).toHaveURL(/\/view_cart/);
  });
});
