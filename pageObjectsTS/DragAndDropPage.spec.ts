import { Locator, Page } from "playwright-core";

export class DragAndDropPage{
    page: Page;
    columnA: Locator;
    columnB: Locator;
    
    constructor(page: Page){
        this.page = page;
        this.columnA = page.locator('#column-a');
        this.columnB = page.locator('#column-b');
    }

    async goTo(){
        await this.page.goto("https://practice.expandtesting.com/drag-and-drop");
    }

    async dragToColumnA(){
        await this.columnA.dragTo(this.columnB);
    }

    async getColumnAText(){
        const text = await this.columnA.locator("header").textContent();
        return text ?? "";
    }

    async getColumnBText(){
        const text = await this.columnB.locator("header").textContent();
        return text ?? "";
    }



}