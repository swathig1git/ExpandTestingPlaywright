import { Locator, Page } from "playwright-core";
import { EcommerceBasePage } from "./EcommerceBasePage.spec";


export class EcommerceAccountCreatedPage extends EcommerceBasePage{
    page: Page;
    continueButton: Locator;
    headerText: Locator;

    constructor(page: Page){
        super(page);
        this.page = page;
        this.continueButton = page.locator("//a[text()='Continue']");
        this.headerText = page.locator("h1")
    }

    async getHeaderText(){
        const headerText = await this.headerText.textContent();
        return headerText?.trim();
    }

}