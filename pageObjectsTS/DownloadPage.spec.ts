import { Locator, Page } from "playwright-core";

export class DownloadPage{
    page: Page;
    downloadButton: Locator;
    
    constructor(page: Page){
        this.page = page;
        this.downloadButton = page.locator(".btn.btn-primary");
    }

    async goTo(){
        await this.page.goto("https://www.lambdatest.com/selenium-playground/download-file-demo");
    }

    async downLoadFile(){
        this.downloadButton.click();
    }

}