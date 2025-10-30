import {expect, test} from "@playwright/test"

test.only("frames", async({page})=>{
    await page.goto("https://letcode.in/frame");
    const allFrames = page.frames();
    console.log("Num of frames: " + allFrames.length);

    const myFrame = page.frame("firstFr");
    await myFrame?.fill("input[name='fname']", "swathi");
    await myFrame?.fill("input[name='lname']", "playwright");

    expect (await myFrame?.locator("p.has-text-info").textContent()).toContain("You have entered ");

    const innerFrame = myFrame?.frameLocator("iframe[src='innerframe']");
    await innerFrame?.locator("input[name='email']").fill("swathi@playwright.com")

    await page.waitForTimeout(3000);
})