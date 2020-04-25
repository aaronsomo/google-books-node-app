const fs = require('fs');
const path = require('path');

const list = {
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

let data = JSON.stringify(list, null, 2);
fs.writeFile(path.join(__dirname, '../src/data.json'), data, (err) => {
  if (err) throw err;
});
