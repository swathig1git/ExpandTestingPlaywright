import { Locator, Page } from "playwright-core";
import { EcommerceBasePage } from "./EcommerceBasePage.spec";


export class EcommerceLoginPage extends EcommerceBasePage{
    page: Page;
    email: Locator;
    password: Locator;
    loginButton: Locator;


    constructor(page: Page){
        super(page);
        this.page = page;
        this.email = page.locator("#input-email");
        this.password = page.locator("#input-password");
        this.loginButton= page.locator("input[type$='submit']");
    }

    async enterEmail(email: string){
        await this.email.fill(email);

    }

    async enterPassword(password: string){
        await this.password.fill(password);

    }

    async login(){

        await Promise.all([
            this.page.waitForLoadState('load'),
            this.loginButton.click()
        ])
    }


}