import { Page } from '@playwright/test';

export class FlightSearchPage {
  constructor(public page: Page) {}

  async verifySearchResults() {

    await this.page.waitForSelector('//div[contains(@class, "fltTktWrap")]', { timeout: 10000 });


    const searchResults = this.page.locator('//div[contains(@class, "fltTktWrap")]');
    const count = await searchResults.count();

    console.log(`Number of search results found: ${count}`);
    if (count === 0) {
      throw new Error('No search results found!');
    }
  }

  async selectCheapestFlight() {

    await this.page.waitForSelector('//div[contains(@class, "fltPrice")]');

    
    const priceElements = this.page.locator('//div[contains(@class, "fltPrice")]');
    const count = await priceElements.count();

    let lowestPrice = Infinity;
    let cheapestFlightIndex = -1;

    for (let i = 0; i < count; i++) {
      const priceText = await priceElements.nth(i).textContent(); 
      const price = Number(priceText?.replace(/[^\d]/g, '')); 

      if (price < lowestPrice) {
        lowestPrice = price;
        cheapestFlightIndex = i; 
      }
    }

    if (cheapestFlightIndex === -1) {
      throw new Error('No valid flights found to select!');
    }

    console.log(`Cheapest flight price: ${lowestPrice}`);

    const flightContainer = this.page.locator('//div[contains(@class, "fltTktWrap")]').nth(cheapestFlightIndex);
    await flightContainer.locator('//*[@id="ResultDiv"]/div/div/div[4]/div[2]/div[1]/div[1]/div[6]/button[1]').click();
  }
}
