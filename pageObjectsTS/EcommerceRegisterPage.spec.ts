import { Locator, Page } from "playwright-core";
import { EcommerceBasePage } from "./EcommerceBasePage.spec";


export class EcommerceRegisterPage extends EcommerceBasePage{
    page: Page;
    firstName: Locator;
    lastName: Locator;
    email: Locator;
    telephone: Locator;
    password: Locator;
    passwordConfirm: Locator;
    newsLetterSubscribeYes: Locator;
    newsLetterSubscribeNo: Locator;
    privacyPolicyCheckbox: Locator;
    continue: Locator;
    

    
    constructor(page: Page){
        super(page);
        this.page = page;
        this.firstName = page.locator('#input-firstname');
        this.lastName = page.locator('#input-lastname');
        this.email = page.locator('#input-email');
        this.telephone = page.locator('#input-telephone');
        this.password = page.locator('#input-password');
        this.passwordConfirm = page.locator('#input-confirm');
        this.newsLetterSubscribeYes = page.locator('label[for="input-newsletter-yes"]');
        this.newsLetterSubscribeNo = page.locator('label[for="input-newsletter-no"]');
        this.privacyPolicyCheckbox = page.locator("label[for$='input-agree']");
        this.continue = page.locator("input[type='submit']");

    }

    async enterFirstName(firstName:string){
        await this.firstName.fill(firstName);
    }

    async enterLastName(lastName:string){
        await this.lastName.fill(lastName);
    }

    async enterEmail(email:string){
        await this.email.fill(email);
    }

    async enterTelephone(telephone:string){
        await this.telephone.fill(telephone);
    }

    async enterPassword(password:string){
        await this.password.fill(password);
    }

    async enterConfirmPassword(passwordConfirm:string){
        await this.passwordConfirm.fill(passwordConfirm);
    }

    async pressContinue(){
        await Promise.all([
            this.page.waitForLoadState('load'),
            this.continue.click()
        ])
        
        
    }

    async enterPrivacyPolicy(privacyPolicy: Boolean){

        if (privacyPolicy == true)
            await this.privacyPolicyCheckbox.check();
        else
            await this.privacyPolicyCheckbox.uncheck();

    }

    async registerUser(firstName: string,
                        lastName: string,
                        email: string,
                        telephone: string,
                        password: string,
                        passwordConfirm: string,
                        newsLetterSubscribe: boolean,
                        privacyPolicy: boolean){

        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.email.fill(email);
        await this.telephone.fill(telephone);
        await this.password.fill(password);
        await this.passwordConfirm.fill(passwordConfirm);
        if (newsLetterSubscribe == true)
            await this.newsLetterSubscribeYes.check();
        else
            await this.newsLetterSubscribeNo.check();

        if (privacyPolicy == true)
            await this.privacyPolicyCheckbox.check();
        else
            await this.privacyPolicyCheckbox.uncheck();

        await this.continue.click();

    }



}