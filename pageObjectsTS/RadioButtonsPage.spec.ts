import { Locator, Page } from "playwright-core";

export class RadioButtonsPage{
    page: Page;
    colorOptions: Locator;
    sportOptions: Locator;
    
    constructor(page: Page){
        this.page = page;
        this.colorOptions = page.locator('input[type="radio"][name="color"]');
        this.sportOptions = page.locator('input[type="radio"][name="sport"]');
    }

    async goTo(){
        await this.page.goto("https://practice.expandtesting.com/radio-buttons");
    }

    async selectColor(color: string){
        await this.page.getByLabel(color).check();
    }

    async getSelectedColor(){
        const selected = await this.page.locator('input[type="radio"][name="color"]:checked');
        await selected.waitFor({state:'attached'});
        const color = await selected.getAttribute('value');
        return color??"";
    }

    async getSelectedSport(){
        const selected = await this.page.locator('input[type="radio"][name="sport"]:checked');
        await selected.waitFor({state:'attached'});
        const sport = await selected.getAttribute('value');
        return sport??"";
    }

    async selectSport(sport: string){
        await this.page.getByLabel(sport).check();
    }

}