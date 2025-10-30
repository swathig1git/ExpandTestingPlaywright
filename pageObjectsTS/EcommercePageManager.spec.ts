import { Locator, Page } from "playwright-core";
import { EcommerceBasePage } from "./EcommerceBasePage.spec";
import { EcommerceRegisterPage } from "./EcommerceRegisterPage.spec";
import { EcommerceItemsPage } from "./EcommerceItemsPage.spec";
import { EcommerceAccountCreatedPage } from "./EcommerceAccountCreatedPage.spec";
import { EcommerceShoppingCartPage } from "./EcommerceShoppingCartPage.spec";



export class EcommercePageManager{
    page: Page;
    ecommerceBasePage: EcommerceBasePage;
    ecommerceRegisterPage: EcommerceRegisterPage;
    ecommerceItemsPage: EcommerceItemsPage;
    ecommerceAccountCreatedPage: EcommerceAccountCreatedPage;
    ecommerceShoppingCartPage: EcommerceShoppingCartPage;





    
    constructor(page: Page){
        this.page = page;
        this.ecommerceBasePage = new EcommerceBasePage(page);
        this.ecommerceRegisterPage = new EcommerceRegisterPage(page);
        this.ecommerceItemsPage = new EcommerceItemsPage(page);
        this.ecommerceAccountCreatedPage = new EcommerceAccountCreatedPage(page);
        this.ecommerceShoppingCartPage = new EcommerceShoppingCartPage(page);

    }

    async launchApplication(){
        await this.page.goto("https://ecommerce-playground.lambdatest.io/");
    }

    async getHomePage(){
        return this.ecommerceBasePage;
    }

    async getRegisterPage(){
        return this.ecommerceRegisterPage;
    }

    async getItemsPage(){
        return this.ecommerceItemsPage;
    }

    async getAccountCreatedPage(){
        return this.ecommerceAccountCreatedPage;
    }

    async getShoppingCartPage(){
        return this.ecommerceShoppingCartPage;
    }


}