const Book = require('./book').Book;
const fs = require('fs');
const path = require('path');

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

  addBookToReadingList(booklist, searchResults, option) {
    if (
      this.readingListContainsBook(booklist, searchResults, option) === false
    ) {
      booklist.push(searchResults[option]);

      let data = JSON.stringify(booklist, null, 2);
      fs.writeFile(path.join(__dirname, 'data.json'), data, (err) => {
        if (err) throw err;
      });
      console.clear();
      console.log(
        `\nSuccessfully added "${
          booklist[booklist.length - 1].title
        }" to your Reading List! \n`
      );
    } else {
      console.clear();
      console.log('\nThat book is already in your Reading List\n');
    }
  }

  readingListContainsBook(booklist, searchResults, index) {
    return booklist.some((book) => {
      if (book.title === searchResults[index].title) {
        return true;
      }
      if (book.title != searchResults[index].title) {
        return false;
      }
    });
  }
}

module.exports = {
  ReadingList,
};
