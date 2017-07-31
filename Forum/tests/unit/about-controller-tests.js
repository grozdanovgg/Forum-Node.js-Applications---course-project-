let { expect } = require('chai');
const sinon = require('sinon');
expect = require('sinon-expect').enhance(expect, sinon, 'was');
const controller = require('../../routes/about/about-controller');


describe('About-controller tests', () => {
    describe('showAbout()', () => {
        const req = {
            app: {
                locals: {
                    currentUser: {},
                },
            },
        };
        const res = { render: function() {} };

        sinon.spy(res, 'render');
        it('should render about pug, when called', () => {
            // Act
            controller.showAbout(req, res);

            // Assert
            sinon.assert.called(res.render);
        });
    });
});
