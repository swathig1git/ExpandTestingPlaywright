import { Page, Browser } from "playwright-core";
import{test, expect, request} from "@playwright/test"
import { SliderPage } from "../pageObjectsTS/SliderPage.spec";


test("Slider Verification", async function ({ browser }: { browser: Browser }) {
        const context = await browser.newContext();
        const page: Page = await context.newPage();

        const sliderPage = new SliderPage(page);
        await sliderPage.goTo();

        //verify initial values
        let sliderVal = await sliderPage.getSliderValue();
        let rangeVal = await sliderPage.getRangeValue();
        await expect (sliderVal).toBe(rangeVal);

        //verify after ArrowRight press
        await sliderPage.focusSlider();
        await page.keyboard.press('ArrowRight');
        sliderVal = await sliderPage.getSliderValue();
        rangeVal = await sliderPage.getRangeValue();
        await expect (sliderVal).toBe(rangeVal);

        //verify mouse click
        const box = await sliderPage.slider1.boundingBox();

        if (box){
                const x = box.x + box.width/2;
                const y = box.y + box.height/2;

                await page.mouse.move(x, y);
                await page.mouse.down();
                await page.mouse.up();
        }

        sliderVal = await sliderPage.getSliderValue();
        rangeVal = await sliderPage.getRangeValue();
        await expect (sliderVal).toBe(rangeVal);

        //verify mouse drag like a real user

        if(box){
                const startX= box.x +5;
                const endX = box.x + box.width*0.8;
                const y = box.y + box.height/2;

                await page.mouse.move(startX, y);
                await page.mouse.down();
                await page.mouse.move(endX, y);
                await page.mouse.up();

                sliderVal = await sliderPage.getSliderValue();
                rangeVal = await sliderPage.getRangeValue();
                await expect (sliderVal).toBe(rangeVal);
        }
        


})



