import { Page, Browser } from "playwright-core";
import{test, expect, request} from "@playwright/test"
import { UserLoginPage } from "../pageObjectsTS/UserLoginPage.spec";

test("User Login Success", async function ({ browser }: { browser: Browser }) {
        const context = await browser.newContext();
        const page: Page = await context.newPage();

        let userName: string = "practice";
        let password: string = "SuperSecretPassword!";

        const userLoginPage = new UserLoginPage(page);
        await userLoginPage.goTo();
        let loginMessage = await userLoginPage.loginUser(userName, password);
        await expect (loginMessage).toBe('You logged into a secure area!');

        await userLoginPage.logoutUser();
        

})

test("Wrong Password", async function ({ browser }: { browser: Browser }) {
        const context = await browser.newContext();
        const page: Page = await context.newPage();

        let userName: string = "swathi";
        let password: string = "password";
        let confirmPassword: string = "another";

        const userLoginPage = new UserLoginPage(page);
        await userLoginPage.goTo();
        let registeredMessage = await userLoginPage.loginUser(userName, password);
        await expect (registeredMessage).toBe('Your password is invalid!');
        

})

