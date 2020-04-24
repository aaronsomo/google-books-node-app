class Book {
  constructor({ title, authors, publisher }) {
    this.title = title;
    this.authors = authors;
    this.publisher = publisher;
  }

  displayResults(index) {
    const space3 = '   ';
    const space4 = '    ';

    console.log('\n');

    console.log(`${index}. Title${space4}: ${this.title}`);
    console.log(`${space3}Author(s): ${this.authors}`);
    console.log(`${space3}Publisher: ${this.publisher}\n`);
  }
}

module.exports = {
  Book,
};
