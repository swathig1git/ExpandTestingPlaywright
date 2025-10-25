import { Locator, Page } from "playwright-core";

export class UserInputPage{
    page: Page;
    inputNumber: Locator;
    inputText: Locator;
    inputPassword: Locator;
    inputDate: Locator;

    
    constructor(page: Page){
        this.page = page;
        this.inputNumber = page.getByLabel('Input: Number');
        this.inputText = page.getByLabel('Input: Text');
        this.inputPassword = page.getByLabel('Input: Password');
        this.inputDate = page.getByLabel('Input: Date');
    
    }

    async enterText(text: string){
        await this.inputText.fill(text);

    }

    async enterPassword(password: string){
        await this.inputPassword.fill(password);

    }

    async enterNumber(number: Number){
        await this.inputNumber.fill(number.toString());
    }
    async getNumber(){
        return await this.inputNumber.inputValue();
    }
    async incrementNumber(){
        await this.inputNumber.press('ArrowUp')
    }

    async decrementNumber(){
        await this.inputNumber.press('ArrowDown')
    }

    async enterDate(date:string){
        await this.inputDate.fill(date);

    }


    async goTo(){
        await this.page.goto("https://practice.expandtesting.com/inputs");
    }

}