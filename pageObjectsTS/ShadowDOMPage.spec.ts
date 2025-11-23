import { Locator, Page } from "playwright-core";

export class ShadowDOMPage {
  readonly page: Page;
  shadowHost: Locator;
  name: Locator;
  email: Locator;

  shadowHost1: Locator;
  userName: Locator;
  emailAddress: Locator;
  password: Locator;
  confirmPassword: Locator;


  constructor(page: Page) {
    this.page = page;
    this.shadowHost = page.locator('#shadow_host');
    this.name = this.shadowHost.locator('input[placeholder="Name"]');
    this.email = this.shadowHost.locator('input[placeholder="Email"]');

    this.shadowHost1 = page.locator('shadow-signup-form');
    this.userName = this.shadowHost1.locator("input[name='username']")
    this.emailAddress = this.shadowHost1.locator("input[name='email']");
    this.password = this.shadowHost1.locator("input[name='password']");
    this.confirmPassword = this.shadowHost1.locator("input[name='confirm_password']");


  }


}