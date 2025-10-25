import { Page, Browser } from "playwright-core";
import{test, expect, request} from "@playwright/test"
import { DynamicPaginationTablePage } from "../pageObjectsTS/DynamicPaginationTablePage.spec";

test("Dynamic Pagination Table Verification", async function ({ browser }: { browser: Browser }) {
        const context = await browser.newContext();
        const page: Page = await context.newPage();
        const numberOfRows = 10;

        const dynamicPaginationTablePage = new DynamicPaginationTablePage(page);
        await dynamicPaginationTablePage.goTo();

        let noOfEntriesInDropdown = await dynamicPaginationTablePage.getNoOfEntriesInDropdown();
        let showingNoOfEntries = await dynamicPaginationTablePage.getNoOfShowingEntriesInPage();

        await expect (noOfEntriesInDropdown).toBe(showingNoOfEntries);

        let howManyPagesForTable = await dynamicPaginationTablePage.getHowManyPagesForTable();
        await expect (howManyPagesForTable).toBe(Math.ceil(numberOfRows/noOfEntriesInDropdown));
        for (let i=1; i<= howManyPagesForTable; i++)
        {
                await dynamicPaginationTablePage.clickOnPageNumber(i);
                let activePage = await dynamicPaginationTablePage.whichPageIsActive();
                console.log("activePage : ", activePage, " i:", i);
                expect (activePage).toBe(i);
        }
        

        await dynamicPaginationTablePage.setNoOfEntriesInDropdown(5);
        noOfEntriesInDropdown = await dynamicPaginationTablePage.getNoOfEntriesInDropdown();
        howManyPagesForTable = await dynamicPaginationTablePage.getHowManyPagesForTable();
        await expect (howManyPagesForTable).toBe(Math.ceil(numberOfRows/noOfEntriesInDropdown));

})



