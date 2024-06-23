// Importing necessary packages and files
const inquirer = require("inquirer");
const fs = require("fs");
const Logos = require("./Lib/logo.js");
const Shapes = require("./Lib/shapes.js");

// Define your color and shape options
const textColorOptions = [
  "red",
  "green",
  "blue",
  "yellow",
  "white",
  "orange",
  "purple",
  "pink",
  "cyan",
  "magenta",
  "lime",
  "brown",
  "black",
  "gray",
  "silver",
  "gold",
];

const colorOptions = textColorOptions; // Using the same colors for logo and text

const shapeOptions = ["circle", "rectangle", "triangle", "square"];

// Function to measure text width (replace with your actual implementation)
function measureTextWidth(text, fontSize) {
  // Implement logic to estimate text width based on fontSize and text length
  const averageCharWidth = 8; // Adjust this value based on your font and rendering environment
  const textWidth = text.length * averageCharWidth * (fontSize / 10); // Adjust multiplier as needed
  return textWidth;
}

// Questions to be prompted for the user's input
const questions = [
  {
    type: "input",
    name: "logotext",
    message: "Please enter your logo text (up to three letters):",
    validate: function (value) {
      return value.length <= 3
        ? true
        : "Please enter up to three letters only.";
    },
  },
  {
    type: "list",
    name: "textcolor",
    message: "Please select a text color:",
    choices: textColorOptions,
  },
  {
    type: "list",
    name: "logocolor",
    message: "Please select a logo color:",
    choices: colorOptions,
  },
  {
    type: "list",
    name: "shape",
    message: "Please select a shape:",
    choices: shapeOptions,
  },
];

// A function to initialize the app
async function init() {
  try {
    // Prompt user for input
    const userData = await inquirer.prompt(questions);
    console.log("Generating logo...");

    // Initialize logo based on user input
    const logo = new Logos(userData.logotext);
    logo.setTextColor(userData.textcolor);
    logo.setLogoColor(userData.logocolor);

    // Draw selected shape
    const canvas = new Shapes(300, 300); // Assuming Shapes class supports canvas size
    let shapeWidth, shapeHeight;
    switch (userData.shape) {
      case "circle":
        shapeWidth = shapeHeight = 300;
        canvas.drawCircle(150, 150, 150, { fill: userData.logocolor });
        break;
      case "rectangle":
        shapeWidth = 300;
        shapeHeight = 200;
        canvas.drawRectangle(50, 50, shapeWidth, shapeHeight, {
          fill: userData.logocolor,
        });
        break;
      case "triangle":
        canvas.drawTriangle("100,0 200,200 0,200", {
          fill: userData.logocolor,
        });
        break;
      case "square":
        shapeWidth = shapeHeight = 300;
        canvas.drawSquare(50, 50, shapeWidth, { fill: userData.logocolor });
        break;
      default:
        console.log("Invalid shape selection.");
        return;
    }

    // Calculate text size based on shape type
    const textSize = 30; // Adjust font size based on your requirements

    // Calculate text width and height for better centering
    const textWidth = measureTextWidth(userData.logotext, textSize);
    const textHeight = textSize; // Assuming single line text, adjust for multi-line if necessary

    // Adjust text position to center within the shape
    let textX = (shapeWidth - textWidth) / 2; // Center horizontally
    let textY = (shapeHeight + textHeight) / 2; // Center vertically

    const textOptions = {
      fill: userData.textcolor,
      fontSize: textSize,
    };

    canvas.addText(textX, textY, userData.logotext, textOptions);

    const svgContent = canvas.render(); // Get SVG content
    const fileName = "logo.svg"; // Output file name

    // Write SVG content to file
    fs.writeFileSync(fileName, svgContent);
    console.log(`Logo successfully generated and saved as ${fileName}.`);
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

// Call init function to start the application
init();
