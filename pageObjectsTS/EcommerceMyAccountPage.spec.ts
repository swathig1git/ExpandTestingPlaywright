import { Locator, Page } from "playwright-core";
import { EcommerceBasePage } from "./EcommerceBasePage.spec";


export class EcommerceMyAccountPage extends EcommerceBasePage{
    page: Page;
    myAccountHeader: Locator;



    constructor(page: Page){
        super(page);
        this.page = page;
        this.myAccountHeader = page.locator("h2").nth(0);
    }

    async getMyAccountHeaderMessage(){
        const headerMessage = await this.myAccountHeader.textContent();
        return headerMessage;
    }

}