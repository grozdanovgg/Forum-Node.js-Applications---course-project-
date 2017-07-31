/* eslint-disable no-unused-expressions*/
const { expect } = require('chai');
const { setupDriver } = require('../utils/setup-driver');
const webdriver = require('selenium-webdriver');
const mocha = require('mocha');
const ui = require('../utils/ui');

describe('User authentication', () => {
    let driver = null;
    // Uncomment this only to get intellisence, then use driver=null for real testing
    // let driver = new webdriver.Builder().build();

    const appUrl = 'http://localhost:3002';

    beforeEach(() => {
        driver = setupDriver('chrome');
    });

    describe('Valid user registration', () => {
        beforeEach((done) => {
            Promise.resolve()
                // @ts-ignore
                .then(() => driver.get(appUrl))
                .then(() => {
                    return driver.findElement(webdriver.By.css('.navbar-toggler'));
                })
                .then((el) => {
                    if (el) {
                        el.click();
                    }
                })
                .then(() => {
                    return driver.findElement(
                        webdriver.By.css('#nav-button-register')
                    );
                })
                .then((btn) => {
                    btn.click();
                    done();
                });
        });
        it('Expext to complete register process', (done) => {
            const username = 'TestUser-1';
            const password = '1234';
            const email = 'tests@mail.com';
            Promise.resolve()
                .then(() => {
                    return driver.findElement(webdriver.By.css('#username'));
                })
                .then((input) => {
                    input.sendKeys(username);
                })
                .then(() => {
                    return driver.findElement(webdriver.By.css('#email.input-xlarge'));
                })
                .then((input) => {
                    input.sendKeys(email);
                })
                .then(() => {
                    return driver.findElement(webdriver.By.css('#password.input-xlarge'));
                })
                .then((input) => {
                    input.sendKeys(password);
                })
                .then(() => {
                    return driver.findElement(webdriver.By.css('#password_confirm'));
                })
                .then((input) => {
                    input.sendKeys(password);
                })
                .then(() => {
                    return driver.findElement(
                        webdriver.By.css('#register')
                    );
                })
                .then((btn) => {
                    btn.click();
                    // done();
                })
                .then(() => {
                    return driver.findElement(webdriver.By.css('.navbar-toggler'));
                })
                .then((el) => {
                    if (el) {
                        el.click();
                    }
                })
                .then(() => {
                    return driver.findElement(webdriver.By.css('#user-profile-button'));
                })
                .then((user) => {
                    return user.getText();
                })
                .then((user) => {
                    expect(user).to.equals(username.toUpperCase());
                    done();
                });
        });
    });
});
