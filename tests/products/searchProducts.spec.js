import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage.js';
import { ProductsPage } from '../../pages/ProductsPage.js';
import { takeScreenshotOnFailure } from '../../utils/helpers.js';
import { testData } from '../../utils/testData.js';

test.describe('Product Search', () => {
  test.afterEach(async ({ page }, testInfo) => {
    await takeScreenshotOnFailure(page, testInfo, 'search-products');
  });

  test('should return results for a valid search term', async ({ page }) => {
    const homePage = new HomePage(page);
    const productsPage = new ProductsPage(page);

    await homePage.gotoHome();
    await homePage.openProducts();
    await productsPage.waitForProductsToLoad();
    await productsPage.searchProduct(testData.products.searchKeyword);

    const resultNames = await productsPage.getProductCards().allTextContents();

    await expect(productsPage.getSearchResultHeading()).toBeVisible();
    expect(resultNames.length).toBeGreaterThan(0);
    expect(resultNames.join(' ').toLowerCase()).toContain(testData.products.searchKeyword.toLowerCase());
  });
});