import { Page, Browser } from "playwright-core";
import{test, expect, request} from "@playwright/test"
import { TableSearchFilterPage } from "../pageObjectsTS/TableSearchFilterPage.spec";

test('First table filter verify', async ({ page }) => {
  const tableSearchFilterPage = new TableSearchFilterPage(page);

  await page.goto('https://www.lambdatest.com/selenium-playground/table-search-filter-demo');

  let searchString = 'lo'
  let expectedRowCount = 0;

  let rows = await tableSearchFilterPage.allRowsInFirstTable.all();

for (const row of rows) {
  const text = await row.textContent();
  if (text?.includes(searchString)) {
    expectedRowCount ++;
  }
}

const firstRowText = await tableSearchFilterPage.allRowsInFirstTable.first().textContent();
if (!firstRowText) {
  throw new Error('First row has no text!');
}

await tableSearchFilterPage.filterAll.pressSequentially(searchString);
rows = await tableSearchFilterPage.visibleRowsFirstTable.all();
let actualRowCount = await tableSearchFilterPage.visibleRowsFirstTable.count();
expect (actualRowCount).toBe(expectedRowCount);

for (const row of rows) {
  const text = await row.textContent();
  expect(text).toContain(searchString);
  }


await page.pause();


});

test('Second table filter verify', async ({ page }) => {
  const tableSearchFilterPage = new TableSearchFilterPage(page);
  await page.goto('https://www.lambdatest.com/selenium-playground/table-search-filter-demo');

  await expect(tableSearchFilterPage.serialNumber).toBeDisabled();
  await expect(tableSearchFilterPage.userName).toBeDisabled();
  await expect(tableSearchFilterPage.firstName).toBeDisabled();
  await expect(tableSearchFilterPage.lastName).toBeDisabled();

  await tableSearchFilterPage.filterButton.click();

  await expect(tableSearchFilterPage.serialNumber).toBeEnabled();
  await expect(tableSearchFilterPage.userName).toBeEnabled();
  await expect(tableSearchFilterPage.firstName).toBeEnabled();
  await expect(tableSearchFilterPage.lastName).toBeEnabled();

  let serialNumber = "3";

  await tableSearchFilterPage.serialNumber.pressSequentially(serialNumber);

  let allRows = await tableSearchFilterPage.allRowsInSecondTable.all();
  let rowCount = await tableSearchFilterPage.allRowsInSecondTable.count();

  let expectedRowCount = await tableSearchFilterPage.allRowsInSecondTable.filter({
  has: page.locator('td:first-child'),
  hasText: '3'
  }).count();

  let visibleRows = await tableSearchFilterPage.visibleRowsSecondTable.all();
  let actualRowCount = await tableSearchFilterPage.visibleRowsSecondTable.count();
  expect (actualRowCount).toBe(expectedRowCount);

  for (const row of visibleRows) {
  const firstCellText = await row.locator('td').first().textContent()
  expect (firstCellText).toBe(serialNumber);
  }

});

test.only('Second table filter username verify ', async ({ page }) => {
  const tableSearchFilterPage = new TableSearchFilterPage(page);
  await page.goto('https://www.lambdatest.com/selenium-playground/table-search-filter-demo');

  await tableSearchFilterPage.filterButton.click();

  let userName = "jo";
  await tableSearchFilterPage.userName.pressSequentially(userName);

  let expectedRowCount = 0;

  const expectedRows = await tableSearchFilterPage.allRowsInSecondTable.all();

for (const row of expectedRows) {
  // get second td text (0-based index)
  const secondCellText = (await row.locator('td').nth(1).textContent())?.trim();
  
  if (secondCellText?.toLowerCase().includes(userName.toLowerCase())) {
    expectedRowCount++;
  }
}

  let visibleRows = await tableSearchFilterPage.visibleRowsSecondTable.all();
  let actualRowCount = await tableSearchFilterPage.visibleRowsSecondTable.count();
  expect (actualRowCount).toBe(expectedRowCount);

});

