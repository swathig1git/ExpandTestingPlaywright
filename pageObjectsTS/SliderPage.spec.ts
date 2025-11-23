import { Locator, Page } from "playwright-core";

export class SliderPage{
    page: Page;
    slider1: Locator;
    range: Locator;


    
    constructor(page: Page){
        this.page = page;
        this.slider1 = page.locator("//div[@id='slider1']//input");
        this.range = page.locator('#range');
        

    }

    async goTo(){
        await this.page.goto("https://www.lambdatest.com/selenium-playground/drag-drop-range-sliders-demo");
    }

    async getSliderValue(){
        const value = await this.slider1.inputValue();
        return value;
    }

    async getRangeValue(){
        const value = await this.range.innerText();
        return value;
    }

    async focusSlider(){
        await this.slider1.focus();
    }

    async moveArrowAllTheWay(){
        
    }

}