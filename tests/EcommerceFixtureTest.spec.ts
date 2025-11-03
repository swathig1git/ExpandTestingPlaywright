import { Page, Browser, chromium } from "playwright-core";
import{ expect, request} from "@playwright/test"
import {test} from "../fixture/firstFixture.spec"
import { EcommerceRegisterPage } from "../pageObjectsTS/EcommerceRegisterPage.spec";
import { EcommerceAccountCreatedPage } from "../pageObjectsTS/EcommerceAccountCreatedPage.spec";




test.describe("Page Object Test Demo", async() => {
      test(`Register test_01`, async({page, email, password})=>{

            await page.goto('index.php?route=account/register');

            const ecommerceRegisterPage = new EcommerceRegisterPage(page);

            const firstName = "play";
            const lastName = "wright";
            const telephone = "1234567890";
            const passwordConfirm = "pass123";
            const newsLetterSubscribe = true;
            const privacyPolicy = true;
            await ecommerceRegisterPage.enterFirstName(firstName);
            await ecommerceRegisterPage.enterLastName(lastName);
            await ecommerceRegisterPage.enterEmail(email);
            await ecommerceRegisterPage.enterTelephone(telephone);
            await ecommerceRegisterPage.enterPassword(password);
            await ecommerceRegisterPage.enterConfirmPassword(password);
            await ecommerceRegisterPage.enterEmail(email);
            await ecommerceRegisterPage.enterPrivacyPolicy(privacyPolicy);
            await ecommerceRegisterPage.pressContinue();

            const ecommerceAccountCreatedPage = new EcommerceAccountCreatedPage(page);

            const headerText = await ecommerceAccountCreatedPage.getHeaderText();
            await expect (headerText).toBe("Your Account Has Been Created!")

      })



});

