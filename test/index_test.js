let index_test = require('../bin/index.js');
let assert = require('assert');

// console.log(
//   'console log from line 4: ',
//   index_test.getRequest(null, { query: 'harry potter' })
// );

describe('Booklist', function () {
  describe('Length', function () {
    it('should return 5', function () {
      books = index_test.getRequest(null, {
        query: 'harry potter',
      });
      assert.equal(5, books.length);
    });
  });

  describe('Stored results', function () {
    it('should return an array of 5 items', function () {
      books = [
        {
          volumeInfo: {
            title: 'book1',
            author: 'author1',
            publisher: 'publisher1',
          },
        },
        {
          volumeInfo: {
            title: 'book2',
            author: 'author2',
            publisher: 'publisher2',
          },
        },
        {
          volumeInfo: {
            title: 'book3',
            author: 'author3',
            publisher: 'publisher3',
          },
        },
        {
          volumeInfo: {
            title: 'book4',
            author: 'author4',
            publisher: 'publisher4',
          },
        },
        {
          volumeInfo: {
            title: 'book5',
            author: 'author5',
            publisher: 'publisher5',
          },
        },
      ];
      assert.equal(5, index_test.storeResults(books));
    });
  });
});

describe('Menu Selection', function () {
  describe('Reading List', function () {
    it('should return the contents of displayResult()', function () {
      assert.equal(
        'displayResults',
        index_test.menuSelection(null, { input: 1 })
      );
    });
  });
});
