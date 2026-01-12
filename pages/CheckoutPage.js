// Create CheckoutPage.js using Page Object Model.

// Requirements:
// - Locators for checkout button
// - Locators for address details
// - Locators for payment fields
// - Method to place an order
// - Method to verify order confirmation
// - No assertions or test logic
// - Follow real-world checkout flow

export class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.addressDetails = page.locator('#address_delivery');
    this.orderReviewTable = page.locator('.checkout-information');
    this.commentTextArea = page.locator('textarea[name="message"]');
    this.placeOrderButton = page.getByRole('link', { name: /place order/i });
    this.nameOnCardInput = page.locator('input[name="name_on_card"]');
    this.cardNumberInput = page.locator('input[name="card_number"]');
    this.cvcInput = page.locator('input[name="cvc"]');
    this.expiryMonthInput = page.locator('input[name="expiry_month"]');
    this.expiryYearInput = page.locator('input[name="expiry_year"]');
    this.payAndConfirmButton = page.getByRole('button', { name: /pay and confirm order/i });
    this.orderPlacedHeading = page.locator('h2[data-qa="order-placed"]');
    this.orderSuccessAlert = page.locator('.alert-success');
  }

  async addOrderComment(comment) {
    await this.commentTextArea.fill(comment);
  }

  async placeOrder() {
    await this.placeOrderButton.click();
  }

  async enterPaymentDetails(paymentData) {
    await this.nameOnCardInput.fill(paymentData.nameOnCard);
    await this.cardNumberInput.fill(paymentData.cardNumber);
    await this.cvcInput.fill(paymentData.cvc);
    await this.expiryMonthInput.fill(paymentData.expiryMonth);
    await this.expiryYearInput.fill(paymentData.expiryYear);
  }

  async confirmPayment() {
    await this.payAndConfirmButton.click();
  }

  getOrderPlacedHeading() {
    return this.orderPlacedHeading;
  }

  getOrderSuccessAlert() {
    return this.orderSuccessAlert;
  }

  getAddressDetails() {
    return this.addressDetails;
  }

  getOrderReviewTable() {
    return this.orderReviewTable;
  }
}
