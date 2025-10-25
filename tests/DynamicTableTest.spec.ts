import { Page, Browser } from "playwright-core";
import{test, expect, request} from "@playwright/test"
import { DynamicTablePage } from "../pageObjectsTS/DynamicTablePage.spec";

test("Dynamic Table Verification", async function ({ browser }: { browser: Browser }) {
        const context = await browser.newContext();
        const page: Page = await context.newPage();

        const dynamicTablePage = new DynamicTablePage(page);
        await dynamicTablePage.goTo();

        let cpuUsageFromTable:string = await dynamicTablePage.getCPUUsagefromTable("Chrome") ?? "";

        let chromeCPUUsage:string = await dynamicTablePage.getChromeCPUUsage();
        await expect (cpuUsageFromTable).toBe(chromeCPUUsage);


})



