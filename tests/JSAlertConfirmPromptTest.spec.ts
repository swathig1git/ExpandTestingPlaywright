import { Page, Browser } from "playwright-core";
import{test, expect, request} from "@playwright/test"
import { JSAlertConfirmPromptPage } from "../pageObjectsTS/JSAlertConfirmPromptPage.spec";

test("JS Alert Test", async function ({ browser }: { browser: Browser }) {
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

test("JS Confirm Dismiss Test", async function ({ browser }: { browser: Browser }) {
        const context = await browser.newContext();
        const page: Page = await context.newPage();

        const jsAlertConfirmPromptPage = new JSAlertConfirmPromptPage(page);
        await jsAlertConfirmPromptPage.goTo();

        page.once("dialog", async(dialog) => {
                console.log("Confirm Message: ", dialog.message());
                expect (dialog.message()).toContain("I am a Js Confirm");
                await dialog.dismiss(); 
        });

        await jsAlertConfirmPromptPage.confirmButton.click();

        await expect(await jsAlertConfirmPromptPage.getDialogResponse()).toBe("Cancel")


})

test("JS Confirm Accept Test", async function ({ browser }: { browser: Browser }) {
        const context = await browser.newContext();
        const page: Page = await context.newPage();

        const jsAlertConfirmPromptPage = new JSAlertConfirmPromptPage(page);
        await jsAlertConfirmPromptPage.goTo();

        page.once("dialog", async(dialog) => {
                console.log("Confirm Message: ", dialog.message());
                expect (dialog.message()).toContain("I am a Js Confirm");
                await dialog.accept(); 
        });

        await jsAlertConfirmPromptPage.confirmButton.click();

        await expect(await jsAlertConfirmPromptPage.getDialogResponse()).toBe("Ok")


})

test("JS Prompt Test", async function ({ browser }: { browser: Browser }) {
        const context = await browser.newContext();
        const page: Page = await context.newPage();

        const jsAlertConfirmPromptPage = new JSAlertConfirmPromptPage(page);
        await jsAlertConfirmPromptPage.goTo();

        //listen to the event
        page.once("dialog", async(dialog) => {
                console.log("Prompt Message: ", dialog.message());
                expect (dialog.message()).toContain("I am a Js prompt");
                await dialog.accept("My Message"); 
        });

        await jsAlertConfirmPromptPage.promptButton.click();

        await expect(await jsAlertConfirmPromptPage.getDialogResponse()).toBe("My Message");


})


