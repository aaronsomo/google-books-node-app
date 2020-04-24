const axios = require('axios');

const prompt = require('prompt');

class App {
  constructor() {
    prompt.start();
    prompt.colors = false;
    prompt.message = '';
    this.results = [];
  }

  showPrompt() {
    const schema = {
      name: 'query',
      description: 'Please enter a title or author',
      message: 'No input received. Please try again.',
      type: 'string',
      required: true,
    };

    prompt.get([schema], this.getRequest.bind(this));
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
          data.items.forEach(({ volumeInfo }) => {
            this.results.push({
              title: volumeInfo.title,
              authors: volumeInfo.authors || 'unknown',
              publisher: volumeInfo.publisher || 'unknown',
            });
          });
          console.log(this.results);
        }
        return data;
      })
      //   .then((data) => console.log('end of the request: ', data.totalItems))
      .then((data) => {
        return data.items;
      })
      .catch((err) => console.error(err));
  }
}

let app = new App();
app.showPrompt();
