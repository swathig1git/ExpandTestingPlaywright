import { Locator, Page } from "playwright-core";

export class SaksProductFilterPage {
  readonly page: Page;
  colourFilter: Locator;
  greenColourFilter: Locator;
  productCards: Locator;
  onlyAtSaks: Locator;
  designerFilter: Locator;
  designerOptions: Locator;
  allDesignerOptions: Locator;
  designerViewAll: Locator;
  sizeFilter: Locator;
  sizeXXSmall: Locator;
  brandName: Locator;
  productName: Locator;
  originalPrice: Locator;
  browseByButtons: Locator;
  filterButtons: Locator;
  topBannerCategories: Locator;
  priceButton: Locator;
  priceMin: Locator;
  priceMax: Locator;
  updatePrice: Locator;
  filtersHeader: Locator;
  productCurrentPrice: Locator;
  browseBy: Locator;
  allColours: Locator;
  selectedFilterButtons: Locator;
  

  constructor(page: Page) {
    this.page = page;
    this.colourFilter = page.locator("//h4//div[text()='Colour']");
    this.greenColourFilter = page.locator("//button[@name='Green']");
    this.productCards = page.locator("div[data-testid*='product-card']");
    this.onlyAtSaks = page.locator("//div[text()='Only at Saks']")
    this.designerFilter = page.locator("//div[text()='Designers']");
    this.designerOptions = page.locator("//div[text()='10 brand options']/following-sibling::div/button");
    this.allDesignerOptions = page.locator("//div[contains(text(),'brand options')]/following-sibling::div/button")
    this.designerViewAll = page.locator("//button[text()='View All']")
    this.sizeFilter = page.locator("//div[text()='Size']");
    this.sizeXXSmall = page.locator("//button[text()='XX-Small, 00']");
    this.brandName = page.locator(".ProductCardHeader__productCardBrandName");
    this.productName = page.locator(".ProductCardHeader__title");
    this.originalPrice = page.locator("[data-testid*='originalPrice']");
    this.browseByButtons = page.locator("[data-testid$='sideNavigation-sideNavigation-2'] button");
    this.filterButtons = page.locator(".FiltersSidebar__button");
    this.topBannerCategories = page.locator("[data-testid*='hp-banner-center-cta-row']");
    this.priceButton = page.locator("button[aria-label='Price']");
    this.priceMin = page.locator("#min");
    this.priceMax = page.locator("#max");
    this.updatePrice = page.locator("//button[text()='Update price']");
    this.filtersHeader = page.locator("//div[text()='FILTERS']");
    this.productCurrentPrice = this.productCards.locator("[data-testid*='currentPrice']");
    this.browseBy = page.locator("[data-testid*='sideNavigation'] [data-testid*='title']");
    this.allColours = page.locator("//button[@aria-label='Colour']/following-sibling::div//button");
    this.selectedFilterButtons = page.locator("[data-testid*='selectedFilters'] button");
  }

  async getAllDesignerBrandsCount(){
    const text = await this.page.locator("//div[@role='status' and contains(text(), 'brand options')]").innerText();
    const number = parseInt(text.replace(/\D/g, ""), 10);
    console.log(number);  // 645
    return number;
  }

  
}

