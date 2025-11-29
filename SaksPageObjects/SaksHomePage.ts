import { Locator, Page } from "playwright-core";

export class SaksHomePage {
  readonly page: Page;
  shopSaksCanada : Locator;
  designerDropdown: Locator;
  shopAllDesigners:Locator;
  featuredDesigners: Locator;
  allFeaturedDesigners:Locator;
  clothingDropdown: Locator;
  men: Locator;

  


  constructor(page: Page) {
    this.page = page;
    this.designerDropdown = page.locator("//a[text()='Designers']/parent::div");
    this.shopAllDesigners = page.locator("//a[text()='Shop All Designers']")
    this.featuredDesigners = page.locator("//a[text()='Designers']/parent::div//div[text()='Featured Designers']");
    this.allFeaturedDesigners = page.locator("//a[text()='Designers']/parent::div//a[@data-testid='megamenu-navigation-dropdown-link']");
    this.clothingDropdown = page.locator("//a[text()='Clothing' and @aria-controls='clothing-submenu']");
  
    this.shopSaksCanada = page.locator("//button[text() = 'SHOP SAKS CANADA']");
    this.men = page.locator("//a[text()='Men']");
  }

async clickOnBrandLink(brandName: string) {
  // Use double quotes in XPath if brand contains '
  const xpathBrandName = brandName.includes("'") 
    ? `//a[text()="Designers"]/parent::div//a[@data-testid='megamenu-navigation-dropdown-link' and text()="${brandName}"]`
    : `//a[text()='Designers']/parent::div//a[@data-testid='megamenu-navigation-dropdown-link' and text()='${brandName}']`;

  const locator = this.page.locator(xpathBrandName);

  // Safe click with try/catch
  try {
    await locator.click();
  } catch (error) {
    console.error(`Failed to click brand link: ${brandName}`, error);
  }
}
}
