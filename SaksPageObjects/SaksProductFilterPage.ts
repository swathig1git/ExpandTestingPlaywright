import { Locator, Page } from "playwright-core";

export class SaksProductFilterPage {
  readonly page: Page;
  colourFilter: Locator;
  greenColourFilter: Locator;
  productCards: Locator;
  onlyAtSaks: Locator;
  designerFilter: Locator;
  designerOptions: Locator;
  designerViewAll: Locator;
  sizeFilter: Locator;
  sizeXXSmall: Locator;
  miniCart: Locator;




  constructor(page: Page) {
    this.page = page;
    this.colourFilter = page.locator("//h4//div[text()='Colour']");
    this.greenColourFilter = page.locator("//button[@name='Green']");
    this.productCards = page.locator("a.CardImage__imageWrapper");
    this.onlyAtSaks = page.locator("//div[text()='Only at Saks']")
    this.designerFilter = page.locator("//div[text()='Designers']");
    this.designerOptions = page.locator("//div[text()='10 brand options']/following-sibling::div/button");
    this.designerViewAll = page.locator("//button[text()='View All']")
    this.sizeFilter = page.locator("//div[text()='Size']");
    this.sizeXXSmall = page.locator("//button[text()='XX-Small, 00']");
    this.miniCart = page.locator("//div[@class='MiniCart__title']")
  }

  async getAllDesignerBrands(){
    const text = await this.page.locator("//div[@role='status' and contains(text(), 'brand options')]").innerText();
    const number = parseInt(text.replace(/\D/g, ""), 10);
    console.log(number);  // 645
    return number;
  }

  
}
