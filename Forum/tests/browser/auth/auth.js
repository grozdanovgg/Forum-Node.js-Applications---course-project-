// @ts-nocheck
/* eslint-disable no-unused-expressions*/
const { expect } =
// @ts-ignore
require('chai');
const { setupDriver } = require('../utils/setup-driver');
const ui = require('../utils/ui');

describe('User authentication', () => {
    let driver = null;
    // Uncomment this only to get intellisence, 
    // then use driver=null for real testing
    // let driver = new webdriver.Builder().build();

    const appUrl = 'http://localhost:3002';
    const username = 'TestUser-1';
    const password = '1234';
    const email = 'tests1@mail.com';
    const errMsg = 'Username is taken';
    beforeEach(() => {
        driver = setupDriver('chrome');
        driver.manage().window().maximize();
        ui.setDriver(driver);
        return driver.get(appUrl);
    });

    afterEach(() => {
        return driver.quit();
    });
    describe('User authentication methods', () => {
        it('Expext to register user', (done) => {
            Promise.resolve()
                .then(() => ui.click('#nav-button-register'))
                .then(() => ui.setValue('#username', username))
                .then(() => ui.setValue('#email.input-xlarge', email))
                .then(() => ui.setValue('#password.input-xlarge', password))
                .then(() => ui.setValue('#password_confirm', password))
                .then(() => ui.click('#register-btn'))
                .then(() => ui.getText('#nav-button-user span'))
                .then((user) => {
                    expect(user).to.equals(username.toUpperCase());
                    done();
                })
                .catch((err) => console.log(err));
        });
        it('Expext to NOT ALLOW DUPLICATE user', (done) => {
            Promise.resolve()
                .then(() => ui.click('#nav-button-register'))
                .then(() => ui.setValue('#username', username))
                .then(() => ui.setValue('#email.input-xlarge', email))
                .then(() => ui.setValue('#password.input-xlarge', password))
                .then(() => ui.setValue('#password_confirm', password))
                .then(() => ui.click('#register-btn'))
                .then(() => ui.getText('#registering-error-message'))
                .then((msg) => {
                    expect(msg).to.equals(errMsg);
                    done();
                })
                .catch((err) => {
                    throw new Error(
                        'Promise was unexpectedly fulfilled. Result: ' + err
                    );
                });
        });
        it('Expext to login', (done) => {
            Promise.resolve()
                .then(() => ui.click('#nav-button-login'))
                .then(() => ui.setValue('#username-login-input', username))
                .then(() => ui.setValue('#password-login-input', password))
                .then(() => ui.click('#login-btn'))
                .then(() => ui.getText('#nav-button-user span'))
                .then((user) => {
                    expect(user).to.equals(username.toUpperCase());
                    done();
                })
                .catch((err) => {
                    throw new Error(
                        'Promise was unexpectedly fulfilled. Result: ' + err
                    );
                });
        });
        it('Expext to open user profile settings', (done) => {
            Promise.resolve()
                .then(() => ui.click('#nav-button-login'))
                .then(() => ui.setValue('#username-login-input', username))
                .then(() => ui.setValue('#password-login-input', password))
                .then(() => ui.click('#login-btn'))
                .then(() => ui.getText('#nav-button-user span'))
                .then(() => ui.click('#nav-button-user'))
                .then(() => ui.click('.btn-success'))
                .then(() => {
                    return ui.getText('.btn-success');
                })
                .then((buttonText) => {
                    expect(buttonText).to.equals('Change Picture');
                    done();
                })
                .catch((err) => {
                    throw new Error(
                        'Promise was unexpectedly fulfilled. Result: ' + err
                    );
                });
        });
        it('Expext to logout', (done) => {
            Promise.resolve()
                .then(() => ui.click('#nav-button-login'))
                .then(() => ui.setValue('#username-login-input', username))
                .then(() => ui.setValue('#password-login-input', password))
                .then(() => ui.click('#login-btn'))
                .then(() => ui.getText('#nav-button-user span'))
                .then(() => ui.click('#nav-button-logout'))
                .then(() => {
                    return ui.getText('.navbar-nav li:last-child a span');
                })
                .then((buttonText) => {
                    expect(buttonText).to.equals('ABOUT');
                    done();
                })
                .catch((err) => {
                    throw new Error(
                        'Promise was unexpectedly fulfilled. Result: ' + err
                    );
                });
        });
    });
});
