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
    const username = 'TestUser-2';
    const password = '1234';
    const email = 'tests@mail.com';
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
        it('Expect to login', (done) => {
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
                    throw new Error('Promise was unexpectedly fulfilled. Result: ' + err);
                });
        });
        it('Expect to write new post in Animals category', (done) => {
            Promise.resolve()
                .then(() => ui.click('#animals'))
                .then(() => {
                    ui.setValue('.form-horizontal .control-group:first-child .controls .input-xlarge', newPostTitle);
                })
                .then(() => {
                    ui.setValue('.form-horizontal .control-group:nth-child(2) .controls .form-control', newPostText);
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
                    throw new Error('Promise was unexpectedly fulfilled. Result: ' + err);
                });
        });
        it('Expect to write comment on the last post in Animals category', (done) => {
            Promise.resolve()
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
                    throw new Error('Promise was unexpectedly fulfilled. Result: ' + err);
                });
        });
        it('Expext to logout', (done) => {
            Promise.resolve()
                .then(() => ui.click('#nav-button-logout'))
                .then(() => {
                    return ui.getText('.navbar-nav li:last-child a span');
                })
                .then((buttonText) => {
                    expect(buttonText).to.equals('ABOUT');
                    done();
                })
                .catch((err) => {
                    throw new Error('Promise was unexpectedly fulfilled. Result: ' + err);
                });
        });
    });
});


// /* eslint-disable no-unused-expressions*/
// const { expect } = require('chai');
// const { setupDriver } = require('../utils/setup-driver');
// const webdriver = require('selenium-webdriver');
// const mocha = require('mocha');
// const ui = require('../utils/ui');

// describe('Posts', () => {
//     let driver = null;
//     // Uncomment this only to get intellisence, then use driver=null for real testing
//     // let driver = new webdriver.Builder().build();
//     const appUrl = 'http://localhost:3002';
//     const username = 'TestUser-2';
//     const password = '1234';
//     const email = 'tests2@mail.com';
//     const newPostTitle = 'Cats are GODS';
//     const newPostText = 'Does anyone dissagree?';

//     beforeEach(() => {
//         driver = setupDriver('chrome');
//         driver.manage().window().maximize();
//         ui.setDriver(driver);
//         return driver.get(appUrl);
//     });
//     afterEach(() => {
//         return driver.quit();
//     });

//     // after(() => {
//     //     ui.click('#nav-button-logout');
//     // });

//     describe('Write new posts in categories', () => {
//         before(() => {
//             Promise.resolve()
//                 .then(() => ui.click('#nav-button-register'))
//                 .then(() => ui.setValue('#username', username))
//                 .then(() => ui.setValue('#email.input-xlarge', email))
//                 .then(() => ui.setValue('#password.input-xlarge', password))
//                 .then(() => ui.setValue('#password_confirm', password))
//                 .then(() => ui.click('#register-btn'))
//                 .then(() => ui.click('#title-nav-button'));
//         });
//         it('Expect to be logged in', (done) => {
//             Promise.resolve()
//                 .then(() => ui.getText('#nav-button-user span'))
//                 .then((user) => {
//                     expect(user).to.equals(username.toUpperCase());
//                     done();
//                 })
//                 .catch((err) => {
//                     throw new Error('Promise was unexpectedly fulfilled. Result: ' + err);
//                 });
//         });
//         it('Write new post in Animals category', (done) => {
//             Promise.resolve()
//                 .then(() => ui.click('#animals'))
//                 .then(() => {
//                     ui.setValue('.form-horizontal .control-group:first-child .controls .input-xlarge', newPostTitle);
//                 })
//                 .then(() => {
//                     ui.setValue('.form-horizontal .control-group:nth-child(2) .controls .form-control', newPostText);
//                 })
//                 .then(() => ui.click('#post-button'))
//                 .then(() => {
//                     return ui.getText('.post-title');
//                 })
//                 .then((postTitle) => {
//                     console.log(postTitle);
//                     expect(postTitle).to.equals(newPostTitle);
//                     done();
//                 })
//                 .catch((err) => {
//                     throw new Error('Promise was unexpectedly fulfilled. Result: ' + err);
//                 });
//         });
//         it('Expext to logout', (done) => {
//             Promise.resolve()
//                 .then(() => ui.click('#nav-button-logout'))
//                 .then(() => {
//                     return ui.getText('.navbar-nav li:last-child a span');
//                 })
//                 .then((buttonText) => {
//                     expect(buttonText).to.equals('ABOUT');
//                     done();
//                 })
//                 .catch((err) => {
//                     throw new Error('Promise was unexpectedly fulfilled. Result: ' + err);
//                 });
//         });
//     });
// });
