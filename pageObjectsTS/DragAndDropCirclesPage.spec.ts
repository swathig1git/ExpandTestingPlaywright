import { Locator, Page } from "playwright-core";

export class DragAndDropCirclesPage{
    page: Page;
    blueCircle: Locator;
    greenCircle: Locator;
    redCircle: Locator;
    target: Locator;
    source: Locator;

    
    constructor(page: Page){
        this.page = page;
        this.blueCircle = page.locator('.blue');
        this.redCircle = page.locator('.red');
        this.greenCircle = page.locator('.green');
        this.target=page.locator('#target');
        this.source = page.locator ('#source');
    }

    async goTo(){
        await this.page.goto("https://practice.expandtesting.com/drag-and-drop-circles");
    }

    async dragCircleToTarget(color: string){
        await this.target.waitFor();

        if (color.toLowerCase() === "blue")
        {
            await this.blueCircle.waitFor();
            await this.blueCircle.dragTo(this.target);

        }
        else if (color.toLowerCase() === "red")
        {
            await this.redCircle.waitFor();
            await this.redCircle.dragTo(this.target);
        }
        else if (color.toLowerCase() === "green")
        {
            await this.greenCircle.waitFor();
            await this.greenCircle.dragTo(this.target);
        }

    }

    async isColorInTheTarget(color: string){
            let count: number = await this.target.locator('.'+color).count();

            if (count > 0)
                return true;
            else
                return false;
        
    }

        async isColorInTheSource(color: string){
            let count: number = await this.source.locator('.'+color).count();

            if (count > 0)
                return true;
            else
                return false;
        
    }

}