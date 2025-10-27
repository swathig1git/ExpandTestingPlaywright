import { Page, Browser } from "playwright-core";
import{test, expect, request} from "@playwright/test"
import { UserRegistrationPage } from "../pageObjectsTS/UserRegistrationPage.spec";

test("User Resgitration Success", async function ({ browser }: { browser: Browser }) {
        const context = await browser.newContext();
        const page: Page = await context.newPage();

        let userName: string = "swathi";
        let password: string = "password";
        let confirmPassword: string = "password";

        const userRegistrationPage = new UserRegistrationPage(page);
        await userRegistrationPage.goTo();
        let registeredMessage = await userRegistrationPage.registerUser(userName, password, confirmPassword);
        await expect (registeredMessage).toBe('An error occurred during registration. Please try again.');
        

})

test("Password Mismatch", async function ({ browser }: { browser: Browser }) {
        const context = await browser.newContext();
        const page: Page = await context.newPage();

        let userName: string = "swathi";
        let password: string = "password";
        let confirmPassword: string = "another";

        const userRegistrationPage = new UserRegistrationPage(page);
        await userRegistrationPage.goTo();
        let registeredMessage = await userRegistrationPage.registerUser(userName, password, confirmPassword);
        await expect (registeredMessage).toBe('Passwords do not match.');
        

})

test("Missing Fields", async function ({ browser }: { browser: Browser }) {
        const context = await browser.newContext();
        const page: Page = await context.newPage();

        let userName: string = "swathi";
        let password: string = "password";
        let confirmPassword: string = "";

        const userRegistrationPage = new UserRegistrationPage(page);
        await userRegistrationPage.goTo();
        let registeredMessage = await userRegistrationPage.registerUser(userName, password, confirmPassword);
        await expect (registeredMessage).toBe('All fields are required.');
        

})

