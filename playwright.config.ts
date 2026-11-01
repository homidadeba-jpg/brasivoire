import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  workers: 1,
  timeout: 90000,
  reporter: 'list',
  use: { baseURL: 'http://127.0.0.1:4178', headless: true, channel: 'chrome' },
  webServer: { command: 'npm run preview -- --port 4178 --strictPort', url: 'http://127.0.0.1:4178', reuseExistingServer: true },
});
