// @ts-ignore
const webdriver = require('selenium-webdriver');
const setupDriver = (browser) => {
    const driver =
        new webdriver.Builder()
        .usingServer('http://localhost:9515')
        .withCapabilities({ browserName: browser })
        .build();
    return driver;
};

// @ts-ignore
module.exports = { setupDriver };
