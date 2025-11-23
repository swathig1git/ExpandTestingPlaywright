import { Page, Browser } from "playwright-core";
import{test, expect, request} from "@playwright/test"
import { ContextMenuPage } from "../pageObjectsTS/ContextMenuPage.spec";

test('First table filter verify', async ({ page }) => {
  const contextMenuPage = new ContextMenuPage(page);

  await page.goto('https://www.lambdatest.com/selenium-playground/context-menu');

  page.on("dialog", async(dialog) => {
        console.log("Alert Message: ", dialog.message());
        await dialog.accept(); 
        });
  
  await contextMenuPage.rectangle.click({ button: 'right' });


});
