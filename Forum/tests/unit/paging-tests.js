const { expect } = require('chai');
const sinon = require('sinon');
const pageHandler = require('../../models/paging');

describe('PageHandler.choosePage', () => {
    const page = '9';
    it('should return correct page when there is one', () => {
        // Act
        const result = pageHandler.choosePage(page);

        // Assert
        expect(result).to.eq(9);
    });
});