const Book = require('./book').Book;

class ReadingList {
  constructor(data) {
    this.booklist = [];
    data.forEach(({ volumeInfo }) => {
      this.booklist.push({
        title: volumeInfo.title,
        authors: volumeInfo.authors || 'unknown',
        publisher: volumeInfo.publisher || 'unknown',
      });
    });
  }
}

module.exports = {
  ReadingList,
};
