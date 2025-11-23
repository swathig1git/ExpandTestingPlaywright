import { Page, Browser } from "playwright-core";
import{test, expect, request} from "@playwright/test"

test('Keyboard verify', async ({ page }) => {

  await page.goto('https://www.lambdatest.com/selenium-playground/key-press');

  const textBox = page.locator("#my_field");
  const result = page.locator("#result");
  await textBox.click();

  await page.keyboard.press('Enter');
  let resultString = await result.textContent()??"";
  resultString = resultString?.replace('You entered: ', '').trim();
  expect(resultString).toBe('ENTER');

  await page.keyboard.press('Shift');
  resultString = await result.textContent()??"";
  resultString = resultString?.replace('You entered: ', '').trim();
  expect(resultString).toBe('SHIFT');

  await page.keyboard.press('Control');
  resultString = await result.textContent()??"";
  resultString = resultString?.replace('You entered: ', '').trim();
  expect(resultString).toBe('CONTROL');

  await page.keyboard.press('ArrowUp');
  resultString = await result.textContent()??"";
  resultString = resultString?.replace('You entered: ', '').trim();
  expect(resultString).toBe('UP');

  await page.keyboard.press('A');
  resultString = await result.textContent()??"";
  resultString = resultString?.replace('You entered: ', '').trim();
  expect(resultString).toBe('A');

  await page.keyboard.press('1');
  resultString = await result.textContent()??"";
  resultString = resultString?.replace('You entered: ', '').trim();
  expect(resultString).toBe('1');

  await page.keyboard.press('Alt');
  resultString = await result.textContent()??"";
  resultString = resultString?.replace('You entered: ', '').trim();
  expect(resultString).toBe('ALT');

});

