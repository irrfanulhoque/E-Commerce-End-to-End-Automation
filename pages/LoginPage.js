// Create LoginPage.js using Page Object Model.

// Requirements:
// - Locators for login email, password, login button, error message, logout link
// - Methods for:
//   - Navigate to login page
//   - Login with credentials
// - No test logic or assertions
// - Use baseURL navigation pattern
// - Keep methods reusable and clean

// Follow Playwright + JS best practices.

export class LoginPage {
  constructor(page) {
    this.page = page;
    this.newUserNameInput = page.locator('input[data-qa="signup-name"]');
    this.newUserEmailInput = page.locator('input[data-qa="signup-email"]');
    this.signupButton = page.getByRole('button', { name: /signup/i });

    this.loginEmailInput = page.locator('input[data-qa="login-email"]');
    this.loginPasswordInput = page.locator('input[data-qa="login-password"]');
    this.loginButton = page.getByRole('button', { name: /login/i });
    this.errorAlert = page.locator('.login-form p');
  }

  async initiateRegistration(name, email) {
    await this.newUserNameInput.fill(name);
    await this.newUserEmailInput.fill(email);
    await this.signupButton.click();
  }

  async login(email, password) {
    await this.loginEmailInput.fill(email);
    await this.loginPasswordInput.fill(password);
    await this.loginButton.click();
  }

  getErrorAlert() {
    return this.errorAlert;
  }
}
