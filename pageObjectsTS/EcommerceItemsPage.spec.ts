import { Locator, Page } from "playwright-core";
import { EcommerceBasePage } from "./EcommerceBasePage.spec";


export class EcommerceItemsPage extends EcommerceBasePage{
    page: Page;
    continueButton: Locator;
    productCards: Locator;
    notificationBoxTop: Locator;
    checkout: Locator;

    constructor(page: Page){
        super(page);
        this.page = page;
        this.continueButton = page.locator("//a[text()='Continue']");
        this.productCards = page.locator("//div[@class='product-thumb']")
        this.notificationBoxTop = page.locator("#notification-box-top");
        this.checkout = page.locator("#notification-box-top .btn.btn-secondary.btn-block").filter({hasText:'Checkout '});
    }

    async addItemToCart(itemName: string){

        const itemCard = this.productCards.
                    filter({hasText:itemName}).
                    first();

        await itemCard.hover();
        await itemCard .locator("button[title='Add to Cart']"). click();

    }
    async checkoutCart(){
        await this.checkout.click();
    }

}