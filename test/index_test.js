let assert = require('assert');
let App = require('../refactor/app');

describe('Booklist', function () {
  console.clear();
  it('returns current reading list', function () {
    const app = new App();
    app.displayResults(app.readingList.booklist);

    assert.equal('object', typeof app.readingList.booklist);
    assert.equal(
      'Eloquent JavaScript: A Modern Introduction to Programming',
      app.readingList.booklist[0].title
    );
    assert.equal('Marijn Haverbeke', app.readingList.booklist[0].authors);
    assert.equal('ABC Publisher', app.readingList.booklist[0].publisher);
  });

  it('adds a book to the read list', function () {
    const app = new App();
    results = {
      booklist: [
        {
          title: 'Test Book',
          authors: 'Tester',
          publisher: 'Test Maker',
        },
      ],
    };

    app.addBookToReadingList(0);

    assert.equal(3, app.readingList.booklist.length);
    assert.equal('Tester', app.readingList.booklist[2].authors);
  });
});

describe('Search Function', function () {
  it('should add to results', function () {
    global.app = new App();
    app.getRequest(null, { query: 'harry potter' });
  });
});
