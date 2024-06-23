const colors = require('colors');

class Colors {
    constructor(color) {
        if (!color) {
            throw new Error('Please enter a color keyword or a hexadecimal number');
        }

        // Check if the color is a valid color keyword or hexadecimal
        if (!this.isValidColor(color)) {
            throw new Error('Invalid color provided');
        }

        this.color = color;
    }

    isValidColor(color) {
        // Check if the color is a hexadecimal number or a valid color keyword
        const isHex = /^#[0-9A-F]{6}$/i.test(color);
        const isValidKeyword = colors[color] !== undefined;
        return isHex || isValidKeyword;
    }

    render(text) {
        if (!text) {
            throw new Error('Text must be provided');
        }

        // Check if the color is a hexadecimal number
        const isHex = /^#[0-9A-F]{6}$/i.test(this.color);
        if (isHex) {
            return `<text fill="${this.color}">${text}</text>`;
        } else if (colors[this.color]) {
            return `<text fill="${colors[this.color]}">${text}</text>`;
        } else {
            throw new Error('Invalid color keyword');
        }
    }
}

module.exports = Colors;
