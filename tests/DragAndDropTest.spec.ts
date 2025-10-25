import { Page, Browser } from "playwright-core";
import{test, expect, request} from "@playwright/test"
import { DragAndDropPage } from "../pageObjectsTS/DragAndDropPage.spec";

test("Drag and Drop Verification", async function ({ browser }: { browser: Browser }) {
        const context = await browser.newContext();
        const page: Page = await context.newPage();

        const dragAndDropPage = new DragAndDropPage(page);
        await dragAndDropPage.goTo();

        let text:string = await dragAndDropPage.getColumnAText() ?? "";
        await expect (text).toBe("A");
        text = await dragAndDropPage.getColumnBText() ?? "";
        await expect (text).toBe("B");

        await dragAndDropPage.dragToColumnA();

        text = await dragAndDropPage.getColumnAText() ?? "";
        await expect (text).toBe("B");
        text = await dragAndDropPage.getColumnBText() ?? "";
        await expect (text).toBe("A");

})



