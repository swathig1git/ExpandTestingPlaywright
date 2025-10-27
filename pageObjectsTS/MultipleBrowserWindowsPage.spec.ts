import { Locator, Page } from "playwright-core";

export class MultipleBrowserWindowsPage{
    page: Page;
    clickLink: Locator;

    
    constructor(page: Page){
        this.page = page;
        this.clickLink = page.getByText("Click Here");

    }

    async goTo(){
        await this.page.goto("https://practice.expandtesting.com/windows");
    }

    async openAnotherWindow(){
        await this.clickLink.click();
    }


}