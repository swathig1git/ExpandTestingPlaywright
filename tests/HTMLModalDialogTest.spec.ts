import { Page, Browser } from "playwright-core";
import{test, expect, request} from "@playwright/test"
import { HTMLModalPage } from "../pageObjectsTS/HTMLModalDialogPage.spec";

test('First table filter verify', async ({ page }) => {
  const htmlModalPage = new HTMLModalPage(page);

  await page.goto('https://www.lambdatest.com/selenium-playground/bootstrap-modal-demo');
  await htmlModalPage.launchSingleModalButton.click();
  await htmlModalPage.singleModalSaveButton.click();

  await htmlModalPage.launchMultiModalButton.click();
  await htmlModalPage.launchSecondModalButton.click();

});
