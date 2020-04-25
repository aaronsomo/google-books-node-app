const fs = require('fs');
const path = require('path');
const prompt = require('prompt');
const GetRequest = require('./query').GetRequest;
const ReadingList = require('./readingList').ReadingList;

const rawData = fs.readFileSync(path.join(__dirname, 'data.json'));
const booklist = JSON.parse(rawData);

class App {
  constructor() {
    prompt.start();
    prompt.colors = false;
    prompt.message = '';
    this.results = [];

    this.readingList = booklist;

    this.getRequest = new GetRequest();
    this.init = this.init.bind(this);
    this.showPrompt = this.showPrompt.bind(this);
    this.displayResults = this.displayResults.bind(this);
    this.mainMenuSelection = this.mainMenuSelection.bind(this);
    this.secondaryMenuSelection = this.secondaryMenuSelection.bind(this);
    this.addToReadingListOptions = this.addToReadingListOptions.bind(this);
    this.getBooks = this.getBooks.bind(this);
  }

  init(number) {
    if (number === 1) {
      this.displayResults(this.readingList);
      this.displayMainMenu();
    } else {
      this.showPrompt();
    }
  }

  showPrompt() {
    console.log('\n');
    const schema = {
      name: 'query',
      description: 'Please enter a title or author',
      message: 'No input received. Please try again.',
      type: 'string',
      required: true,
    };

    prompt.get([schema], this.getBooks);
  }

  getBooks(err, user_input) {
    return this.getRequest.getRequest(err, user_input).then((data) => {
      if (data.totalItems === 0) {
        console.log("No books found :'( . Please try again.");
        this.showPrompt();
      } else {
        this.results = new ReadingList(data.items);
        this.displayResults(this.results);
        this.displayMainMenu();
      }
    });
  }

  displayResults({ booklist }) {
    const space3 = '   ';
    const space4 = '    ';

    console.clear();
    console.log('\n');
    if (booklist === undefined || booklist.length === 0) {
      console.log('Sorry, the list is currently empty.\n');
    } else {
      booklist.forEach(({ title, authors, publisher }, index) => {
        console.log(`${index + 1}. Title${space4}: ${title}`);
        console.log(`${space3}Author(s): ${authors}`);
        console.log(`${space3}Publisher: ${publisher}\n`);
      });
    }
  }

  displayMainMenu() {
    if (
      this.results.booklist === undefined ||
      this.results.booklist.length === 0
    ) {
      console.log('--- Main Menu ---\n');
      console.log('1. View your current Reading List');
      console.log('2. Start a new search');
      console.log('3. Exit \n');

      this.mainMenuPrompt();
    } else {
      console.log('--- Main Menu ---\n');
      console.log('1. View your current Reading List');
      console.log('2. Add to your Reading List');
      console.log('3. Start a new search');
      console.log('4. Exit \n');

      this.mainMenuPrompt();
    }
  }

  mainMenuPrompt() {
    const menuSchema = {
      name: 'input',
      description: 'Please enter the number of a corresponding option',
      message: 'No input received. Please try again.',
      type: 'string',
      required: true,
    };

    prompt.get(
      [menuSchema],
      this.results.booklist
        ? this.mainMenuSelection
        : this.secondaryMenuSelection
    );
  }

  mainMenuSelection(err, user_input) {
    switch (user_input.input) {
      case '1':
        this.displayResults(this.readingList);
        this.displayMainMenu();
        break;
      case '2':
        this.addToReadingListMenu();
        break;
      case '3':
        this.showPrompt();
        break;
      case '4':
        console.log('\nSee you next time!\n');
        break;
      default:
        this.mainMenuPrompt();
        break;
    }
  }

  secondaryMenuSelection(err, user_input) {
    switch (user_input.input) {
      case '1':
        this.displayResults(this.readingList);
        this.displayMainMenu();
        break;
      case '2':
        this.showPrompt();
        break;
      case '3':
        console.log('\nSee you next time!\n');
        break;
      default:
        this.secondaryMenuPrompt();
        break;
    }
  }

  addToReadingListMenu() {
    this.displayResults(this.results);
    console.log(
      'Please enter the number corresponding to the book you would like to add. \n'
    );

    this.addToReadingListPrompt();
  }

  addToReadingListPrompt() {
    const addToListSchema = {
      name: 'option',
      description: 'Book number',
      message: 'No input received. Please try again.',
      type: 'string',
      required: true,
    };
    prompt.get([addToListSchema], this.addToReadingListOptions);
  }

  addToReadingListOptions(err, user_input) {
    if (
      user_input.option < 1 ||
      user_input.option > this.results.booklist.length
    ) {
      console.log('\nPlease enter a valid option.');
      this.addToReadingListPrompt();
    } else {
      this.addBookToReadingList(user_input.option - 1);
    }
  }

  addBookToReadingList(option) {
    if (this.readingListContainsBook(option) === false) {
      this.readingList.booklist.push(this.results.booklist[option]);

      let data = JSON.stringify(this.readingList, null, 2);
      fs.writeFile(path.join(__dirname, 'data.json'), data, (err) => {
        if (err) throw err;
      });
      console.clear();
      console.log(
        `\nSuccessfully added "${
          this.readingList.booklist[this.readingList.booklist.length - 1].title
        }" to your Reading List! \n`
      );
    } else {
      console.clear();
      console.log('\nThat book is already in your Reading List\n');
    }

    this.displayMainMenu();
  }

  readingListContainsBook(index) {
    return this.readingList.booklist.some((book) => {
      if (book.title === this.results.booklist[index].title) {
        return true;
      }
      if (book.title != this.results.booklist[index].title) {
        return false;
      }
    });
  }
}

module.exports = App;

// tests
// write a test that adds a book to list
// write a test returns current reading list
// write a test that starts a new search
