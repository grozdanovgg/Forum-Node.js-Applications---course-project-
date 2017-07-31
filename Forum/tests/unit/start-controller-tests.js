let { expect } = require('chai');
const sinon = require('sinon');
expect = require('sinon-expect').enhance(expect, sinon, 'was');
const controller = require('../../routes/start/start-controller');


describe('Start-controller tests', () => {
    describe('showHome()', () => {
        let req = null;
        let res = null;
        let db = null;
        let app = null;
        beforeEach(() => {
            req = {
                app: {
                    locals: {
                        currentUser: {},
                    },
                },
            };
            app = {
                locals: {
                    currentUser: {},
                },
            };
        });

        it('should render start pug, when called', () => {
            // Arrange
            db = {
                showAll() {
                    return Promise.resolve([]);
                },
            };
            res = { render: function() {} };
            sinon.spy(res, 'render');

            // Act
            Promise.resolve(controller.showHome(req, res, app, db)).then(() => {
                // Assert
                sinon.assert.calledWith(res.render, 'start');
            });
        });
        it('should render error, when database crashes', () => {
            // Arrange
            db = {
                showAll() {
                    return Promise.reject('Problem with db');
                },
            };
            res = { render: function() {} };
            sinon.spy(res, 'render');

            // Act
            Promise.resolve(controller.showHome(req, res, app, db)).catch(() => {
                // Assert
                console.log('here');
                sinon.assert.calledWith(res.render, '404');
            });
        });
    });
});
