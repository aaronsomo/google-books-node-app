const Book = require('./book').Book;

class ReadingList {
  // Constructor for list object
  constructor(data) {
    this.booklist = [];
    // console.log(data);
    data.forEach(({ volumeInfo }) => {
      this.booklist.push({
        title: volumeInfo.title,
        authors: volumeInfo.authors || 'unknown',
        publisher: volumeInfo.publisher || 'unknown',
      });
    });

    // console.log('from ReadingList: ', this.booklist);
  }
}

module.exports = {
  ReadingList,
};
