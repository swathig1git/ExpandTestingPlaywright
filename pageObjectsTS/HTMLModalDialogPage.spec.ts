import { Locator, Page } from "playwright-core";

export class HTMLModalPage {
  readonly page: Page;
  launchSingleModalButton: Locator;
  singleModalSaveButton: Locator;

  launchMultiModalButton: Locator;
  launchSecondModalButton: Locator;
  


  constructor(page: Page) {
    this.page = page;
    this.launchSingleModalButton = page.locator("//button[@data-target='#myModal']");
    this.singleModalSaveButton = page.locator("#myModal .btn.btn-dark");

    this.launchMultiModalButton = page.locator("//button[@data-target='#myMultiModal']");
    this.launchSecondModalButton = page.locator("//button[@data-target='#mySecondModal']");

  }


}