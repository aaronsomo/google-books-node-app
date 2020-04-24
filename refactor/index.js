const axios = require('axios');

const prompt = require('prompt');
const ReadingList = require('./readingList').ReadingList;

class App {
  constructor() {
    prompt.start();
    prompt.colors = false;
    prompt.message = '';
    this.results = [];

    this.getRequest = this.getRequest.bind(this);
    this.displayResults = this.displayResults.bind(this);
    this.displayMainMenu = this.displayMainMenu.bind(this);
    this.mainMenuPrompt = this.mainMenuPrompt.bind(this);
    this.mainMenuSelection = this.mainMenuSelection.bind(this);
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
          // data.items.forEach(({ volumeInfo }) => {
          //   console.log(volumeInfo.title);
          //   console.log(volumeInfo.authors);
          //   console.log('------------------------');
          // });
          // storeResults(data.items);
          // displayResults(results);
          // displayMainMenu();

          //   data.items.forEach(({ volumeInfo }) => {
          //     this.results.push({
          //       title: volumeInfo.title,
          //       authors: volumeInfo.authors || 'unknown',
          //       publisher: volumeInfo.publisher || 'unknown',
          //     });
          //   });
          //   console.log(this.results);
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
    //   console.log(books);
    // added spacers to format output
    const space3 = '   ';
    const space4 = '    ';

    console.log('\n');
    booklist.forEach(({ title, authors, publisher }, index) => {
      console.log(`${index + 1}. Title${space4}: ${title}`);
      console.log(`${space3}Author(s): ${authors}`);
      console.log(`${space3}Publisher: ${publisher}\n`);
    });

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
        displayResults(readingList);
        displayMainMenu();
        //   return 'displayResults';
        break;
      case '2':
        // function to add to reading list
        addToReadingListMenu();
        break;
      case '3':
        // call search function for another query
        console.log('\n');
        showPrompt();
        break;
      case '4':
        console.log('\nSee you next time!\n');
        break;
      default:
        mainMenuPrompt();
        break;
    }
  }
}

let app = new App();
app.showPrompt();
