import { expect, test, Page } from "@playwright/test";

test("Multiple tabs test", async({page})=>{

    await page.goto("https://www.lambdatest.com/selenium-playground/window-popup-modal-demo");

    const [multipleWindows] = await Promise.all([
        page.waitForEvent('popup'),
        page.click('#followboth')
    ]);

    await multipleWindows.waitForLoadState();

    const pages = multipleWindows.context().pages();
    console.log("Num of pages: ", pages.length);

    let facebookPage: Page;
    pages.forEach(tab => {
        console.log(tab.url());
        if (tab.url().includes('facebook'))
            facebookPage = tab;

    });

    const text = await facebookPage?.textContent("//h1");
    console.log(text);


   /* console.log(page.url());
    const [newWindow] = await Promise.all([
        page.waitForEvent('popup'),
        page.click("'Follow On Twitter'")
    ]);

    console.log(await newWindow.url());*/
})