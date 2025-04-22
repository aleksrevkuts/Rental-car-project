const { calculatePrice } = require("../rentalPrice");

test("Driver under 18 cannot rent a car", () => {

  const pickup = "Tallinn";
  const dropoff = "Tartu";
  const pickupDate = "2024-06-10";
  const dropoffDate = "2024-06-15";
  const type = "Compact";
  const age = 17;
  const licenseYears = 2;

  const expectedMessage = "Driver too young - cannot quote the price";

  expect(calculatePrice(pickup, dropoff, pickupDate, dropoffDate, type, age, licenseYears)).toBe(expectedMessage);
});

test("Driver under 21 can only rent compact", () => {

  const pickup = "Tallinn";
  const dropoff = "Tartu";
  const pickupDate = "2024-06-10";
  const dropoffDate = "2024-06-15";
  const type = "Electric";
  const age = 19;
  const licenseYears = 2;

  const expectedMessage = "Drivers 21 y/o or less can only rent Compact vehicles";

  expect(calculatePrice(pickup, dropoff, pickupDate, dropoffDate, type, age, licenseYears)).toBe(expectedMessage);
});



test("Driver with license years less than 1, cannot rent a car", () => {

  const pickup = "Tallinn";
  const dropoff = "Tartu";
  const pickupDate = "2024-06-10";
  const dropoffDate = "2024-06-15";
  const type = "Compact";
  const age = 23;
  const licenseYears = 0.5;

  const expectedMessage = "Driver does not meet rental requirements";

  expect(calculatePrice(pickup, dropoff, pickupDate, dropoffDate, type, age, licenseYears)).toBe(expectedMessage);
});

test("should apply 15% increase for High season", () => {
  const pickup = "2025-07-01";
  const dropoff = "2025-07-06";
  const pickupDate = new Date(pickup);
  const dropoffDate = new Date(dropoff);
  const type = "Compact";
  const age = 30;
  const licenseYears = 5;

  const expectedPrice = 30 * 6 * 1.15;
  expect(calculatePrice(pickup, dropoff, pickupDate, dropoffDate, type, age, licenseYears)).toBe(`$${expectedPrice.toFixed(2)}`);
});

test('should apply 50% increase for Racer under 25 in High season', () => {
  const pickup = "2025-07-01";
  const dropoff = "2025-07-05";
  const pickupDate = new Date(pickup);
  const dropoffDate = new Date(dropoff);
  const type = "Racer";
  const age = 24;
  const licenseYears = 6;

  const basePrice = 24 * 5 * 1.15;

  const expectedPrice = basePrice * 1.5;

  expect(calculatePrice(pickup, dropoff, pickupDate, dropoffDate, type, age, licenseYears)).toBe(`$${expectedPrice.toFixed(2)}`);
});

test('should decrease price by 10% if rent is more than 10 days', () => {
  const pickup = "2025-02-01";
  const dropoff = "2025-02-15";
  const pickupDate = new Date(pickup);
  const dropoffDate = new Date(dropoff);
  const type = "Compact";
  const age = 27;
  const licenseYears = 6;

  const basePrice = 27 * 15;

  const expectedPrice = basePrice * 0.9;

  expect(calculatePrice(pickup, dropoff, pickupDate, dropoffDate, type, age, licenseYears)).toBe(`$${expectedPrice.toFixed(2)}`);
});

test('should increase price by 30% if license years is less than 2 years', () => {
  const pickup = "2025-02-01";
  const dropoff = "2025-02-05";
  const pickupDate = new Date(pickup);
  const dropoffDate = new Date(dropoff);
  const type = "Compact";
  const age = 27;
  const licenseYears = 1;

  const basePrice = 27 * 5;

  const expectedPrice = basePrice * 1.3;

  expect(calculatePrice(pickup, dropoff, pickupDate, dropoffDate, type, age, licenseYears)).toBe(`$${expectedPrice.toFixed(2)}`);
});

test('should increase price by 30% if license years is less than 3 years and season is high', () => {
  const pickup = "2025-07-01";
  const dropoff = "2025-07-05";
  const pickupDate = new Date(pickup);
  const dropoffDate = new Date(dropoff);
  const type = "Compact";
  const age = 27;
  const licenseYears = 1;

  const basePrice = 27 * 5 * 1.15 * 1.3;

  const expectedPrice = basePrice + 75;

  expect(calculatePrice(pickup, dropoff, pickupDate, dropoffDate, type, age, licenseYears)).toBe(`$${expectedPrice.toFixed(2)}`);
});


