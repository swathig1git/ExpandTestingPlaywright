import { Locator, Page } from "playwright-core";


export class EcommerceBasePage{
    page: Page;
    dropDowns: Locator;
    dropDownItems: Locator;
    megaMenu: Locator;
    apple: Locator;


    
    constructor(page: Page){
        this.page = page;
        this.dropDowns = page.locator('.dropdown.dropdown-hoverable');
        this.dropDownItems = page.locator('.dropdown-item');
        this.megaMenu = page.locator("//span[contains(.,'Mega Menu')]")
        this.apple = page.locator("//a[@title='Apple']");

    }


    async goToRegisterUser(){
        await this.dropDowns.getByText('My account').hover();
        await Promise.all([
            this.page.waitForURL("**/register"),
            this.dropDownItems.getByText('Register').click()

        ]);
        

    }

    async goToApple(){
        await this.megaMenu.hover();
        await this.apple.click();

    }


}