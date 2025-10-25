import { Page, Browser } from "playwright-core";
import{test, expect, request} from "@playwright/test"
import { UserInputPage } from "../pageObjectsTS/UserInputPage.spec";

test("User Input Success", async function ({ browser }: { browser: Browser }) {
        const context = await browser.newContext();
        const page: Page = await context.newPage();

        let inputNumber: Number = 5;
        let inputText: string = "Swathi";
        let password: string = "SuperSecretPassword!";
        let  inputDate: string = "2025-10-24"

        const userInputPage = new UserInputPage(page);
        await userInputPage.goTo();
        
        await userInputPage.enterNumber(inputNumber);
        let stringNumber = await userInputPage.getNumber();
        await expect (stringNumber).toBe("5");
        await userInputPage.incrementNumber();
        stringNumber = await userInputPage.getNumber();
        await expect (stringNumber).toBe("6");
        await userInputPage.decrementNumber();
        stringNumber = await userInputPage.getNumber();
        await expect (stringNumber).toBe("5");

        await userInputPage.enterText(inputText);
        await userInputPage.enterDate(inputDate);
        await userInputPage.enterPassword(password);
        

})



