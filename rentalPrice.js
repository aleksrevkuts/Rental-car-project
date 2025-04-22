function calculatePrice(pickup, dropoff, pickupDate, dropoffDate, type, age, licenseYears) {
    const carType = getCarType(type);
    const days = getDays(pickupDate, dropoffDate);
    const season = getSeason(pickupDate, dropoffDate);

    if (isDriverYoung(age)) {
        return "Driver too young - cannot quote the price";
    }
    if (isDriverLimited(age, carType)) {
        return "Drivers 21 y/o or less can only rent Compact vehicles";
    }
    if (licenseYears < 1) {
        return "Driver does not meet rental requirements";
    }

    let rentalPrice = getRentalPrice(age, days);
    rentalPrice = isDriverUnder25(rentalPrice, age, carType, season);
    rentalPrice = isHighSeason(rentalPrice, season);
    rentalPrice = isLongRent(rentalPrice, days, season);
    rentalPrice = applyLicensePenalty(rentalPrice, licenseYears, days, season);

    return formatPrice(rentalPrice);
}

function isDriverYoung(age) {
    return age < 18;
}

function isDriverLimited(age, carType) {
    return age <= 21 && carType !== "Compact";
}

function getRentalPrice(age, days) {
    return age * days;
}

function isDriverUnder25(price, age, carType, season) {
    if (carType === "Racer" && age <= 25 && season === "High") {
        return price * 1.5;
    }
    return price;
}

function isHighSeason(price, season) {
    if (season === "High") {
        return price * 1.15;
    }
    return price;
}

function isLongRent(price, days, season) {
    if (days > 10 && season === "Low") {
        return price * 0.9;
    }
    return price;
}

function applyLicensePenalty(price, licenseYears, days, season) {
    if (licenseYears < 2) {
        price *= 1.3;
    }
    if (licenseYears < 3 && season === "High") {
        price += 15 * days;
    }
    return price;
}

function formatPrice(price) {
    return "$" + price.toFixed(2);
}

function getCarType(type) {
    const carTypes = {
        Compact: "Compact",
        Electric: "Electric",
        Cabrio: "Cabrio",
        Racer: "Racer"
    };
    return carTypes[type] || "Unknown";
}

function getDays(pickupDate, dropoffDate) {
    const oneDay = 24 * 60 * 60 * 1000;
    const firstDate = new Date(pickupDate);
    const secondDate = new Date(dropoffDate);

    return Math.round(Math.abs((firstDate - secondDate) / oneDay)) + 1;
}

function getSeason(pickupDate, dropoffDate) {
    const pickup = new Date(pickupDate);
    const dropoff = new Date(dropoffDate);

    const start = 4;
    const end = 10;

    const pickupMonth = pickup.getMonth() + 1;
    const dropoffMonth = dropoff.getMonth() + 1;

    if (
        (pickupMonth >= start && pickupMonth <= end) ||
        (dropoffMonth >= start && dropoffMonth <= end) ||
        (pickupMonth < start && dropoffMonth > end)
    ) {
        return "High";
    }
    return "Low";
}

exports.calculatePrice = calculatePrice;
exports.isHighSeason = isHighSeason;
exports.isDriverUnder25 = isDriverUnder25;
exports.isLongRent = isLongRent;
exports.applyLicensePenalty = applyLicensePenalty;
