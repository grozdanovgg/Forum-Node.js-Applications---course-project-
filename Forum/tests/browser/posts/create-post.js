/* eslint-disable no-unused-expressions*/
const { expect } = require('chai');
const { setupDriver } = require('../utils/setup-driver');
const webdriver = require('selenium-webdriver');
const mocha = require('mocha');
const ui = require('../utils/ui');

describe('Posts', () => {
    let driver = null;
    // Uncomment this only to get intellisence, then use driver=null for real testing
    // let driver = new webdriver.Builder().build();
    const appUrl = 'http://localhost:3002';
    const username = 'TestUser-1';
    const password = '1234';
    const email = 'tests@mail.com';

    beforeEach(() => {
        driver = setupDriver('chrome');
        driver.manage().window().maximize();
        ui.setDriver(driver);
        return driver.get(appUrl);
    });
    // afterEach(() => {
    //     return driver.quit();
    // });

    describe('Write new posts in categories', () => {
        beforeEach(() => {
            return Promise.resolve()
                .then(() => {
                    return ui.getTexts('#nav-button-user span');
                })
                .then((usernameTexts) => {
                    if (usernameTexts.length === 0) {
                        //Login
                        Promise.resolve()
                            .then(() => ui.click('#nav-button-login'))
                            .then(() => ui.setValue('#username-login-input', username))
                            .then(() => ui.setValue('#password-login-input', password))
                            .then(() => ui.click('#login-btn'));
                    }
                });
        });
        it('Expect to be logged in', (done) => {
            Promise.resolve()
                .then(() => ui.getText('#nav-button-user span'))
                .then((user) => {
                    expect(user).to.equals(username.toUpperCase());
                    done();
                })
                .catch((err) => {
                    throw new Error('Promise was unexpectedly fulfilled. Result: ' + err);
                });
        });
        it('Write new post in Animals category', (done) => {
            Promise.resolve()
                .then(() => ui.click('#Animals'))
                .then(() => {
                    ui.setValue('form-horizontal control-group controls input-xlarge', 'Cats are GODS');
                })
                .catch((err) => {
                    throw new Error('Promise was unexpectedly fulfilled. Result: ' + err);
                });
        });
    });
});
