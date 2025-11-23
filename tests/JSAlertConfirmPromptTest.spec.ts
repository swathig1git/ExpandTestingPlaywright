import { Page, Browser, chromium } from "playwright-core";
import { JSAlertConfirmPromptPage } from "../pageObjectsTS/JSAlertConfirmPromptPage.spec";
import {test, expect} from "../base/pomfixtures.spec"



test.use({
        browserName: "firefox"
        })

test.describe("Cross Browser Testing LAmbda Cloud", async()=> {

test("JS All Alert Test", async function ({page}) {


        const jsAlertConfirmPromptPage = new JSAlertConfirmPromptPage(page);
        await jsAlertConfirmPromptPage.goTo();

        page.on("dialog", async(dialog) => {
                console.log("Alert Message: ", dialog.message());
                await dialog.accept(); 
        });

        await jsAlertConfirmPromptPage.alertButton.click();
        await jsAlertConfirmPromptPage.confirmButton.click();
        await jsAlertConfirmPromptPage.promptButton.click();

        //await expect(await jsAlertConfirmPromptPage.getDialogResponse()).toBe("OK")




})

test("JS Alert Test", async function ({ page }) {

        const jsAlertConfirmPromptPage = new JSAlertConfirmPromptPage(page);
        await jsAlertConfirmPromptPage.goTo();



        await jsAlertConfirmPromptPage.alertButton.click();

        await expect(await jsAlertConfirmPromptPage.getDialogResponse()).toBe("OK")

        await jsAlertConfirmPromptPage.alertButton.click();
        await jsAlertConfirmPromptPage.alertButton.click();
        await jsAlertConfirmPromptPage.alertButton.click();




})

test("JS Confirm Dismiss Test", async function ({ page }) {

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

test("JS Confirm Accept Test", async function ({ page }) {

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

test("JS Prompt Test", async function ({ page }) {


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

})
