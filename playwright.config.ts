import type { PlaywrightTestConfig } from "@playwright/test";
import { defineConfig, devices } from "@playwright/test";

// LambdaTest capabilities
// const capabilities = {
//   browserName: "chrome", // Browsers allowed: `Chrome`, `MicrosoftEdge`, `pw-chromium`, `pw-firefox` and `pw-webkit`
//   browserVersion: "latest",
//   "LT:Options": {
//     platform: "Windows 10",
//     build: "Playwright TS Build",
//     name: "Playwright Test from config",
//     user: "swathig12025",
//     accessKey: "LT_k731CbMGDGpfRvXpmv1rlwL5Jrtn9LKw3V2VkitL6GPuBGp",
//     network: true,
//     video: true,
//     console: true,
//     tunnel: false, // Add tunnel configuration if testing locally hosted webpage
//     tunnelName: "", // Optional
//     geoLocation: '', // country code can be fetched from https://www.lambdatest.com/capabilities-generator/
//   },
// };

const config : PlaywrightTestConfig = {

// projects:[
//     // {
//     //   name: "chrome:latest:MacOS Ventura@lambdatest",
//     //   use: {
//     //     viewport: { width: 1920, height: 1080 },
//     //   },
//     // },
//     // {
//     //   name: "chrome:latest:Windows 11@lambdatest",
//     //   use: {
//     //     viewport: { width: 1280, height: 720 },
//     //   },
//     // }
//     // {
//     //     name:"chrome",
//     //     use:{
//     //         ...devices["Desktop Chrome"]
//     //     }
//     // },
//     // {
//     //     name:"firefox",
//     //     use:{
//     //         ...devices["Desktop Firefox"]
//     //     }
//     // }
// ],
testDir: './SaksTests',
//testMatch:["SaksTests/SaksDesignerBrandListTests.spec.ts"],
testMatch:["SaksTests/SaksProductDisplayTests.spec.ts"],


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