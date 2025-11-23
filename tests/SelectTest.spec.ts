import { Page, Browser } from "playwright-core";
import{test, expect, request} from "@playwright/test"
import { SelectPage } from "../pageObjectsTS/SelectPage.spec";
import { waitForDebugger } from "inspector";

test("Select Verification", async function ({ browser }: { browser: Browser }) {
        const context = await browser.newContext();
        const page: Page = await context.newPage();

        const selectPage = new SelectPage(page);
        await selectPage.goTo();

        await selectPage.countrySelect.click();
        const country= 'Japan';
        for (const letter of country)
        {
                await selectPage.countrySearchField.type(letter);
                await page.waitForTimeout(50);
        }
        await selectPage.page.locator('.select2-results__option', { hasText: 'Japan' }).click();
        const selectedCountry = await selectPage.countryValue.textContent();
        await expect(selectedCountry).toBe('Japan');

        await selectPage.stateSelectBox.click();
        await selectPage.stateResults.getByText('Alabama').click();
        await selectPage.stateSelectBox.click();
        await selectPage.stateResults.getByText('Alaska').click();
        await selectPage.stateSelectBox.click();
        const scrollState = selectPage.stateResults.getByText('Utah')
        await scrollState.scrollIntoViewIfNeeded();
        await scrollState.click();

        let selectedStates = await selectPage.selectedStates.allTextContents();
        selectedStates = selectedStates.map(text => text.trim().replace(/^×/, ''));

        console.log(selectedStates);
        expect(selectedStates) .toEqual(expect.arrayContaining(['Alabama', 'Alaska','Utah' ]));




        await selectPage.stateSelectBox.click();
        for (const state of selectedStates) {
        const stateLocator = page.locator('.select2-results__option', { hasText: state });
        // ensure the option exists and is attached/visible
        await expect(stateLocator).toHaveCount(1);

        const aria = await stateLocator.getAttribute('aria-selected');
        expect(aria).toBe('true');
        }

        await selectPage.removeStateFromSelection("Alabama");

        selectedStates = await selectPage.selectedStates.allTextContents();
        selectedStates = selectedStates.map(text => text.trim().replace(/^×/, ''));
        console.log(selectedStates);
        expect(selectedStates) .toEqual(expect.arrayContaining(['Alaska','Utah' ]));


})

test("Select with Disabled options Verification", async function ({ browser }: { browser: Browser }) {
        const context = await browser.newContext();
        const page: Page = await context.newPage();

        const selectPage = new SelectPage(page);
        await selectPage.goTo();

        await selectPage.selectWithDI.click();
        await selectPage.selectWithDIResults.getByText("American Samoa").hover();

        //Testing enabled items
        let countryLocator = await page.locator('.select2-results__option', { hasText: "American Samoa" }); 
        let isHighlighted = await countryLocator.evaluate(el => el.classList.contains('select2-results__option--highlighted'));
        expect (isHighlighted).toBeTruthy();

        //Testing disabled items
        countryLocator = await page.locator('.select2-results__option', { hasText: "Guam" }); 
        isHighlighted = await countryLocator.evaluate(el => el.classList.contains('select2-results__option--highlighted'));
        expect (isHighlighted).toBeFalsy();

})

test("Native Select Verification", async function ({ browser }: { browser: Browser }) {
        const context = await browser.newContext();
        const page: Page = await context.newPage();

        const selectPage = new SelectPage(page);
        await selectPage.goTo();

        selectPage.nativeSelect.selectOption({ label: '.Net' });
        await expect(page.locator('#files option:checked')).toHaveText('.Net');
        let selectedValue = await page.locator('#files option:checked').textContent();
        expect (selectedValue).toBe (".Net");

        // Wait for the correct option to be selected
        /*const selectedOption = page.locator('#files option:checked');
        await expect(selectedOption).toHaveText('.Net');

        // Or get text safely
        const selectedValue = await selectedOption.textContent();
        expect(selectedValue?.trim()).toBe('.Net');*/
})

