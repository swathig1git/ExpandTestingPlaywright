import { Locator, Page } from "playwright-core";

export class UserRegistrationPage{
    page: Page;
    userName: Locator;
    password: Locator;
    confirmPassword: Locator;
    register: Locator;
    userResgisteredMessage: Locator;
    
    constructor(page: Page){
        this.page = page;
        this.userName = page.locator("#username");
        this.password = page.locator("#password");
        this.confirmPassword = page.locator("#confirmPassword");
        this.register = page.locator(".btn.btn-bg.btn-primary");
        this.userResgisteredMessage = page.locator("#flash");
    }

    async registerUser(userName: string, password: string, confirmPassword:string){
        await this.userName.fill(userName);
        await this.password.fill(password);
        await this.confirmPassword.fill(confirmPassword);
        await this.register.click();        
        await this.userResgisteredMessage.waitFor();

        let message: string = await this.userResgisteredMessage.textContent()?? "";
        return message.trim();
    }
    async goTo(){
        await this.page.goto("https://practice.expandtesting.com/register");
    }

}