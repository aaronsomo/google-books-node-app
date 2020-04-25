let assert = require('assert');
let App = require('../src/app');
const stdin = require('mock-stdin').stdin();
const moxios = require('moxios');
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

    // assert.equal(3, app.readingList.booklist.length); // gets larger as you add books due to persistence
    assert.equal('Tester', app.readingList.booklist[2].authors);
  });
});

describe('Search Function', function () {
  // beforeEach(function () {
  //   moxios.install();
  // });

  // afterEach(function () {
  //   moxios.uninstall();
  // });

  it('prompting search adds book to results', async function () {
    const app = new App();
    // moxios.stubRequest(
    //   'https://www.googleapis.com/books/v1/volumes?maxResults=5&q=drake',
    //   { items: [], totalItems: [] }
    // );
    assert.equal(0, app.results.length);
    await app.getBooks(null, { query: 'drake' });

    stdin.send('4');
    // moxios.wait(function () {
    assert.notEqual(0, app.results.length);
    // });
  });
});

describe('Persisting Data', function () {
  it('persists reading list after adding from results', async function () {
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

    assert.equal('Tests Persistence', await booklist.booklist[3].title);
  });

  it('persists reading list after adding from results', async function () {
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

    assert.equal('Persistence Tester', await booklist.booklist[3].authors);
  });
});
