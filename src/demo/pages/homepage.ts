import { Page } from '@playwright/test';

export class Homepage {
  constructor(public page: Page) {}

  async goto() {
    await this.page.goto('https://www.easemytrip.com/');
  }

  async closePopup() {
    const popup = this.page.locator('//div[contains(@class, "emtClose")]/a');
    if (await popup.isVisible()) {
      await popup.click();
    }
  }

  async selectFlightsTab() {
    await this.page.locator('//a[contains(text(), "Flights")]').click();
  }

  async enterCities(from: string, to: string) {
    await this.page.locator("//input[@id= 'FromSector_show']").fill(from);
    //await this.page.keyboard.press('Enter');

    await this.page.locator("//input[@id= 'Editbox13_show']").fill(to);
    //await this.page.keyboard.press('Enter');
  }

  async selectLowestFareDate() {

    await this.page.waitForSelector('//div[contains(@class, "ui-datepicker-calendar")]');

    const days = this.page.locator('//div[contains(@class, "ui-datepicker-calendar")]//a');
    const count = await days.count();

    let lowestPrice = Infinity;
    let lowestPriceDate = '';

    for (let i = 0; i < count; i++) {
      const date = await days.nth(i).textContent(); 
      const price = Number(await days.nth(i).getAttribute('data-price')) || Infinity; 

      if (price < lowestPrice) {
        lowestPrice = price;
        lowestPriceDate = date?.trim() || ''; 
      }
    }

    console.log(`Lowest fare date: ${lowestPriceDate}, Price: ${lowestPrice}`);

    if (lowestPriceDate) {
      await this.page.locator(`//a[text()="${lowestPriceDate}"]`).click();
    } else {
      throw new Error('No valid dates with fares found!');
    }
  }

  async searchFlights() {
    await this.page.locator('//input[@value="Search"]').click();
  }
}
