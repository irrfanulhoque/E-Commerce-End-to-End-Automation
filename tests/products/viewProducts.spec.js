import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage.js';
import { ProductsPage } from '../../pages/ProductsPage.js';
import { takeScreenshotOnFailure } from '../../utils/helpers.js';

test.describe('Product Catalog', () => {
  test.afterEach(async ({ page }, testInfo) => {
    await takeScreenshotOnFailure(page, testInfo, 'view-products');
  });

  test('should display product list', async ({ page }) => {
    const homePage = new HomePage(page);
    const productsPage = new ProductsPage(page);

    await homePage.gotoHome();
    await homePage.openProducts();
    await productsPage.waitForProductsToLoad();

    const totalProducts = await productsPage.getProductCards().count();

    await expect(productsPage.getAllProductsHeader()).toBeVisible();
    await expect(productsPage.getProductCards().first()).toBeVisible();
    expect(totalProducts).toBeGreaterThan(0);
  });
});
