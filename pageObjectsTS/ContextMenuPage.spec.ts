import { Locator, Page } from "playwright-core";

export class ContextMenuPage {
  readonly page: Page;
  rectangle: Locator;
  


  constructor(page: Page) {
    this.page = page;
    this.rectangle = page.locator("#hot-spot");

  }


}