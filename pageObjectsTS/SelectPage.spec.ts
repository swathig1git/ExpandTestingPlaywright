import { Locator, Page } from "playwright-core";

export class SelectPage{
    page: Page;
    countrySelect: Locator;
    countrySearchField: Locator;
    countrySearchResults: Locator;
    countryValue: Locator;

    stateSelectBox: Locator
    stateResults: Locator;
    selectedStates: Locator;
    removeSelectedStateButtons: Locator;

    selectWithDI: Locator;
    selectWithDIResults: Locator;

    nativeSelect: Locator;
    
    
    constructor(page: Page){
        this.page = page;
        this.countrySelect = page.locator("#country + .select2 .selection .select2-selection");
        this.countrySearchField = page.locator(".select2-dropdown .select2-search__field");
        this.countrySearchResults=page.locator("#select2-country-results");
        this.countryValue = page.locator("#select2-country-container");

        this.stateSelectBox = page.locator("input.select2-search__field");
        this.stateResults= page.locator(".select2-results__option");
        this.selectedStates = page.locator(".select2-selection__choice");
        this.removeSelectedStateButtons=page.locator(".select2-selection__choice__remove");

        this.selectWithDI = page.locator(".js-example-disabled-results + .select2");
        this.selectWithDIResults = page.locator(".select2-results__option");

        this.nativeSelect = page.locator("#files");
    }

    async goTo(){
        await this.page.goto("https://www.lambdatest.com/selenium-playground/jquery-dropdown-search-demo");
    }

    async removeStateFromSelection(itemName: string){
        const item = this.page.locator(`.select2-selection__choice[title="${itemName}"]`);
        await item.locator('.select2-selection__choice__remove').click();
    }

}