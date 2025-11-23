import { test as baseTest, Page } from "@playwright/test";
import { chromium } from "playwright";
import path from "path";

// LambdaTest capabilities
const capabilities = {
 browserName: "Chrome", // Browsers allowed: `Chrome`, `MicrosoftEdge`, `pw-chromium`, `pw-firefox` and `pw-webkit`
 browserVersion: "latest",
 "LT:Options": {
   platform: "Windows 10",
   build: "Playwright TS Build",
   name: "Playwright Test",
   user: "swathig12025",
   accessKey: "LT_k731CbMGDGpfRvXpmv1rlwL5Jrtn9LKw3V2VkitL6GPuBGp",
   network: true,
   video: true,
   console: true,
   tunnel: false, // Add tunnel configuration if testing locally hosted webpage
   tunnelName: "", // Optional
   geoLocation: '', // country code can be fetched from https://www.lambdatest.com/capabilities-generator/
 },
};

// Patching the capabilities dynamically according to the project name.
const modifyCapabilities = (configName, testName) => {
  let config = configName.split("@lambdatest")[0];
  let [browserName, browserVersion, platform] = config.split(":");
  capabilities.browserName = browserName
    ? browserName
    : capabilities.browserName;
  capabilities.browserVersion = browserVersion
    ? browserVersion
    : capabilities.browserVersion;
  capabilities["LT:Options"]["platform"] = platform
    ? platform
    : capabilities["LT:Options"]["platform"];
  capabilities["LT:Options"]["name"] = testName;
};

const getErrorMessage = (obj, keys) =>
  keys.reduce(
    (obj, keys) => (typeof obj == "object" ? obj[key] : undefined),
    obj
  );




const test = baseTest.extend<{page: Page}>({
    page:async({}, use, testInfo) => {
      let fileName = testInfo.file.split(path.sep).pop();
    if (testInfo.project.name.match(/lambdatest/)) {
      modifyCapabilities(
        testInfo.project.name,
        `${testInfo.title} - ${fileName}`
      );
       const browser = await chromium.connect(`wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(
         JSON.stringify(capabilities))}`);

        const context = await browser.newContext(testInfo.project.use);
        const ltpage = await context.newPage();
        await use(ltpage);

        const testStatus = {
        action: "setTestStatus",
        arguments: {
          status: testInfo.status,
          remark: testInfo.error?.stack || testInfo.error?.message,
        },
        };
        await ltpage.evaluate(() => {},
        `lambdatest_action: ${JSON.stringify(testStatus)}`);
        
        await ltpage.close();
        await context.close();
        await browser.close();
    }
    else{
        const browser = await chromium.launch();
        const context = await browser.newContext();
        const page   = await context.newPage();
        await use(page);
    }

    }
})

export { test };
export const expect = test.expect;