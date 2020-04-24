// let index_test = require('../bin/index.js');
let assert = require('assert');
let App = require('../refactor/index.js');

// console.log(
//   'console log from line 4: ',
//   index_test.getRequest(null, { query: 'harry potter' })
// );

describe('Booklist', function () {
  it('adds a book to the read list', function () {
    const app = new App();
    app.results = [
      {
        title: 'fake book',
        authors: 'aaron somo',
        publisher: 'jaieger',
      },
    ];

    app.addBookToReadingList(0);

    assert.Equals(3, app.readingList.length);
    assert.Equals('aaron somo', app.readingList[2].authors);
  });
  xdescribe('Length', function () {
    it('should return 5', function () {
      books = index_test.getRequest(null, {
        query: 'harry potter',
      });
      assert.equal(5, books.length);
    });
  });

  xdescribe('Stored results', function () {
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

xdescribe('Menu Selection', function () {
  describe('Reading List', function () {
    it('should return the contents of displayResult()', function () {
      assert.equal(
        'displayResults',
        index_test.mainMenuSelection(null, { input: 1 })
      );
    });
  });
});
