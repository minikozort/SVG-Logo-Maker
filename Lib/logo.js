// Lib/logo.js
class Logos {
    constructor(text) {
        this.text = text;
        this.textColor = 'black'; // Default text color
        this.logoColor = 'blue'; // Default logo color
    }

    // Setter methods
    setTextColor(color) {
        this.textColor = color;
    }

    setLogoColor(color) {
        this.logoColor = color;
    }

    // Getter methods
    getText() {
        return this.text;
    }

    getTextColor() {
        return this.textColor;
    }

    getLogoColor() {
        return this.logoColor;
    }

    // Additional methods as needed for logo manipulation/rendering
}

module.exports = Logos;
