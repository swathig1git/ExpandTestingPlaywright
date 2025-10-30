import { Locator, Page } from "playwright-core";
import { EcommerceBasePage } from "./EcommerceBasePage.spec";


export class EcommerceShoppingCartPage extends EcommerceBasePage{
    page: Page;
    checkout: Locator;

    constructor(page: Page){
        super(page);
        this.page = page;
        this.checkout = page.locator(".btn.btn-lg.btn-primary").filter({hasText:"Checkout"});

    }


}