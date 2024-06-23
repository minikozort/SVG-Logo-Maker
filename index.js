// index.js
const inquirer = require('inquirer');
const fs = require('fs');
const Logo = require('./Lib/logo');
const { Circle, Square, Triangle } = require('./Lib/shapes');


const shapeOptions = ['circle', 'square', 'triangle'];

let logoCounter = 1;

// Questions to be prompted for the user's input
const questions = [
    {
        type: 'input',
        name: 'logotext',
        message: 'Please enter your logo text (up to three letters):',
        validate: function (value) {
            return value.length <= 3 ? true : 'Please enter up to three letters only.';
        }
    },
    {
        type: 'input',
        name: 'textcolor',
        message: 'Please enter a text color (color keyword or hexadecimal):',
        validate: function (value) {
            // Validate if it's a color keyword or hexadecimal
            const isColor = /^[a-zA-Z]+$/.test(value) || /^#[0-9A-F]{6}$/i.test(value);
            return isColor ? true : 'Please enter a valid color (color keyword or hexadecimal).';
        }
    },
    {
        type: 'input',
        name: 'shapecolor',
        message: 'Please enter a shape color (color keyword or hexadecimal):',
        validate: function (value) {
            // Validate if it's a color keyword or hexadecimal
            const isColor = /^[a-zA-Z]+$/.test(value) || /^#[0-9A-F]{6}$/i.test(value);
            return isColor ? true : 'Please enter a valid color (color keyword or hexadecimal).';
        }
    },
    {
        type: 'list',
        name: 'shape',
        message: 'Please select a shape:',
        choices: shapeOptions
    },
];

// A function to initialize the app
async function init() {
  try {
      // Prompt user for input
      const userData = await inquirer.prompt(questions);
      console.log('Generating logo...');

      // Initialize logo based on user input
      const logo = new Logo();
      logo.setTextInput(userData.logotext, userData.textcolor);
      logo.setShapeInput(userData.shape, userData.shapecolor);

      // Save generated logo to Examples folder with a numbered filename based on user input
      const fileName = `example_${logoCounter}.svg`;
      logo.saveToFile(fileName);

      // Increment the logo counter for the next logo
      logoCounter++;
  } catch (error) {
      console.error('An error occurred:', error);
  }
}
// Call init function to start the application
init();
