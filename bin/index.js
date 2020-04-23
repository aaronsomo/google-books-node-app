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
  console.log(user_input);
  const query = encodeURI(user_input.query);
  const url = `https://www.googleapis.com/books/v1/volumes?maxResults=5&q=${query}`;

  const books = {};

  if (query.length === 0) {
    console.log('please try again');
  } else {
    axios
      .get(url, { headers: { Accept: 'application/json' } })
      .then(({ data }) => {
        // if search returns nothing
        if (data.totalItems === 0) {
          console.log("No books found :'( . Please try again.");
          showPrompt();
        } else {
          data.items.forEach(({ volumeInfo }) => {
            console.log(volumeInfo.title);
            console.log(volumeInfo.authors);
            console.log('------------------------');
          });
        }
        return data;
      })
      //   .then((data) => console.log('end of the request: ', data.totalItems))
      .then((data) => {
        return data.items.length;
      })
      .catch((err) => console.error(err));
  }
};

showPrompt();

module.exports = {
  getRequest,
};
