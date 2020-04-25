const fs = require('fs');
const path = require('path');

console.clear = () => {};

const list = {
  booklist: [],
};

let data = JSON.stringify(list, null, 2);
fs.writeFile(path.join(__dirname, '../src/data.json'), data, (err) => {
  if (err) throw err;
});
