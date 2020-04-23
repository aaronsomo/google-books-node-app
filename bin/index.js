// #!/usr/bin/env node

const axios = require('axios');

const prompt = require('prompt');

prompt.start();
prompt.colors = false;
prompt.message = '';

const showPrompt = () => {
  const schema = {
    name: 'query',
    description: 'Please enter a title or author',
    message: 'No input received. Please try again.',
    type: 'string',
    required: true,
  };

  prompt.get([schema], getRequest);
};

const getRequest = (err, user_input) => {
  //   console.log(user_input);
  const query = encodeURI(user_input.query);
  const url = `https://www.googleapis.com/books/v1/volumes?maxResults=5&q=${query}`;

  const books = {};

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
        storeResults(data.items);
        displayResults(results);
      }
      return data;
    })
    //   .then((data) => console.log('end of the request: ', data.totalItems))
    .then((data) => {
      return data.items;
    })
    .catch((err) => console.error(err));
};

const storeResults = (books) => {
  //   console.log(books);
  results = [];
  books.forEach(({ volumeInfo }) => {
    results.push({
      title: volumeInfo.title,
      authors: volumeInfo.authors || 'unknown',
      publisher: volumeInfo.publisher || 'unknown',
    });
  });
  //   console.log(results);
  return results.length;
};

const displayResults = (books) => {
  //   console.log(books);
  // added spacers to format output
  const space3 = '   ';
  const space4 = '    ';
  const space5 = '     ';

  books.forEach(({ title, authors, publisher }, index) => {
    console.log(`${index + 1}. Title${space4}: ${title}`);
    console.log(`${space3}Author(s): ${authors}`);
    console.log(`${space3}Publisher: ${publisher}\n`);
  });
};

showPrompt();

module.exports = {
  getRequest,
  storeResults,
};
