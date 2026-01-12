// Create ProductsPage.js for product-related actions.

// Requirements:
// - Locators for product list
// - Locator for search input and search button
// - Locator for add-to-cart button
// - Methods to:
//   - View product list
//   - Search product
//   - Add product to cart
// - No assertions
// - Reusable and readable code

export class ProductsPage {
  constructor(page) {
    this.page = page;
    this.allProductsHeader = page.getByRole('heading', { name: /all products/i });
    this.searchInput = page.locator('#search_product');
    this.searchButton = page.locator('#submit_search');
    this.productCards = page.locator('.features_items .col-sm-4');
    this.viewProductLinks = page.getByRole('link', { name: /view product/i });
    this.searchResultHeading = page.getByRole('heading', { name: /searched products/i });
    this.modal = page.locator('#cartModal');
    this.continueShoppingButton = page.getByRole('button', { name: /continue shopping/i });
    this.viewCartButton = page.getByRole('link', { name: /view cart/i });
  }

  productCardByName(productName) {
    return this.productCards.filter({
      has: this.page.locator('.single-products > .productinfo p', { hasText: productName })
    });
  }

  async waitForProductsToLoad() {
    await this.productCards.first().waitFor({ state: 'visible' });
  }

  async searchProduct(keyword) {
    await this.searchInput.fill(keyword);
    await this.searchButton.click();
  }

  async addProductToCart(product) {
    const targetCard = typeof product === 'number'
      ? this.productCards.nth(product)
      : this.productCardByName(product).first();

    const cardContainer = targetCard.locator('.single-products');
    await cardContainer.scrollIntoViewIfNeeded();

    const inlineButton = cardContainer
      .locator('> .productinfo')
      .getByRole('link', { name: /add to cart/i })
      .first();

    try {
      if (!(await inlineButton.isVisible())) {
        throw new Error('Inline button hidden');
      }
      await inlineButton.click();
    } catch {
      const overlayButton = cardContainer
        .locator('.product-overlay')
        .getByRole('link', { name: /add to cart/i })
        .first();

      await cardContainer.hover();
      await overlayButton.waitFor({ state: 'visible' });
      await overlayButton.click();
    }

    await this.modal.waitFor({ state: 'visible' });
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
    await this.modal.waitFor({ state: 'hidden' });
  }

  async goToCartFromModal() {
    await Promise.all([
      this.page.waitForURL(/\/view_cart/i),
      this.viewCartButton.click()
    ]);
  }

  getAllProductsHeader() {
    return this.allProductsHeader;
  }

  getSearchResultHeading() {
    return this.searchResultHeading;
  }

  getProductCards() {
    return this.productCards;
  }
}
