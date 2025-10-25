import { Locator, Page } from "playwright-core";

export class DynamicPaginationTablePage{
    page: Page;
    previousPage: Locator;
    nextPage: Locator;
    entriesInDropdown: Locator;
    noOfEntriesInPage: Locator;
    howManyPagesForTable: Locator;
    goToPage: Locator;
    activePage: Locator;


    
    constructor(page: Page){
        this.page = page;
        this.entriesInDropdown = page.locator('.form-select.form-select-sm');
        this.previousPage = page.locator('.previous');
        this.nextPage = page.locator('.next');    
        this.noOfEntriesInPage = page.locator('tbody tr');
        this.howManyPagesForTable = page.locator('.pagination .page-item');
        this.goToPage = page.locator('li.page-item a.page-link');
        this.activePage = page.locator('li.page-item.active');
    }

    async getNoOfEntriesInDropdown(){
        const count = await this.entriesInDropdown.inputValue();
        return parseInt(count);
    }

    async getNoOfShowingEntriesInPage(){
        await this.noOfEntriesInPage.first().waitFor();
        const count = await this.noOfEntriesInPage.count();
        return count;
    }
    async goTo(): Promise<void>{
        await this.page.goto("https://practice.expandtesting.com/dynamic-pagination-table");
    }

    async getHowManyPagesForTable(){

        await this.howManyPagesForTable.first().waitFor();
        let count = await this.howManyPagesForTable.count();
        return count-2; //subtract 2, to remove previous and next page links
    }

    async setNoOfEntriesInDropdown(num: Number){
        await this.entriesInDropdown.selectOption({label: num.toString()});
    }

    async clickOnPageNumber(pageNumber: Number){
        await this.goToPage.filter({hasText: pageNumber.toString()}).click();
    }

    async whichPageIsActive(){
        await this.activePage.waitFor();
        const pageNumber = await this.activePage.textContent() ?? "0";
        return parseInt(pageNumber);
    }

    

}

// write more test cases for sorting etc