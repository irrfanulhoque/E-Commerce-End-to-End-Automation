# AI Coding Guidelines for E-Commerce Playwright Automation

## Project Overview
This is an end-to-end automation project using Playwright (JavaScript) for testing e-commerce applications. The project focuses on browser-based testing across multiple engines (Chromium, Firefox, WebKit).

## Architecture
- **Test Framework**: Playwright Test with parallel execution enabled
- **Test Directory**: `tests/` - all test files use `.spec.js` extension
- **Configuration**: `playwright.config.js` defines browser projects and test settings
- **No Base URL**: Tests navigate to full URLs (e.g., `await page.goto('https://example.com')`)

## Key Files
- `playwright.config.js`: Test configuration with browser projects and CI settings
- `tests/example.spec.js`: Basic test example showing navigation and assertions
- `package.json`: Minimal setup with Playwright as dev dependency

## Testing Workflow
- **Run all tests**: `npx playwright test`
- **Run specific test**: `npx playwright test tests/example.spec.js`
- **Run with UI mode**: `npx playwright test --ui`
- **Generate report**: `npx playwright show-report` (after test run)
- **Debug tests**: Use `await page.pause()` in test code for interactive debugging

## Code Patterns
- Use `test.describe()` to group related tests (e.g., by feature or page)
- Prefer semantic locators: `page.getByRole()`, `page.getByLabel()`, `page.getByText()`
- Assertions: Use `expect().toBeVisible()`, `expect().toHaveTitle()` etc.
- Example from codebase:
  ```javascript
  test('has title', async ({ page }) => {
    await page.goto('https://playwright.dev/');
    await expect(page).toHaveTitle(/Playwright/);
  });
  ```

## Dependencies
- `@playwright/test`: Core testing framework
- `@types/node`: TypeScript types (though project uses JS)

## Development Notes
- No custom npm scripts defined - use `npx` commands directly
- CI configuration: Retries enabled, parallel workers disabled on CI
- Traces collected on first retry for debugging failures
- HTML reporter used for test results

## E-Commerce Specific Guidance
When adding e-commerce tests:
- Test user journeys: login → browse → add to cart → checkout
- Handle dynamic content: wait for elements, use stable selectors
- Test across devices: uncomment mobile projects in config if needed
- Mock external services if testing isolated components</content>
<parameter name="filePath">d:/Study Materials/Project/E-Commerce End-to-End Automation using Playwright (JS)/.github/copilot-instructions.md