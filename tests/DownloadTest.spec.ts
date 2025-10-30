import { Page, Browser } from "playwright-core";
import{test, expect, request} from "@playwright/test"
import { DownloadPage } from "../pageObjectsTS/DownloadPage.spec";
import moment from "moment";

test("Download Verification", async function ({ browser }: { browser: Browser }) {
        const context = await browser.newContext();
        const page: Page = await context.newPage();

        const downloadPage = new DownloadPage(page);
        await downloadPage.goTo();

        const downLoad = await Promise.all([
                page.waitForEvent('download'),
                downloadPage.downLoadFile()
        ])

        const fileName = await downLoad[0].suggestedFilename();
        await downLoad[0].saveAs(fileName);
        

})



