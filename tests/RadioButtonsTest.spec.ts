import { Page, Browser } from "playwright-core";
import{test, expect, request} from "@playwright/test"
import { RadioButtonsPage } from "../pageObjectsTS/RadioButtonsPage.spec";

test("Radio Button Verification", async function ({ browser }: { browser: Browser }) {
        const context = await browser.newContext();
        const page: Page = await context.newPage();

        const radioButtonsPage = new RadioButtonsPage(page);
        await radioButtonsPage.goTo();

        let color:string = "Blue";
        await radioButtonsPage.selectColor(color);
        let selectedColor = await radioButtonsPage.getSelectedColor();
        expect (selectedColor.toLowerCase()).toBe(color.toLowerCase());


        color = "Red";
        await radioButtonsPage.selectColor(color);
        selectedColor = await radioButtonsPage.getSelectedColor();
        expect (selectedColor.toLowerCase()).toBe(color.toLowerCase());

        color ="Yellow";
        await radioButtonsPage.selectColor(color);
        selectedColor = await radioButtonsPage.getSelectedColor();
        expect (selectedColor.toLowerCase()).toBe(color.toLowerCase());

        color = "Black";
        await radioButtonsPage.selectColor(color);
        selectedColor = await radioButtonsPage.getSelectedColor();
        expect (selectedColor.toLowerCase()).toBe(color.toLowerCase());

        let sport = "Basketball";
        await radioButtonsPage.selectColor(sport);
        let selectedSport = await radioButtonsPage.getSelectedSport();
        expect (selectedSport.toLowerCase()).toBe(sport.toLowerCase());

        sport = "Football";
        await radioButtonsPage.selectColor(sport);
        selectedSport = await radioButtonsPage.getSelectedSport();
        expect (selectedSport.toLowerCase()).toBe(sport.toLowerCase());

        sport = "Tennis";
        await radioButtonsPage.selectColor(sport);
        selectedSport = await radioButtonsPage.getSelectedSport();
        expect (selectedSport.toLowerCase()).toBe(sport.toLowerCase());

})

// write test cases for disabled radio buttons


