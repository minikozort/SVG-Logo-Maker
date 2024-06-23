const fs = require('fs');
const path = require('path');
const { Circle, Square, Triangle } = require('./shapes');

class Logo {
    constructor() {
        this.text = '';
        this.textColor = '';
        this.shapeColor = '';
        this.shape = null;
    }

    setTextInput(text, textColor) {
        this.text = text.toUpperCase();
        this.textColor = textColor;
    }

    setShapeInput(shape, shapeColor) {
        switch (shape) {
            case 'circle':
                this.shape = new Circle();
                break;
            case 'square':
                this.shape = new Square();
                break;
            case 'triangle':
                this.shape = new Triangle();
                break;
            default:
                throw new Error('Invalid shape selected');
        }
        this.shape.setColor(shapeColor); // Set color for the selected shape
        this.shapeColor = shapeColor; // Store the shape color in the logo object
    }

    generateSVG() {
        if (!this.shape) {
            throw new Error('Shape not selected');
        }

        let textX = 150; // Default text X position (center horizontally)
        let textY = 125; // Default text Y position (center vertically)
        let textSVG = `<text x="${textX}" y="${textY}" font-size="60" text-anchor="middle" fill="${this.textColor}">${this.text}</text>`;

        // Adjust text position based on the shape
        if (this.shape instanceof Circle) {
            textY = 115; // Move text higher for circle
            textSVG = `<text x="${textX}" y="${textY}" font-size="65" text-anchor="middle" fill="${this.textColor}">${this.text}</text>`;
        } else if (this.shape instanceof Square) {
            textX = 175;
            textY = 150; // Move text lower for square
            textSVG = `<text x="${textX}" y="${textY}" font-size="100" text-anchor="middle" fill="${this.textColor}">${this.text}</text>`;
        } else if (this.shape instanceof Triangle) {
            textY = 150; // Adjust text Y for triangle
            textSVG = `<text x="${textX}" y="${textY}" font-size="55" text-anchor="middle" fill="${this.textColor}">${this.text}</text>`;
        }

        
        const shapeSVG = this.shape.render();

        return `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="300" height="200">
                    ${shapeSVG}
                    ${textSVG}
                </svg>`;
    }

    saveToFile(fileName) {
        const svgContent = this.generateSVG();
        const filePath = path.join(__dirname, '..', 'Examples', fileName);
        fs.writeFileSync(filePath, svgContent);
        console.log(`Logo successfully generated and saved as ${filePath}.`);
    }
}

module.exports = Logo;
