const App = require('./app');
const prompt = require('prompt');

prompt.start();
prompt.colors = false;
prompt.message = '';

// app.init();
const showPrompt = () => {
  const introSchema = {
    name: 'input',
    description: 'Please select an option',
    message: 'No input found. Please try again.',
    type: 'string',
    required: true,
  };

  prompt.get([introSchema], introScreenMenu);
};

const introScreenMenu = (err, user_input) => {
  if (user_input.input === '2') {
    global.app = new App();
    app.init();
  }
};

const introScreen = () => {
  console.log('\n--- Your Personal Reading List App ---\n');
  console.log('1. View your current Reading List');
  console.log('2. Start a new search');
  console.log('3. Exit\n');
  showPrompt();
};

introScreen();
