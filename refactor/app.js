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
    // console.log('console.log from this.readingList: ', this.readingList);

    this.getRequest = new GetRequest();
    // console.log('console.log from this.getRequest: ', this.getRequest);

    this.init = this.init.bind(this);
    this.showPrompt = this.showPrompt.bind(this);
    // this.getRequest = this.getRequest.bind(this);
    this.displayResults = this.displayResults.bind(this);
    this.displayMainMenu = this.displayMainMenu.bind(this);
    this.mainMenuPrompt = this.mainMenuPrompt.bind(this);
    this.mainMenuSelection = this.mainMenuSelection.bind(this);
    this.addToReadingListMenu = this.addToReadingListMenu.bind(this);
    this.addToReadingListPrompt = this.addToReadingListPrompt.bind(this);
    this.addToReadingListOptions = this.addToReadingListOptions.bind(this);
    this.addBookToReadingList = this.addBookToReadingList.bind(this);
    this.getBooks = this.getBooks.bind(this);
  }

  init() {
    this.showPrompt();
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
    this.getRequest.getRequest(err, user_input).then((data) => {
      console.log('console.log in getBooks(): ', data.items.length);
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
    console.log('--- Main Menu ---\n');
    console.log('1. View your current Reading List');
    console.log('2. Add to your Reading List');
    console.log('3. Start a new search');
    console.log('4. Exit \n');

    this.mainMenuPrompt();
  }

  mainMenuPrompt() {
    const menuSchema = {
      name: 'input',
      description: 'Please enter the number of a corresponding option',
      message: 'No input received. Please try again.',
      type: 'string',
      required: true,
    };

    prompt.get([menuSchema], this.mainMenuSelection);
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
        console.log('\n');
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

  addToReadingListMenu() {
    console.log('console log from addToReadingListMenu: ', this.results);
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
    switch (user_input.option) {
      case user_input.option:
        this.addBookToReadingList(user_input.option - 1);
        break;
      default:
        this.addToReadingListPrompt();
        break;
    }
  }

  addBookToReadingList(option) {
    this.readingList.booklist.push(this.results.booklist[option]);
    let data = JSON.stringify(this.readingList, null, 2);
    // fs.writeFile(path.join(__dirname, 'data.json'), data, (err) => {
    //   if (err) throw err;
    // });
    console.clear();
    console.log(
      `\nSuccessfully added "${
        this.readingList.booklist[this.readingList.booklist.length - 1].title
      }" to your Reading List! \n`
    );

    this.displayMainMenu();
  }
}

module.exports = App;

// tests
// write a test that adds a book to list
// write a test returns current reading list
// write a test that starts a new search
