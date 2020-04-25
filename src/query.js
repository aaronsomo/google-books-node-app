const ReadingList = require('./readingList').ReadingList;

const axios = require('axios');

class GetRequest {
  getRequest(err, user_input) {
    const query = encodeURI(user_input.query);
    // console.log('what is the query: ', query);
    const url = `https://www.googleapis.com/books/v1/volumes?maxResults=5&q=${query}`;

    return axios
      .get(url, { headers: { Accept: 'application/json' } })
      .then(({ data }) => {
        return data;
      })
      .catch((err) => console.error(err));
  }
}

module.exports = {
  GetRequest,
};
