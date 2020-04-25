let assert = require('assert');
const App = require('../src/app');
const ReadingList = require('../src/readingList');

const stdin = require('mock-stdin').stdin();
const fs = require('fs');
const path = require('path');

console.log = () => {};
console.clear = () => {};

describe('Persisting Data', function () {
  it('persists reading list after adding from results', function () {
    const app = new App();
    const rawData = fs.readFileSync(path.join(__dirname, '../src/data.json'));
    const booklist = JSON.parse(rawData);

    assert.equal('Result Book', booklist[2].title);
  });

  it('persists reading list after adding from results', function () {
    const app = new App();
    const rawData = fs.readFileSync(path.join(__dirname, '../src/data.json'));
    const booklist = JSON.parse(rawData);

    assert.equal('Result Tester', booklist[2].authors);
  });
});
