let assert = require('assert');
const App = require('../src/app');
const stdin = require('mock-stdin').stdin();

describe('Search Function', function () {
  it('prompting search adds book to results', async function () {
    const app = new App();

    assert.equal(0, app.results.length);
    await app.getBooks(null, { query: 'drake' });

    stdin.send('4');
    assert.notEqual(0, app.results.length);
  });
});
