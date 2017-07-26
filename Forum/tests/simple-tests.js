const { expect } = require('chai');

describe('First Test', () => {
    it('should return 4', () => {
        // Arrange
        const x = 2;
        const y = 2;

        // Act
        const expected = x + y;

        // Assert
        expect(expected).to.eq(4);
    });
});