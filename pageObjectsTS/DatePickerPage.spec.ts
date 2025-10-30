import { Locator, Page } from "playwright-core";
import moment from "moment";

export class DatePickerPage{
    page: Page;
    monthAndYear: Locator;
    prev: Locator;
    next: Locator;
    startDate: Locator;
    dayOfTheMonth: Locator;
    completeDate: Locator;

    
    constructor(page: Page){
        this.page = page;
        this.startDate = page.locator("//input[@placeholder='Start date']");
        this.monthAndYear = page.locator("(//table[@class='table-condensed']//th[@class='datepicker-switch'])[1]");
        this.prev = page.locator("(//table[@class='table-condensed']//th[@class='prev'])[1]");
        this.next = page.locator("(//table[@class='table-condensed']//th[@class='next'])[1]");
        this.dayOfTheMonth = page.locator(".datepicker-days .day");
        this.completeDate = page.locator("//input[@placeholder='Start date']");

    }

    async goTo(){
        await this.page.goto("https://www.lambdatest.com/selenium-playground/bootstrap-date-picker-demo");
    }

    async clickStartDate(){
        this.startDate.click();
    }

    async selectMonthAndYear(monthAndYear: string){

        const isPast = moment(monthAndYear, "MMMM YYYY").isBefore();

        while(await this.monthAndYear.textContent() != monthAndYear){
            if (isPast)
                await this.prev.click();
            else
                await this.next.click();

            await this.page.waitForLoadState();
        }

    }

    async selectDayOfTheMonth(day: string){
        await this.dayOfTheMonth.filter({hasText:day}).first().click();
    }
    async getCompleteDate(){
        const completeDate: string = await this.completeDate.inputValue() ?? "";
        return completeDate;
    }


}