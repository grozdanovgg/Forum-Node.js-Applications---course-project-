/* eslint-disable no-unused-expressions*/
const { expect } = require('chai');
const { setupDriver } = require('./utils/setup-driver');
const webdriver = require('selenium-webdriver');
const mocha = require('mocha');

describe('Items routes', () => {
            // let driver = null;
            let driver = new webdriver.Builder().build();

            const appUrl = 'http://localhost:3002';

            beforeEach(() => {
                driver = setupDriver('chrome');
            });

            // describe('Valid create post', () => {

            //     beforeEach((done) => {
            //         Promise.resolve()
            //             .then(() => driver.get(appUrl))
            //             .then((

            //             ))
            //     })
            //     it('expect to be visible in /posts/category')
            // })
        }
