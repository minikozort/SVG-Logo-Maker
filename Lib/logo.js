

class Logos {
    constructor(text) {
      if (text.length > 3) {
        throw new Error('Entered text must not exceed 3 characters');
      }
      this.text = text;
    }
  
    getText() {
      return this.text;
    }
  }
  
  module.exports = Logos;
  