import { chromium, test } from "@playwright/test";

test ("Login demo", async() => {
    const browser = await chromium.launch({
        headless: false
    });
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://ecommerce-playground.lambdatest.io/");
    await page.hover("//a[@data-toggle='dropdown']/div/span[contains(., 'My account')]");
    await page.click("text=Login");

    await page.fill("#input-email", "swathi.g12025@gmail.com");
    await page.fill("#input-password", "Pass123");
    await page.click("input[value='Login']");

    await page.waitForTimeout(5000);

    const context1 = await browser.newContext();

    const page1 = await context1.newPage();
    (await page1).goto("https://ecommerce-playground.lambdatest.io/index.php?route=account/login");
    await page.waitForTimeout(5000);
})