const axios = require('axios');

const prompt = require('prompt');
const ReadingList = require('./readingList').ReadingList;

class App {
  constructor() {
    prompt.start();
    prompt.colors = false;
    prompt.message = '';
    this.results = [];
    this.readingList = {
      booklist: [
        {
          title: 'Eloquent JavaScript: A Modern Introduction to Programming',
          authors: 'Marijn Haverbeke',
          publisher: 'ABC Publisher',
        },
        {
          title: 'Cracking the Coding Interview',
          authors: 'Gayle Laakmann McDowell',
          publisher: 'ABC Publisher',
        },
      ],
    };

    this.showPrompt = this.showPrompt.bind(this);
    this.getRequest = this.getRequest.bind(this);
    this.displayResults = this.displayResults.bind(this);
    this.displayMainMenu = this.displayMainMenu.bind(this);
    this.mainMenuPrompt = this.mainMenuPrompt.bind(this);
    this.mainMenuSelection = this.mainMenuSelection.bind(this);
    this.addToReadingListMenu = this.addToReadingListMenu.bind(this);
    // this.addToReadingListPrompt = this.addToReadingListPrompt.bind(this);
    this.addToReadingListOptions = this.addToReadingListOptions.bind(this);
    this.addBookToReadingList = this.addBookToReadingList.bind(this);
  }

  showPrompt() {
    const schema = {
      name: 'query',
      description: 'Please enter a title or author',
      message: 'No input received. Please try again.',
      type: 'string',
      required: true,
    };

    prompt.get([schema], this.getRequest);
  }

  getRequest(err, user_input) {
    //   console.log(user_input);
    const query = encodeURI(user_input.query);
    const url = `https://www.googleapis.com/books/v1/volumes?maxResults=5&q=${query}`;

    axios
      .get(url, { headers: { Accept: 'application/json' } })
      .then(({ data }) => {
        // if search returns nothing
        if (data.totalItems === 0) {
          console.log("No books found :'( . Please try again.");
          showPrompt();
        } else {
          this.results = new ReadingList(data.items);
          this.displayResults(this.results);
          this.displayMainMenu();
        }
        return data;
      })
      //   .then((data) => console.log('end of the request: ', data.totalItems))
      .then((data) => {
        return data.items;
      })
      .catch((err) => console.error(err));
  }

  displayResults({ booklist }) {
    // added spacers to format output
    const space3 = '   ';
    const space4 = '    ';

    console.log('\n');
    if (booklist === undefined) {
      console.log('Sorry, the list is currently empty.\n');
    } else {
      booklist.forEach(({ title, authors, publisher }, index) => {
        console.log(`${index + 1}. Title${space4}: ${title}`);
        console.log(`${space3}Author(s): ${authors}`);
        console.log(`${space3}Publisher: ${publisher}\n`);
      });
    }

    return 'displayResults';
  }

  displayMainMenu() {
    console.log('--- Main Menu ---');
    console.log('Please enter the number of a corresponding option: \n');
    console.log('1. View your current Reading List');
    console.log('2. Add to your Reading List');
    console.log('3. Start a new search');
    console.log('4. Exit \n');

    this.mainMenuPrompt();
  }

  mainMenuPrompt() {
    const menuSchema = {
      name: 'input',
      description: 'Please choose an option',
      message: 'No input received. Please try again.',
      type: 'string',
      required: true,
    };

    prompt.get([menuSchema], this.mainMenuSelection);
  }

  mainMenuSelection(err, selection) {
    switch (selection.input) {
      case '1':
        this.displayResults(this.readingList) || 'Your list is currently empty';
        this.displayMainMenu();
        break;
      case '2':
        // function to add to reading list
        this.addToReadingListMenu();
        break;
      case '3':
        // call search function for another query
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
    this.displayResults(this.results);

    console.log(
      'Please enter the number corresponding to the book you would like to add. \n'
    );

    this.addToReadingListPrompt();
  }

  addToReadingListOptions(err, selection) {
    console.log(selection);
    switch (selection.option) {
      case '1':
        this.addBookToReadingList(0);
        break;
      case '2':
        this.addBookToReadingList(1);
        break;
      case '3':
        this.addBookToReadingList(2);
        break;
      case '4':
        this.addBookToReadingList(3);
        break;
      case '5':
        this.addBookToReadingList(4);
        break;
      default:
        this.addToReadingListPrompt();
        break;
    }
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

  addBookToReadingList(option) {
    console.log(this.results.booklist[option]);
    this.readingList.booklist.push(this.results.booklist[option]);
    console.log(
      `\nSuccessfully added ${
        this.readingList.booklist[this.readingList.booklist.length - 1].title
      } to your Reading List. \n`
    );

    // prompt for more options
    this.displayMainMenu();
  }
}

let app = new App();
app.showPrompt();

module.exports = App;

// tests
// write a test that adds a book to list
// write a returns current reading list
// write a test that starts a new search
