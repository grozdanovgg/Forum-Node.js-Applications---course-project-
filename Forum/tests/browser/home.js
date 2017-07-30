/* eslint-disable no-unused-expressions*/
const { expect } = require('chai');
const { setupDriver } = require('./utils/setup-driver');
const webdriver = require('selenium-webdriver');
const mocha = require('mocha');

describe('Items routes', () => {
    let driver = null;
    // let driver = new webdriver.Builder().build();

    const appUrl = 'http://localhost:3002';

    beforeEach(() => {
        driver = setupDriver('chrome');
    });

    it('To have a title', (done) => {
        driver.get(appUrl)
            .then(() => {
                return driver.getTitle();
            })
            .then((title) => {
                console.log(title);
                expect(title).not.to.be.undefined;
                done();
            });
    });
    it('Expect to have h1 text', (done) => {
        driver.get(appUrl)
            .then(() => {
                return driver.findElement(
                    webdriver.By.css('h1')
                );
            })
            .then((el) => {
                return el.getText();
            })
            .then((text) => {
                console.log(text);
                expect(text).to.contain('FAVOURITE');
                done();
            });
    });
});
