// You are creating a Page Object class for HomePage.js.

// Requirements:
// - Use constructor with Playwright page
// - Add locators for:
//   - Login/Signup link
//   - Products link
//   - Cart link
// - Add navigation methods only
// - Do NOT add assertions
// - Follow Page Object Model strictly
// - Use clean, readable locators

// This file must be reusable across multiple test cases.

export class HomePage {
  constructor(page) {
    this.page = page;
    this.signupLoginLink = page.getByRole('link', { name: /signup \/ login/i });
    this.productsLink = page.getByRole('link', { name: /products/i });
    this.cartLink = page.getByRole('link', { name: /cart/i });
    this.logoutLink = page.getByRole('link', { name: /logout/i });
    this.loggedInBanner = page.getByText(/logged in as/i);
    this.homeSlider = page.locator('#slider');
  }

  async gotoHome() {
    await this.page.goto('/');
  }

  async openSignupLogin() {
    await this.signupLoginLink.click();
  }

  async openProducts() {
    await this.productsLink.click();
  }

  async openCart() {
    await this.cartLink.click();
  }

  async logout() {
    await this.logoutLink.click();
  }

  getLoggedInBanner() {
    return this.loggedInBanner;
  }

  getHomeSlider() {
    return this.homeSlider;
  }
}
