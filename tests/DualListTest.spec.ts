import { Page, Browser } from "playwright-core";
import{test, expect, request} from "@playwright/test"
import { DualListPage } from "../pageObjectsTS/DualListPage.spec";


test("Download Verification", async function ({ browser }: { browser: Browser }) {
        const context = await browser.newContext();
        const page: Page = await context.newPage();

        const dualListPage = new DualListPage(page);
        await dualListPage.goTo();

        await dualListPage.selectItemOnLeftSide(2);

        await page.waitForTimeout(5000);

        

})



