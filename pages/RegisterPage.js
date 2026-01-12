// Create RegisterPage.js using Page Object Model.

// Requirements:
// - Locators for signup name, email, signup button
// - Locators for registration form fields
// - Method to register a new user with valid data
// - Support random email input
// - No assertions or test logic
// - Follow clean POM structure

export class RegisterPage {
  constructor(page) {
    this.page = page;
    this.genderMrRadio = page.locator('#id_gender1');
    this.passwordInput = page.locator('#password');
    this.daySelect = page.locator('#days');
    this.monthSelect = page.locator('#months');
    this.yearSelect = page.locator('#years');
    this.newsletterCheckbox = page.locator('#newsletter');
    this.offersCheckbox = page.locator('#optin');

    this.firstNameInput = page.locator('#first_name');
    this.lastNameInput = page.locator('#last_name');
    this.companyInput = page.locator('#company');
    this.address1Input = page.locator('#address1');
    this.countrySelect = page.locator('#country');
    this.stateInput = page.locator('#state');
    this.cityInput = page.locator('#city');
    this.zipCodeInput = page.locator('#zipcode');
    this.mobileNumberInput = page.locator('#mobile_number');

    this.createAccountButton = page.getByRole('button', { name: /create account/i });
    this.accountCreatedHeader = page.locator('h2[data-qa="account-created"]');
    this.continueButton = page.locator('a[data-qa="continue-button"]');
  }

  async completeAccountDetails(userData) {
    await this.genderMrRadio.check();
    await this.passwordInput.fill(userData.password);
    await this.daySelect.selectOption('1');
    await this.monthSelect.selectOption('5');
    await this.yearSelect.selectOption('1990');
    await this.newsletterCheckbox.check();
    await this.offersCheckbox.check();
  }

  async completeAddressDetails(userData) {
    await this.firstNameInput.fill(userData.firstName);
    await this.lastNameInput.fill(userData.lastName);
    await this.companyInput.fill('Automation Corp');
    await this.address1Input.fill(userData.address);
    await this.countrySelect.selectOption({ label: userData.country });
    await this.stateInput.fill(userData.state);
    await this.cityInput.fill(userData.city);
    await this.zipCodeInput.fill(userData.zipCode);
    await this.mobileNumberInput.fill(userData.mobileNumber);
  }

  async submitRegistration() {
    await this.createAccountButton.click();
  }

  async confirmAccountCreated() {
    await this.continueButton.click();
  }

  getAccountCreatedHeader() {
    return this.accountCreatedHeader;
  }
}
