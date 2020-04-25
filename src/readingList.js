const Book = require('./book').Book;

class ReadingList {
  constructor(data) {
    this.booklist = [];
    if (Array.isArray(data)) {
      data.forEach(({ volumeInfo }) => {
        this.booklist.push(
          new Book({
            title: volumeInfo.title,
            authors: volumeInfo.authors || 'unknown',
            publisher: volumeInfo.publisher || 'unknown',
          })
        );
      });
    } else {
      this.books = [];
      console.log('Error creating list...');
    }
  }
}

module.exports = {
  ReadingList,
};
