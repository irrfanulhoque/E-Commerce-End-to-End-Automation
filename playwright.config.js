// @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  expect: {
    timeout: 5_000
  },
  retries: process.env.CI ? 2 : 0,
  reporter: [['html', { open: 'never' }]],
  fullyParallel: true,
  workers: process.env.CI ? 2 : undefined,
  use: {
    baseURL: 'https://automationexercise.com',
    actionTimeout: 15_000,
    navigationTimeout: 20_000,
    ignoreHTTPSErrors: true,
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
    video: 'retain-on-failure',
    viewport: { width: 1280, height: 720 }
  },
  projects: [
    { name: 'Chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'Firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'WebKit', use: { ...devices['Desktop Safari'] } }
  ]
});

