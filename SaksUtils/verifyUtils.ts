import { expect, Locator, Page } from "@playwright/test";

export async function verifyBrowseByButtons(
  browseByLocator: Locator,
  expectedList: string[]
) {
  // Wait until at least one button is rendered (page fully loaded)
  await browseByLocator.first().waitFor({ state: "visible", timeout: 10000 });

  // Extract visible button texts into an array
  const actualTexts = await browseByLocator.allInnerTexts();
  const normalized = actualTexts.map(t => t.trim());

  // Check each expected value
  for (const expected of expectedList) {
    const exists = normalized.some(text => text === expected);

    expect(exists, `❌ Missing browse-by button: "${expected}"
Actual buttons on page: ${JSON.stringify(normalized, null, 2)}
`).toBe(true);
  }
}
