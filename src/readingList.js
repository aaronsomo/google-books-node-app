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

  addBookToReadingList(readingList, searchResults, option) {
    if (
      this.readingListContainsBook(readingList, searchResults, option) === false
    ) {
      readingList.booklist.push(searchResults.booklist[option]);

      let data = JSON.stringify(readingList, null, 2);
      fs.writeFile(path.join(__dirname, 'data.json'), data, (err) => {
        if (err) throw err;
      });
      console.clear();
      console.log(
        `\nSuccessfully added "${
          readingList.booklist[readingList.booklist.length - 1].title
        }" to your Reading List! \n`
      );
    } else {
      console.clear();
      console.log('\nThat book is already in your Reading List\n');
    }
  }

  readingListContainsBook(readingList, searchResults, index) {
    return readingList.booklist.some((book) => {
      if (book.title === searchResults.booklist[index].title) {
        return true;
      }
      if (book.title != searchResults.booklist[index].title) {
        return false;
      }
    });
  }
}

module.exports = {
  ReadingList,
};
