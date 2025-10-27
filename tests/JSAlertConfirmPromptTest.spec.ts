import { Page, Browser } from "playwright-core";
import{test, expect, request} from "@playwright/test"
import { JSAlertConfirmPromptPage } from "../pageObjectsTS/JSAlertConfirmPromptPage.spec";

test("Drag and Drop Circles Verification", async function ({ browser }: { browser: Browser }) {
        const context = await browser.newContext();
        const page: Page = await context.newPage();

        const jsAlertConfirmPromptPage = new JSAlertConfirmPromptPage(page);
        await jsAlertConfirmPromptPage.goTo();

        page.once("dialog", async(dialog) => {
                console.log("Alert Message: ", dialog.message());
                expect (dialog.message()).toContain("I am a Js Alert");
                await dialog.accept(); 
        });

        await jsAlertConfirmPromptPage.alertButton.click();

        await expect(await jsAlertConfirmPromptPage.getDialogResponse()).toBe("OK")




})



