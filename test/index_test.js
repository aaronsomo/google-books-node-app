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
});
