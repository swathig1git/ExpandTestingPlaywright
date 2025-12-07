import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./SaksTests",
  testMatch: ["SaksTests/*.spec.ts"],
  fullyParallel: true,
  workers: 1, 

  use: {
    browserName: "chromium",
    headless: false,
    screenshot: "on",
    video: "off",
    baseURL: "https://ca.saks.com/en-ca/",
    trace: "off",
  },

  retries: 0,

  reporter: [
    [
      "html",
      {
        open: "on-failure",
      },
    ],
  ],
});
