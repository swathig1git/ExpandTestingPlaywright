import { Locator, Page } from "playwright-core";

export class SaksDesignerBrandListPage {
  readonly page: Page;
  brandIndexLetter_J: Locator;
  firstElement_J: Locator;
  brandIndexLetter_M: Locator;
  firstElement_M: Locator;


  


  constructor(page: Page) {
    this.page = page;
    this.brandIndexLetter_J = page.locator("//a[@class='BrandIndexes__letter' and text()='j']")
    this.firstElement_J = page.locator("//div[text()='j']");
    this.brandIndexLetter_M = page.locator("//a[@class='BrandIndexes__letter' and text()='m']")
    this.firstElement_M = page.locator("//div[text()='m']");
  }




}
