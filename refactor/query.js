const ReadingList = require('./readingList').ReadingList;

const axios = require('axios');

class GetRequest {
  getRequest(err, user_input) {
    console.log(global.global);
    const query = encodeURI(user_input.query);
    const url = `https://www.googleapis.com/books/v1/volumes?maxResults=5&q=${query}`;

    axios
      .get(url, { headers: { Accept: 'application/json' } })
      .then(({ data }) => {
        if (data.totalItems === 0) {
          console.log("No books found :'( . Please try again.");
          showPrompt();
        } else {
          this.results = new ReadingList(data.items);
          //   this.displayResults(this.results);
          //   this.displayMainMenu();
        }
        return data;
      })
      .then((data) => {
        return data.items;
      })
      .catch((err) => console.error(err));
  }
}

module.exports = {
  GetRequest,
};
