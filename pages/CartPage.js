export class CartPage {
  constructor(page) {
    this.page = page;
    this.cartTable = page.locator('#cart_info_table');
    this.cartRows = page.locator('#cart_info_table tbody tr');
    this.checkoutButton = page.getByRole('link', { name: /proceed to checkout/i });
    this.emptyCartMessage = page.getByText(/cart is empty/i);
  }

  async waitForCartToLoad() {
    await this.cartTable.waitFor({ state: 'visible' });
  }

  async proceedToCheckout() {
    await Promise.all([
      this.page.waitForURL(/\/(login|checkout)/i),
      this.checkoutButton.click()
    ]);
  }

  cartRow(productName) {
    return this.cartRows.filter({ hasText: productName });
  }

  getCartQuantityLocator(productName) {
    return this.cartRow(productName).locator('.cart_quantity button');
  }

  getCartPriceLocator(productName) {
    return this.cartRow(productName).locator('.cart_price p');
  }

  getEmptyCartMessage() {
    return this.emptyCartMessage;
  }

  getCheckoutButton() {
    return this.checkoutButton;
  }
}
