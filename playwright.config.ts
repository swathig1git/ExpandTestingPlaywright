import type { PlaywrightTestConfig } from "@playwright/test";
import { defineConfig } from "@playwright/test";

const config : PlaywrightTestConfig = {
testMatch:["tests/EcommerceHomeTest.spec.ts"],
use: {
    headless: false,
    screenshot: "on",
    video: "retain-on-failure",
    baseURL:"https://ecommerce-playground.lambdatest.io/"
},
retries: 1,
reporter:[["dot"], ["json", {
    outputFile: "jsonReports/jsonReport.json"
}], ["html", {
    open: "on-failure"
}]]
}

export default config;