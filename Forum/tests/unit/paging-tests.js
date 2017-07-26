const { expect } = require('chai');
const sinon = require('sinon');
const pageHandler = require('../../models/paging');


describe('Paging tests', () => {
    describe('PageHandler.choosePage()', () => {
        const page = '9';
        it('should return correct page when there is one', () => {
            // Act
            const result = pageHandler.choosePage(page);

            // Assert
            expect(result).to.eq(9);
        });
        it('should return page 1 when there is not one', () => {
            // Act
            const result = pageHandler.choosePage();

            // Assert
            expect(result).to.eq(1);
        });
    });

    describe('PageHandler.handle()', () => {        
        let res = {
            redirect: () => {
                return 'send was called';
            }
        };

        it('should return correct result when there are at least 3 pages.', () => {
            //Arrange
            const page = 1;
            const size = 2;
            const collection = [1, 2, 3, 4, 5];

            // Act
            const result = pageHandler.handle(collection, page, size, res);

            // Assert
            expect(result.filteredCollection).to.deep.eq([1, 2]);
            expect(result.navigationNumbers).to.deep.eq([1, 2, 3]);
            expect(result.numberOfPages).to.eq(3);
        });

        it('should return correct result when there are 2 pages.', () => {
            //Arrange
            const page = 1;
            const size = 2;
            const collection = [1, 2, 3, 4];

            // Act
            const result = pageHandler.handle(collection, page, size, res);

            // Assert
            expect(result.filteredCollection).to.deep.eq([1, 2]);
            expect(result.numberOfPages).to.eq(2);
            expect(result.navigationNumbers).to.deep.eq([1, 2]);
        });

        it('should return correct result when there is 1 page.', () => {
            //Arrange
            const page = 1;
            const size = 2;
            const collection = [1, 2];

            // Act
            const result = pageHandler.handle(collection, page, size, res);

            // Assert
            expect(result.filteredCollection).to.deep.eq([1, 2]);
            expect(result.numberOfPages).to.eq(1);
            expect(result.navigationNumbers).to.deep.eq([1]);
        });

        /*it('should return correct number of pages when parameters are valid', () => {
            //Arrange
            const page = 1;
            const size = 2;

            // Act
            const result = pageHandler.handle(collection, page, size, res);

            // Assert
            expect(result.numberOfPages).to.eq(3);
        });*/
        /*it('should return page 1 when there is not one', () => {
            // Act
            const result = pageHandler.choosePage();

            // Assert
            expect(result).to.eq(1);
        });*/
    });

});