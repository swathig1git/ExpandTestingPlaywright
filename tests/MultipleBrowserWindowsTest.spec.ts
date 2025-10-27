import { Page, Browser } from "playwright-core";
import{test, expect, request} from "@playwright/test"
import { MultipleBrowserWindowsPage } from "../pageObjectsTS/MultipleBrowserWindowsPage.spec";

test("Multiple Window Test", async function ({ browser }: { browser: Browser }) {
        const context = await browser.newContext();
        const page: Page = await context.newPage();

        const multipleBrowserWindowsPage = new MultipleBrowserWindowsPage(page);
        await multipleBrowserWindowsPage.goTo();

        const [newPage] = await Promise.all([
                context.waitForEvent("page"),
                multipleBrowserWindowsPage.openAnotherWindow()
        ]);

        await newPage.waitForLoadState();

        const newPageText = await newPage.locator("h1").textContent();
        await expect (newPageText).toContain("Example of a new window page for Automation Testing Practice");

})
