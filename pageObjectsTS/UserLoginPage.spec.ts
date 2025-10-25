import { Locator, Page } from "playwright-core";

export class UserLoginPage{
    page: Page;
    userName: Locator;
    password: Locator;
    login: Locator;
    userLoggedInMessage: Locator;
    userLogout: Locator;
    
    constructor(page: Page){
        this.page = page;
        this.userName = page.locator("#username");
        this.password = page.locator("#password");
        this.login = page.locator(".btn.btn-bg.btn-primary");
        this.userLoggedInMessage = page.locator("#flash");
        this.userLogout = page.locator(".button.secondary");
    }

    async loginUser(userName: string, password: string){
        await this.userName.fill(userName);
        await this.password.fill(password);
        await this.login.click();        
        await this.userLoggedInMessage.waitFor();

        let message: string = await this.userLoggedInMessage.textContent()?? "";
        return message.trim();
    }
    async logoutUser(){
        await this.userLogout.waitFor();
        await this.userLogout.click();
    }
    async goTo(){
        await this.page.goto("https://practice.expandtesting.com/login");
    }

}