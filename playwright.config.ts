import {defineConfig, devices} from '@playwright/test';

// Playwright configuration specifying the directory for e2e tests and
// setting a base URL for convenience when launching pages.
export default defineConfig({
  testDir: './e2e',
  use: {
    baseURL: 'http://localhost:3000'
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    }
  ]
});