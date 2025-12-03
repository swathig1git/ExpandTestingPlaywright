import { Locator, Page } from "playwright-core";

export class SaksProductDisplayPage {
  readonly page: Page;
  //locators common for all items
  productName: Locator;
  originalPrice: Locator;
  dutiesIncluded: Locator;
  colorOptions: Locator;
  inputQuantity: Locator;
  decrementButton: Locator;
  incrementButton: Locator;
  addToFavoritesHeart: Locator;
  favoritesContainer: Locator;

  //locators for specific types
  addToBag: Locator;
  brandName: Locator;
  size00: Locator;
  sizeXXS: Locator;
  sizeXS: Locator;
  brand: Locator;
  selectASize: Locator;
  plsSelectSizeMsg: Locator;
  miniCart: Locator;
  stockQtyExceeded: Locator;
  productImage: Locator;
  buttons: Locator;
  buttonImages: Locator;
  previousImageButton: Locator;
  nextImageButton: Locator;
  sizeContainer: Locator;
  sizeButtons: Locator;
  sizeGuide: Locator;
  sizeGuideTable: Locator;
  menOrWomen: Locator;
  sizeGuideCategory: Locator;
  sizeGuideClose: Locator;

  

  constructor(page: Page) {
    this.page = page;
    this.brandName = page.locator("h3[data-testid$='brand']");
    this.productName = page.locator("h1[data-testid$='product-name']");
    this.size00 = page.locator("//button[text()='00']");
    this.sizeXXS = page.locator("//button[text()='XX-Small']");
    this.sizeXS = page.locator("//button[@aria-label='X-Small']");
    this.brand = page.locator("//div[@itemprop='brand']");
    this.addToBag = page.locator("//button[text()='Add to Bag']");
    this.selectASize = page.locator("//button[text()='Select a size']");
    this.plsSelectSizeMsg = page.locator("//div[@class='MissingOption__container']");

    this.miniCart = page.locator("//div[@class='MiniCart__title']")
    this.stockQtyExceeded = page.locator("//div[@id='STATUSCODE_STOCK_QUANTITY_EXCEEDED']");
    this.productImage = page.locator("//div[contains(@class,'ProductCarousel__small')]//div[@data-index='4']//img");
    this.buttons = page.locator("//div[contains(@class,'ProductCarousel__small')]//button[not(contains(@class, 'slick-arrow'))]");
    this.previousImageButton = page.locator("//div[contains(@class,'ProductCarousel__small')]//button[contains(@class,'slick-prev')]");
    this.nextImageButton = page.locator("//div[contains(@class,'ProductCarousel__small')]//button[contains(@class,'slick-next')]");
    this.buttonImages = page.locator("//div[contains(@class,'ProductCarousel__small')]//button[not(contains(@class, 'slick-arrow'))]//img");
    this.sizeContainer = page.locator("//div[contains(@class,'ProductOptionsSize__flexGrid')]");
    this.sizeButtons = this.sizeContainer.locator("button");
    this.sizeGuide = page.locator(".ProductSizeGuidesVB__sizeGuideButton");
    this.sizeGuideTable = page.locator(".ProductSizeGuidesVB__multipleTablesContainer");
    this.menOrWomen = page.locator(".Breadcrumbs__item:first-child");
    this.sizeGuideCategory = page.locator(".SelectableMenu__selectableMenuButton");
    this.sizeGuideClose = page.locator(".Modal__close");
    this.addToFavoritesHeart = page.locator(".AddToCart__favoriteContainer button")
    this.favoritesContainer = page.locator("a.FavoritesLink__container");
    this.originalPrice = page.locator("[data-testid*='originalPrice']");
    this.dutiesIncluded = page.locator("[data-testid*='promotionAdditional'] .HtmlText__htmlText");
    this.colorOptions = page.locator("[data-testid*='color-options']");
    this.inputQuantity = page.locator("[data-testid*='quantity-input']");
    this.decrementButton= page.locator("[data-testid*='decrement-btn']");
    this.incrementButton = page.locator("[data-testid*='increment-btn']")

  }
async isXXSSizeAvailable(): Promise<boolean> {
    const xxsButton = this.page.locator("//button[contains(text(),'00') or contains(text(),'XX-Small')]");

    try {
        // This waits for the button to be:
        // - attached to DOM
        // - visible (opacity > 0, display not none, etc.)
        // - not covered by another element
        // - stable (not animating)
        await xxsButton.waitFor({
            state: 'visible',
            timeout: 10000
        });

        // Final double-check it's truly interactable (defense in depth)
        const isVisible = await xxsButton.isVisible();
        const isEnabled = await xxsButton.isEnabled();

        if (isVisible && isEnabled) {
            console.log('XXS/00 size is available and interactable');
            return true;
        } else {
            console.log('XXS/00 button exists but not interactable (disabled or hidden)');
            return false;
        }

    } catch (error) {
        console.log('XXS/00 size not available or blocked by overlay');
        return false;
    }
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
