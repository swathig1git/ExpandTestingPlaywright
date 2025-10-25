import { Locator, Page } from "playwright-core";

export class DragAndDropPage{
    page: Page;
    fileInput: Locator;
    upload: Locator;
    
    constructor(page: Page){
        this.page = page;
        this.fileInput = page.locator('#fileInput');
        this.upload = page.locator('#fileSubmit');
    }

    async goTo(){
        await this.page.goto("https://practice.expandtesting.com/upload");
    }

    async uploadFile(){

        const filePath = '/Users/surendratavvalu/Downloads/1.pdf'
        await this.page.setInputFiles('#fileInput', filePath);
        

    }



}