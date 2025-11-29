import { Locator, Page } from "playwright-core";

export class SaksProductDisplayPage {
  readonly page: Page;
  size00: Locator;
  sizeXXS: Locator;
  sizeXS: Locator;
  brand: Locator;
  addToBag: Locator;
  selectASize: Locator;
  plsSelectSizeMsg: Locator;
  decrementButton: Locator;
  incrementButton: Locator;
  miniCart: Locator;
  stockQtyExceeded: Locator;
  productImage: Locator;
  buttons: Locator;
  buttonImages: Locator;
  previousImageButton: Locator;
  nextImageButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.size00 = page.locator("//button[text()='00']");
    this.sizeXXS = page.locator("//button[text()='XX-Small']");
    this.sizeXS = page.locator("//button[@aria-label='X-Small']");
    this.brand = page.locator("//div[@itemprop='brand']");
    this.addToBag = page.locator("//button[text()='Add to Bag']");
    this.selectASize = page.locator("//button[text()='Select a size']");
    this.plsSelectSizeMsg = page.locator("//div[@class='MissingOption__container']");
    this.decrementButton= page.locator("//button[@data-testid='decrement-btn']");
    this.incrementButton = page.locator("//button[@data-testid='increment-btn']")
    this.miniCart = page.locator("//div[@class='MiniCart__title']")
    this.stockQtyExceeded = page.locator("//div[@id='STATUSCODE_STOCK_QUANTITY_EXCEEDED']");
    this.productImage = page.locator("//div[contains(@class,'ProductCarousel__small')]//div[@data-index='4']//img");
    this.buttons = page.locator("//div[contains(@class,'ProductCarousel__small')]//button[not(contains(@class, 'slick-arrow'))]");
    this.previousImageButton = page.locator("//div[contains(@class,'ProductCarousel__small')]//button[contains(@class,'slick-prev')]");
    this.nextImageButton = page.locator("//div[contains(@class,'ProductCarousel__small')]//button[contains(@class,'slick-next')]");
    this.buttonImages = page.locator("//div[contains(@class,'ProductCarousel__small')]//button[not(contains(@class, 'slick-arrow'))]//img");

  }

   async isXXSSizeAvailable(): Promise<boolean> {
        // Debug: See the actual HTML of all buttons
        // const buttonsHtml = await this.page.$$eval('button', buttons =>
        //     buttons.map(b => ({
        //         outerHTML: b.outerHTML.substring(0, 200), // limit size
        //         innerText: b.innerText,
        //         textContent: b.textContent,
        //         ariaLabel: b.getAttribute('aria-label')
        //     }))
        // );
        //console.log('All buttons on page:', JSON.stringify(buttonsHtml, null, 2));
        // Wait for PDP content
        await this.page.waitForSelector(
            "//button[text()='00' or text()='XX-Small']",
            { timeout: 8000 }
        ).catch(() => {});

        // Check if size buttons are visible
        const is00Visible = await this.size00.isVisible().catch(() => false);
        const isXXSVisible = await this.sizeXXS.isVisible().catch(() => false);

        return is00Visible || isXXSVisible;
    }

    async clickFirstSizeButton(){
        const buttons = this.page.locator("//div[@class='ProductOptionsSize__flexGrid layout__flexGrid']//button");
        // const count = await buttons.count();

        // for (let i = 0; i < count; i++) {
        //     const text = await buttons.nth(i).innerText();
        //     console.log(`Button ${i + 1}: ${text}`);
        // }
        await buttons.first().waitFor();
        await buttons.first().click();
    }
  
}
