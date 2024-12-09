import { test } from '@playwright/test';
import { Homepage } from '../pages/homepage';
import { FlightSearchPage } from '../pages/flightSearchPage';
import { FlightDetailsPage } from '../pages/flightDetailsPage';

test.describe('EaseMyTrip Automation', () => {
  let homepage: Homepage;
  let flightSearchPage: FlightSearchPage;
  let flightDetailsPage: FlightDetailsPage;

  // Run once before all tests to set up common actions
  test.beforeAll(async ({ page }) => {
    homepage = new Homepage(page);
    flightSearchPage = new FlightSearchPage(page);
    flightDetailsPage = new FlightDetailsPage(page);

    // Navigate to homepage and close popup
    await homepage.goto();
    await homepage.closePopup();
  });

  // Test 1: Navigate to the Flights tab and enter cities
  test('Should select flights tab and enter cities', async ({ page }) => {
    await homepage.selectFlightsTab();
    await homepage.enterCities('Jaipur', 'Bangalore');
  });

  // Test 2: Select the date with the lowest fare
  test('Should select the date with the lowest fare', async ({ page }) => {
    await homepage.selectLowestFareDate();
  });

  // Test 3: Search for flights
  test('Should search flights', async ({ page }) => {
    await homepage.searchFlights();
  });

  // Test 4: Verify search results are displayed
  test('Should verify search results are displayed', async ({ page }) => {
    await flightSearchPage.verifySearchResults();
  });

  // Test 5: Select the cheapest flight
  test('Should select the cheapest flight', async ({ page }) => {
    await flightSearchPage.selectCheapestFlight();
  });

  // Test 6: Verify price breakdown
  test('Should verify price breakdown', async ({ page }) => {
    await flightDetailsPage.verifyPriceBreakdown();
  });

  // Test 7: Apply an invalid promo code and verify error message
  test('Should show error for invalid promo code', async ({ page }) => {
    await flightDetailsPage.applyPromoCode('INVALIDCODE');
    await flightDetailsPage.verifyInvalidPromoCodeError();
  });
});
