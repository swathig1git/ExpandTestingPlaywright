import type { PlaywrightTestConfig } from "@playwright/test";
import { defineConfig } from "@playwright/test";

const config : PlaywrightTestConfig = {
testMatch:["tests/JSAlertConfirmPromptTest.spec.ts"],
use: {
    browserName:"chromium",
    headless: false,
    screenshot: "on",
    video: "off",
    baseURL:"https://ecommerce-playground.lambdatest.io/",
    trace:"off"
},
retries: 0,
reporter:[ ["json", {
    outputFile: "jsonReports/jsonReport.json"
}], ["html", {
    open: "on-failure"
}]]
}

export default config;