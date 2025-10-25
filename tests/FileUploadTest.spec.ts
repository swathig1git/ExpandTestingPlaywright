import { Page, Browser } from "playwright-core";
import{test, expect, request} from "@playwright/test"
import { FileUploadPage } from "../pageObjectsTS/FileUploadPage";

test("File Upload Verification", async function ({ browser }: { browser: Browser }) {
        const context = await browser.newContext();
        const page: Page = await context.newPage();

        const fileUploadPage = new FileUploadPage(page);
        await fileUploadPage.goTo();

        await fileUploadPage.uploadFile();


})



