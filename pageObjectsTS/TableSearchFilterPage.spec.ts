import { Locator, Page } from "playwright-core";

export class TableSearchFilterPage {
  readonly page: Page;
  filterAll: Locator;
  allRowsInFirstTable: Locator;
  visibleRowsFirstTable: Locator;

  filterButton: Locator;
  serialNumber: Locator;
  userName: Locator;
  firstName: Locator;
  lastName: Locator;
  allRowsInSecondTable: Locator;
  visibleRowsSecondTable: Locator;

  constructor(page: Page) {
    this.page = page;
    this.filterAll = page.locator("#task-table-filter");
    this.allRowsInFirstTable = page.locator("#task-table tbody tr");
    this.visibleRowsFirstTable = page.locator('#task-table tbody tr:visible');

    this.filterButton = page.locator(".btn.btn-default");
    this.serialNumber = page.locator("input[placeholder$='#']");
    this.userName = page.locator("input[placeholder$='Username']");
    this.firstName = page.locator("input[placeholder$='First Name']");
    this.lastName = page.locator("input[placeholder$='Last Name']");
    this.allRowsInSecondTable = page.locator(".input-section .table tbody tr");
    this.visibleRowsSecondTable = page.locator(".input-section .table tbody tr:visible");



  }


}