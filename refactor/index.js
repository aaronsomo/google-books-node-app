const App = require('./app');

const app = new App();

// app.init();

const introScreen = () => {
  console.log('\n--- Your Personal Reading List App ---\n');
  console.log('1. View your current Reading List');
  console.log('2. Start a new search');
  console.log('3. Exit\n');
};

introScreen();
