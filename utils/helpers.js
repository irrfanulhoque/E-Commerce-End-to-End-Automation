export const takeScreenshotOnFailure = async (page, testInfo, label = 'failure') => {
  if (testInfo.status !== testInfo.expectedStatus) {
    const screenshot = await page.screenshot({ fullPage: true });
    await testInfo.attach(`screenshot-${label}`, {
      body: screenshot,
      contentType: 'image/png'
    });
  }
};

export const waitForNetworkIdle = async (page) => {
  await page.waitForLoadState('load');
  await page.waitForLoadState('networkidle');
};