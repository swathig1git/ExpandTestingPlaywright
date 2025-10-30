import {test} from "@playwright/test";

test("Upload Files Test", async({page})=>{
    await page.goto("https://www.lambdatest.com/selenium-playground/upload-file-demo");

    const [uploadFiles] = await Promise.all([
        page.waitForEvent('filechooser'),
        page.click("input[type='file']")
    ]);

    const isMultiple = uploadFiles.isMultiple();
    console.log("isMultiple", isMultiple);

    await uploadFiles.setFiles("uploadFiles/1.pdf");


})