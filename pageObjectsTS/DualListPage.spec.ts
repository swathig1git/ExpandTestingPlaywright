import { Locator, Page } from "playwright-core";

export class DualListPage{
    page: Page;
    leftSideItems: Locator;
    rightSideItems: Locator;
    moveRightButton: Locator;
    moveLeftButton: Locator; 
    
    constructor(page: Page){
        this.page = page;
        this.leftSideItems = page.locator(".list-left li");
        this.rightSideItems = page.locator(".list-right li");
        this.moveRightButton = page.locator("button.move-right");
        this.moveLeftButton = page.locator("button.move-left");

    }

    async goTo(){
        await this.page.goto("https://www.lambdatest.com/selenium-playground/bootstrap-dual-list-box-demo");
    }

    async getLeftSideItemCount(){
        const leftCount: number = await this.leftSideItems.count();
        return leftCount;
    }

    async selectItemOnLeftSide(itemNumber : number){

        await this.leftSideItems.nth(itemNumber-1).click();

    }

    async moveSelectedItemsToRight(){
        await this.moveRightButton.click();

    }

    async moveSelectedItemsToLeft(){
        await this.moveLeftButton.click();

    }


}