/* eslint-disable no-unused-expressions*/
// @ts-ignore
const { expect } = require('chai');
// @ts-ignore
const { setupDriver } = require('../utils/setup-driver');
// @ts-ignore
const mocha = require('mocha'); // eslint-disable-line no-unused-vars
// @ts-ignore
const ui = require('../utils/ui');

describe('Posts', () => {
    let driver = null;
    // Uncomment this only to get intellisence, 
    // then use driver=null for real testing
    // let driver = new webdriver.Builder().build();

    const appUrl = 'http://localhost:3002';
    const username = 'TestUser-2';
    const password = '1234';
    const email = 'tests2@mail.com';
    const newPostTitle = 'Cats are GODS';
    const newPostText = 'Does anyone dissagree?';
    const newComment = 'Oh.. turtles are nice too';


    beforeEach(() => {
        driver = setupDriver('chrome');
        driver.manage().window().maximize();
        ui.setDriver(driver);
        return driver.get(appUrl);
    });
    // after(() => {
    //     ui.click('#nav-button-logout');
    // });
    afterEach(() => {
        return driver.quit();
    });
    describe('Login and create new posts', () => {
        it('Expect to register', (done) => {
            Promise.resolve()
                .then(() => ui.click('#nav-button-register'))
                .then(() => ui.setValue('#username', username))
                .then(() => ui.setValue('#email.input-xlarge', email))
                .then(() => ui.setValue('#password.input-xlarge', password))
                .then(() => ui.setValue('#password_confirm', password))
                .then(() => ui.click('#register-btn'))
                .then(() => ui.click('#title-nav-button'))
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
        it('Expect to write new post in Animals category', (done) => {
            Promise.resolve()
                .then(() => ui.click('#nav-button-login'))
                .then(() => ui.setValue('#username-login-input', username))
                .then(() => ui.setValue('#password-login-input', password))
                .then(() => ui.click('#login-btn'))
                .then(() => ui.getText('#nav-button-user span'))
                .then(() => ui.click('#animals'))
                .then(() => {
                    ui.setValue(
                        '.form-horizontal .control-group:first-child .controls .input-xlarge', // eslint-disable-line max-len
                        newPostTitle
                    );
                })
                .then(() => {
                    ui.setValue(
                        '.form-horizontal .control-group:nth-child(2) .controls .form-control', // eslint-disable-line max-len
                        newPostText
                    );
                })
                .then(() => ui.click('#post-button'))
                .then(() => ui.click('#title-nav-button'))
                .then(() => ui.click('#animals'))
                .then(() => {
                    return ui.getText('.post-title');
                })
                .then((postTitle) => {
                    expect(postTitle).to.equals(newPostTitle);
                    done();
                })
                .catch((err) => {
                    throw new Error(
                        'Promise was unexpectedly fulfilled. Result: ' + err
                    );
                });
        });
        it('Expect to write comment on the last post in Animals category',
            (done) => {
                Promise.resolve()
                    .then(() => ui.click('#nav-button-login'))
                    .then(() => ui.setValue('#username-login-input', username))
                    .then(() => ui.setValue('#password-login-input', password))
                    .then(() => ui.click('#login-btn'))
                    .then(() => ui.getText('#nav-button-user span'))
                    .then(() => ui.click('#animals'))
                    .then(() => ui.click('.post-title'))
                    .then(() => ui.setValue('form input', newComment))
                    .then(() => ui.click('form button'))
                    .then(() => {
                        return ui.getText('.comment-text');
                    })
                    .then((comment) => {
                        expect(comment).to.equals(newComment);
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
