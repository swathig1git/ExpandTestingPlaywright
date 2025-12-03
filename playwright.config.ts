import type { PlaywrightTestConfig } from "@playwright/test";
import { defineConfig, devices } from "@playwright/test";

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
//testMatch:["SaksTests/*.spec.ts"],
testMatch:["SaksTests/*.spec.ts"],


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