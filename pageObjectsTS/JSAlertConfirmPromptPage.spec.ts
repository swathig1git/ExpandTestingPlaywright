import { Locator, Page } from "playwright-core";

export class JSAlertConfirmPromptPage{
    page: Page;
    alertButton: Locator;
    confirmButton: Locator;
    promptButton: Locator;
    dialogResponse: Locator;


    
    constructor(page: Page){
        this.page = page;
        this.alertButton = page.locator("#js-alert");
        this.confirmButton = page.locator("#js-confirm");
        this.promptButton = page.locator("#js-prompt");
        this.dialogResponse = page.locator("#dialog-response");

    }

    async goTo(){
        await this.page.goto("https://practice.expandtesting.com/js-dialogs");
    }

    async getDialogResponse(){
        const message:string = await this.dialogResponse.textContent() ?? "";
        return message;
    }


}