import { Page } from '@playwright/test';

export class FlightDetailsPage {
  constructor(public page: Page) {}

  async verifyPriceBreakdown() {
    const baseFare = await this.page.locator('//div[contains(text(), "Base Fare")]/following-sibling::div').textContent();
    const taxes = await this.page.locator('//div[contains(text(), "Taxes")]/following-sibling::div').textContent();
    const totalFare = await this.page.locator('//div[contains(text(), "Total Fare")]/following-sibling::div').textContent();

    if (Number(baseFare) + Number(taxes) !== Number(totalFare)) {
      throw new Error('Price breakdown mismatch!');
    }
  }

  async applyPromoCode(code: string) {
    await this.page.locator('//input[@id="txtPromotionalCode"]').fill(code);
    await this.page.locator('//button[contains(text(), "Apply")]').click();
  }

  async verifyInvalidPromoCodeError() {
    const error = await this.page.locator('//div[contains(@class, "promoError")]').textContent();
    if (!error?.includes('Invalid promo code')) {
      throw new Error('Invalid promo code error not displayed!');
    }
  }
}

