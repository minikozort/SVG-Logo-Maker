// Lib/color.js
const colors = require('colors');

class Colors {
    constructor(color) {
        if (!color) {
            throw new Error('Please enter a color keyword or a hexadecimal number');
        }
        this.color = color;
    }

    render(text) {
        return colors[this.color](text);
    }
}

module.exports = Colors;
