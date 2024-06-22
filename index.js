// Importing necessary packages and files
const inquirer = require('inquirer');
const fs = require('fs');
const Logos = require('../Lib/logo.js');
const Shapes = require('../Lib/shapes.js');
const Colors = require('../Lib/color.js');

// Define your color and shape options
const textColorOptions = [
    'red',
    'green',
    'blue',
    'yellow',
    'white',
    'orange',
    'purple',
    'pink',
    'cyan',
    'magenta',
    'lime',
    'brown',
    'black',
    'gray',
    'silver',
    'gold'
];

const colorOptions = [
    'red',
    'green',
    'blue',
    'yellow',
    'white',
    'orange',
    'purple',
    'pink',
    'cyan',
    'magenta',
    'lime',
    'brown',
    'black',
    'gray',
    'silver',
    'gold'
];

const shapeOptions = [
    'circle',
    'square',
    'triangle'
];

// Questions to be prompted for the user's input
const questions = [
    {
        type: 'input',
        name: 'logotext',
        message: 'Please enter your logo text (up to three letters):',
        validate: function(value) {
            if (value.length <= 3) {
                return true;
            }
            return 'Please enter up to three letters only.';
        }
    },
    {
        type: 'list',
        name: 'textcolor',
        message: 'Please select a text color:',
        choices: textColorOptions
    },
    {
        type: 'list',
        name: 'logocolor',
        message: 'Please select a logo color:',
        choices: colorOptions
    },
    {
        type: 'list',
        name: 'shape',
        message: 'Please select a shape:',
        choices: shapeOptions
    },
    {
        type: 'input',
        name: 'contributing',
        message: 'Explain how others can contribute to your project:'
    }
];

// A function to initialize the app
async function init() {
    try {
        // Prompt user for input
        const userData = await inquirer.prompt(questions);
        console.log('Generating logo...');

        // Initialize logo based on user input
        const logo = new Logos(userData.logotext);
        logo.setTextColor(userData.textcolor);
        logo.setLogoColor(userData.logocolor);

        // Draw selected shape
        const canvas = new Shapes(300, 200); // Assuming Shapes class supports canvas size
        switch (userData.shape) {
            case 'circle':
                canvas.drawCircle(150, 150, 100, { fill: userData.logocolor });
                break;
            case 'square':
                canvas.drawSquare(100, 100, 200, { fill: userData.logocolor });
                break;
            case 'triangle':
                canvas.drawTriangle('100,0 200,200 0,200', { fill: userData.logocolor });
                break;
            default:
                console.log('Invalid shape selection.');
        }

        const svgContent = canvas.render(); // Get SVG content
        const fileName = 'logo.svg'; // Output file name

        // Write SVG content to file
        fs.writeFileSync(fileName, svgContent);
        console.log(`Logo successfully generated and saved as ${fileName}.`);
        
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

// Call init function to start the application
init();
