let assert = require('assert');
let App = require('../src/app');
const stdin = require('mock-stdin').stdin();
const fs = require('fs');
const path = require('path');

console.log = () => {};
console.clear = () => {};

describe('Booklist', function () {
  it('returns current reading list', function () {
    const app = new App();
    app.displayResults(app.readingList.booklist);

    assert.equal('object', typeof app.readingList.booklist);
  });

  it('returns current reading list', function () {
    const app = new App();
    app.displayResults(app.readingList.booklist);

    assert.equal(
      'Eloquent JavaScript: A Modern Introduction to Programming',
      app.readingList.booklist[0].title
    );
  });

  it('returns current reading list', function () {
    const app = new App();
    app.displayResults(app.readingList.booklist);

    assert.equal('Marijn Haverbeke', app.readingList.booklist[0].authors);
  });

  it('returns current reading list', function () {
    const app = new App();
    app.displayResults(app.readingList.booklist);

    assert.equal('ABC Publisher', app.readingList.booklist[0].publisher);
  });
});

describe('Reading List', function () {
  it('adds a book to the read list', function () {
    const app = new App();
    app.results = {
      booklist: [
        {
          title: 'Test Book',
          authors: 'Tester',
          publisher: 'Test Maker',
        },
      ],
    };

    app.addBookToReadingList(0);

    assert.equal('Tester', app.readingList.booklist[2].authors);
  });
});

describe('Search Function', function () {
  it('prompting search adds book to results', async function () {
    const app = new App();

    assert.equal(0, app.results.length);
    await app.getBooks(null, { query: 'drake' });

    stdin.send('4');
    assert.notEqual(0, app.results.length);
  });
});

describe('Persisting Data', function () {
  it('persists reading list after adding from results', function () {
    const app = new App();
    const rawData = fs.readFileSync(path.join(__dirname, '../src/data.json'));
    const booklist = JSON.parse(rawData);
    app.results = {
      booklist: [
        {
          title: 'Tests Persistence',
          authors: 'Persistence Tester',
          publisher: 'Test Maker',
        },
      ],
    };

    app.addBookToReadingList(0);

    assert.equal('Tests Persistence', booklist.booklist[3].title);
  });

  it('persists reading list after adding from results', function () {
    const app = new App();
    const rawData = fs.readFileSync(path.join(__dirname, '../src/data.json'));
    const booklist = JSON.parse(rawData);
    app.results = {
      booklist: [
        {
          title: 'Tests Persistence',
          authors: 'Persistence Tester',
          publisher: 'Test Maker',
        },
      ],
    };

    app.addBookToReadingList(0);

    assert.equal('Persistence Tester', booklist.booklist[3].authors);
  });
});
