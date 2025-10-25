import { Page, Browser } from "playwright-core";
import{test, expect, request} from "@playwright/test"
import { DragAndDropCirclesPage } from "../pageObjectsTS/DragAndDropCirclesPage.spec";

test("Drag and Drop Circles Verification", async function ({ browser }: { browser: Browser }) {
        const context = await browser.newContext();
        const page: Page = await context.newPage();

        const dragAndDropCirclesPage = new DragAndDropCirclesPage(page);
        await dragAndDropCirclesPage.goTo();

        await expect (dragAndDropCirclesPage.isColorInTheSource("blue")).toBeTruthy();
        await expect (dragAndDropCirclesPage.isColorInTheSource("green")).toBeTruthy();
        await expect (dragAndDropCirclesPage.isColorInTheSource("red")).toBeTruthy();

        await dragAndDropCirclesPage.dragCircleToTarget("red");
        await dragAndDropCirclesPage.dragCircleToTarget("blue");
        await dragAndDropCirclesPage.dragCircleToTarget("green");

        await expect (dragAndDropCirclesPage.isColorInTheTarget("blue")).toBeTruthy;
        await expect (dragAndDropCirclesPage.isColorInTheTarget("green")).toBeTruthy;
        await expect (dragAndDropCirclesPage.isColorInTheTarget("red")).toBeTruthy;

        await expect (dragAndDropCirclesPage.isColorInTheSource("blue")).toBeFalsy;
        await expect (dragAndDropCirclesPage.isColorInTheSource("green")).toBeFalsy;
        await expect (dragAndDropCirclesPage.isColorInTheSource("red")).toBeFalsy;




})



