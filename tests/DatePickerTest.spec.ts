import { Page, Browser, chromium } from "playwright-core";
import{test, expect, request} from "@playwright/test"
import { DatePickerPage } from "../pageObjectsTS/DatePickerPage.spec";
import moment from "moment";

// LambdaTest capabilities
const capabilities = {
  browserName: "Chrome", // Browsers allowed: `Chrome`, `MicrosoftEdge`, `pw-chromium`, `pw-firefox` and `pw-webkit`
  browserVersion: "latest",
  "LT:Options": {
    platform: "Windows 10",
    build: "Playwright Test Build",
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

test("Date Picker Verification", async function () {
        const browser = await chromium.connect({
        wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(
          JSON.stringify(capabilities)
        )}`,
      });

        const context = await browser.newContext();
        const page: Page = await context.newPage();

        const monthAndYear: string = "March 2026";
        let dayOfTheMonth: string = "12";

        const datePickerPage = new DatePickerPage(page);
        await datePickerPage.goTo();

        await datePickerPage.clickStartDate();
        await datePickerPage.selectMonthAndYear(monthAndYear);
        await datePickerPage.selectDayOfTheMonth(dayOfTheMonth);

        let constructedDate:string = moment(`${dayOfTheMonth} ${monthAndYear}`, "D MMMM YYYY").format("DD/MM/YYYY");
        let dateFromTextBox:string = await datePickerPage.getCompleteDate();
        await expect (dateFromTextBox).toBe(constructedDate);

        dayOfTheMonth = "15";
        await datePickerPage.selectDayOfTheMonth(dayOfTheMonth);
        constructedDate = moment(`${dayOfTheMonth} ${monthAndYear}`, "D MMMM YYYY").format("DD/MM/YYYY");
        dateFromTextBox = await datePickerPage.getCompleteDate();

        console.log("dateFromTextBox: ", dateFromTextBox, " constructedDate: ", constructedDate);
        await expect (dateFromTextBox).not.toBe(constructedDate);

        


        await page.waitForTimeout(3000);
})



