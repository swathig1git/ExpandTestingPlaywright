import { Locator, Page } from "playwright-core";
import { pathToFileURL } from "url";

export class SaksMyFavoritesPage {
  readonly page: Page;
  productCards: Locator;
  brandName: Locator;
  productName: Locator;
  favoritesDescription: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productCards = page.locator("div[data-testid^='product-card']");
    this.brandName = this.productCards.locator("h4");
    this.productName = this.productCards.locator("div[data-testid*='product-card-title']");
    this.favoritesDescription = page.locator(".Favorites__description");

    
  }

}
