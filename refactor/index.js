const App = require('./app');
const prompt = require('prompt');
const fs = require('fs');
const path = require('path');

prompt.start();
prompt.colors = false;
prompt.message = '';

const app = new App();

const showPrompt = () => {
  const introSchema = {
    name: 'input',
    description: 'Please enter the number of a corresponding option',
    message: 'No input found. Please try again.',
    type: 'string',
    required: true,
  };

  prompt.get([introSchema], introScreenMenu);
};

const introScreenMenu = (err, user_input) => {
  //   if (user_input.input === '2') {
  //     app.init();
  //   }
  switch (user_input.input) {
    case '1':
      app.init(1);
      break;
    case '2':
      app.init(2);
      break;
    case '3':
      console.log('\nSee you next time!\n');
      break;
    default:
      this.mainMenuPrompt();
      break;
  }
};

const introScreen = () => {
  console.clear();
  console.log('\n--- Your Personal Reading List App ---\n');
  console.log('1. View your current Reading List');
  console.log('2. Start a new search');
  console.log('3. Exit\n');
  showPrompt();
};

introScreen();
