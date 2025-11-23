import { Page, Browser } from "playwright-core";
import{test, expect, request} from "@playwright/test"

test('Hover Zoom verify', async ({ page }) => {

  await page.goto('https://www.lambdatest.com/selenium-playground/hover-demo');

  const image = page.locator('.image-card img');

// Get transform before hover
const beforeTransform = await image.evaluate(el => getComputedStyle(el).transform);
console.log('Before:', beforeTransform); // likely "none"

// Hover on image
await image.hover();

// Wait a little if animation
await page.waitForTimeout(300);

// Get transform after hover
const afterTransform = await image.evaluate(el => getComputedStyle(el).transform);
console.log('After:', afterTransform);

// Assert transform changed
expect(afterTransform).not.toBe(beforeTransform);

});

test('Hover Color Change verify', async ({ page }) => {

  await page.goto('https://www.lambdatest.com/selenium-playground/hover-demo');

  let button = page.locator('.bg-green-100');
  // Get the original color
  let originalColor = await button.evaluate(el => getComputedStyle(el).backgroundColor);
  // Hover over the button
  await button.hover();
  // Get the new color
  let hoverColor = await button.evaluate(el => getComputedStyle(el).backgroundColor);
  // Compare colors
  expect(hoverColor).not.toBe(originalColor);

  button = page.locator('.bg-green-200');
  // Get the original color
  originalColor = await button.evaluate(el => getComputedStyle(el).backgroundColor);
  // Hover over the button
  await button.hover();
  // Get the new color
  hoverColor = await button.evaluate(el => getComputedStyle(el).backgroundColor);
  // Compare colors
  expect(hoverColor).not.toBe(originalColor);

  let img = page.locator('.m-15 img');
  let msg = page.locator(".m-15 p");

  await img.scrollIntoViewIfNeeded();
  await msg.scrollIntoViewIfNeeded();

  let opacity = await msg.evaluate(el => getComputedStyle(el).opacity);
  expect(opacity).toBe('0');

  // Hover over the button
  await img.hover();
  //await page.pause();

  opacity = await msg.evaluate(el => getComputedStyle(el).opacity);
  expect(opacity).toBe('1');


});
